import express from 'express';
import cors from 'cors';
import jsforce from 'jsforce';
import dotenv from 'dotenv';

dotenv.config();

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Store connection (in production, use proper session management)
let sfConnection = null;

// Salesforce Authentication Endpoint
app.post('/api/salesforce/auth', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Use credentials from request or environment variables
        const sfUsername = username || process.env.SF_USERNAME;
        const sfPassword = password || process.env.SF_PASSWORD;
        const sfSecurityToken = process.env.SF_SECURITY_TOKEN || '';
        const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';

        if (!sfUsername || !sfPassword) {
            return res.status(400).json({
                error: 'Username and password are required'
            });
        }

        // Create new connection
        const conn = new jsforce.Connection({
            loginUrl: loginUrl
        });

        // Login to Salesforce
        const userInfo = await conn.login(sfUsername, sfPassword + sfSecurityToken);

        // Store connection for subsequent requests
        sfConnection = conn;

        res.json({
            success: true,
            message: 'Successfully authenticated with Salesforce',
            userId: userInfo.id,
            organizationId: userInfo.organizationId
        });

    } catch (error) {
        console.error('Salesforce authentication error:', error);
        res.status(401).json({
            error: 'Authentication failed',
            message: error.message
        });
    }
});

// Get Salesforce Data Endpoint
app.get('/api/salesforce/data', async (req, res) => {
    try {
        if (!sfConnection) {
            return res.status(401).json({
                error: 'Not authenticated. Please login first.'
            });
        }

        const { object = 'Account', limit = 10 } = req.query;

        // Query Salesforce data
        const result = await sfConnection.query(
            `SELECT Id, Name, Type, Industry, Phone, Website, CreatedDate FROM ${object} LIMIT ${limit}`
        );

        res.json({
            success: true,
            totalSize: result.totalSize,
            records: result.records
        });

    } catch (error) {
        console.error('Salesforce data fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch data',
            message: error.message
        });
    }
});

// Get Salesforce Contacts
app.get('/api/salesforce/contacts', async (req, res) => {
    try {
        if (!sfConnection) {
            return res.status(401).json({
                error: 'Not authenticated. Please login first.'
            });
        }

        const { limit = 10 } = req.query;

        const result = await sfConnection.query(
            `SELECT Id, FirstName, LastName, Email, Phone, Title, Account.Name FROM Contact LIMIT ${limit}`
        );

        res.json({
            success: true,
            totalSize: result.totalSize,
            records: result.records
        });

    } catch (error) {
        console.error('Salesforce contacts fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch contacts',
            message: error.message
        });
    }
});

// Get Salesforce Opportunities
app.get('/api/salesforce/opportunities', async (req, res) => {
    try {
        if (!sfConnection) {
            return res.status(401).json({
                error: 'Not authenticated. Please login first.'
            });
        }

        const { limit = 10 } = req.query;

        const result = await sfConnection.query(
            `SELECT Id, Name, StageName, Amount, CloseDate, Account.Name FROM Opportunity LIMIT ${limit}`
        );

        res.json({
            success: true,
            totalSize: result.totalSize,
            records: result.records
        });

    } catch (error) {
        console.error('Salesforce opportunities fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch opportunities',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        authenticated: !!sfConnection
    });
});

// Logout endpoint
app.post('/api/salesforce/logout', async (req, res) => {
    try {
        if (sfConnection) {
            await sfConnection.logout();
            sfConnection = null;
        }
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Salesforce backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
