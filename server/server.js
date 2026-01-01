import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import Anthropic from '@anthropic-ai/sdk';
import pg from 'pg';

dotenv.config();

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// AWS SES Client configuration
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map();

// Send verification code via AWS SES
app.post('/api/send-verification-code', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Generate 6-digit code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Store code with expiration (10 minutes)
        verificationCodes.set(email, {
            code: verificationCode,
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        // Send email via AWS SES
        const params = {
            Source: process.env.AWS_SES_FROM_EMAIL,
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Subject: {
                    Data: 'Your Verification Code',
                    Charset: 'UTF-8'
                },
                Body: {
                    Html: {
                        Data: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h2 style="color: #667eea;">Verification Code</h2>
                                <p>Your verification code is:</p>
                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 32px; font-weight: bold; padding: 20px; text-align: center; border-radius: 10px; letter-spacing: 8px;">
                                    ${verificationCode}
                                </div>
                                <p style="color: #666; margin-top: 20px;">This code will expire in 10 minutes.</p>
                                <p style="color: #999; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
                            </div>
                        `,
                        Charset: 'UTF-8'
                    },
                    Text: {
                        Data: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
                        Charset: 'UTF-8'
                    }
                }
            }
        };

        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        res.json({
            success: true,
            message: 'Verification code sent successfully'
        });

    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send verification code',
            error: error.message
        });
    }
});

// Verify code endpoint
app.post('/api/verify-code', (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: 'Email and code are required'
            });
        }

        const storedData = verificationCodes.get(email);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'No verification code found for this email'
            });
        }

        if (Date.now() > storedData.expiresAt) {
            verificationCodes.delete(email);
            return res.status(400).json({
                success: false,
                message: 'Verification code has expired'
            });
        }

        if (storedData.code !== code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code'
            });
        }

        // Code is valid, remove it
        verificationCodes.delete(email);

        res.json({
            success: true,
            message: 'Code verified successfully'
        });

    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify code'
        });
    }
});

// Parse job details using Claude AI
app.post('/api/parse-job', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Job description prompt is required'
            });
        }

        const systemPrompt = `You are a job posting parser. Extract job details from the user's input and return ONLY a valid JSON object with these exact fields:
- jobTitle: The job title/position name (string)
- salary: The salary in dollar format, e.g., "$120,000" or "$80,000 - $100,000" (string)
- noOfOpenings: Number of positions available (string, e.g., "1", "3", "5")
- skills: Required skills as a comma-separated string (string)
- jobDescription: A professional job description based on the input (string)

If any field is not mentioned in the input, make a reasonable inference based on the job title and context.
Return ONLY the JSON object, no additional text or markdown.`;

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `Parse this job posting request and extract the details:\n\n${prompt}`
                }
            ],
            system: systemPrompt
        });

        // Extract the text response
        const responseText = message.content[0].text;

        // Parse the JSON response
        let jobData;
        try {
            jobData = JSON.parse(responseText);
        } catch (parseError) {
            // Try to extract JSON from the response if it contains extra text
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                jobData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Failed to parse AI response as JSON');
            }
        }

        // Validate required fields
        const requiredFields = ['jobTitle', 'salary', 'noOfOpenings', 'skills', 'jobDescription'];
        for (const field of requiredFields) {
            if (!jobData[field]) {
                jobData[field] = '';
            }
        }

        res.json({
            success: true,
            data: jobData
        });

    } catch (error) {
        console.error('Error parsing job with Claude AI:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to parse job details',
            error: error.message
        });
    }
});

// General Claude AI chat endpoint
app.post('/api/claude/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Build messages array with conversation history
        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            messages: messages
        });

        const assistantMessage = response.content[0].text;

        res.json({
            success: true,
            response: assistantMessage,
            usage: {
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens
            }
        });

    } catch (error) {
        console.error('Error in Claude chat:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get response from Claude',
            error: error.message
        });
    }
});

// PostgreSQL connection pool for Heroku Connect
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Create Campaign record via PostgreSQL (Heroku Connect syncs to Salesforce)
app.post('/api/salesforce/campaign', async (req, res) => {
    try {
        const { jobTitle, salary, noOfOpenings, skills, jobDescription, refererEmail } = req.body;

        // Validate required fields
        if (!jobTitle) {
            return res.status(400).json({
                success: false,
                message: 'Job title is required'
            });
        }

        // Combine description with skills
        const fullDescription = skills
            ? `${jobDescription || ''}\n\nRequired Skills: ${skills}`
            : jobDescription || '';

        // Insert into PostgreSQL - Heroku Connect will sync to Salesforce
        const query = `
            INSERT INTO salesforce.campaign (name, r_ats__no_of_openings__c, r_ats__salary__c, description, r_ats__referer_email__c)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;

        const values = [
            jobTitle,
            noOfOpenings ? parseInt(noOfOpenings) : null,
            salary ? parseFloat(salary) : null,
            fullDescription,
            refererEmail || null
        ];

        const result = await pool.query(query, values);

        res.json({
            success: true,
            id: result.rows[0].id,
            message: 'Campaign created successfully. It will sync to Salesforce shortly.'
        });

    } catch (error) {
        console.error('Error creating Campaign:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to create Campaign',
            error: error.message
        });
    }
});

// Get job listings (campaigns) from PostgreSQL
app.get('/api/salesforce/jobs', async (req, res) => {
    try {
        const { search, salaryMin, salaryMax, sortBy = 'created_at', sortOrder = 'DESC', refererEmail } = req.query;

        let query = `
            SELECT
                id,
                name as job_title,
                r_ats__no_of_openings__c as no_of_openings,
                r_ats__salary__c as salary,
                description,
                createddate as created_at
            FROM salesforce.campaign
            WHERE 1=1
        `;
        const values = [];
        let paramIndex = 1;

        // Filter by referer email (only show campaigns created by logged-in user)
        if (refererEmail) {
            query += ` AND LOWER(r_ats__referer_email__c) = LOWER($${paramIndex})`;
            values.push(refererEmail);
            paramIndex++;
        }

        // Search filter (job title or description)
        if (search) {
            query += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(description) LIKE $${paramIndex})`;
            values.push(`%${search.toLowerCase()}%`);
            paramIndex++;
        }

        // Salary range filters
        if (salaryMin) {
            query += ` AND r_ats__salary__c >= $${paramIndex}`;
            values.push(parseFloat(salaryMin));
            paramIndex++;
        }

        if (salaryMax) {
            query += ` AND r_ats__salary__c <= $${paramIndex}`;
            values.push(parseFloat(salaryMax));
            paramIndex++;
        }

        // Sorting
        const allowedSortFields = ['created_at', 'name', 'r_ats__salary__c', 'r_ats__no_of_openings__c'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createddate';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        query += ` ORDER BY ${sortField === 'created_at' ? 'createddate' : sortField} ${order} NULLS LAST`;
        query += ` LIMIT 50`;

        const result = await pool.query(query, values);

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job listings',
            error: error.message
        });
    }
});

// Get single job by ID
app.get('/api/salesforce/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT
                id,
                name as job_title,
                r_ats__no_of_openings__c as no_of_openings,
                r_ats__salary__c as salary,
                description,
                createddate as created_at
            FROM salesforce.campaign
            WHERE id = $1
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job details',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Catch-all handler for React Router (must be after API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
