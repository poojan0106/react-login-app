import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

dotenv.config();

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
