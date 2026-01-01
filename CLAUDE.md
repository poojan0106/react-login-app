# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application that integrates with Salesforce. It provides a dashboard for viewing Salesforce data including Accounts, Contacts, and Opportunities.

## Tech Stack

- **Frontend**: React 19 with Vite 7
- **Routing**: React Router DOM v7
- **Backend**: Express.js server with jsforce for Salesforce integration
- **Styling**: Plain CSS
- **Linting**: ESLint with React hooks and React Refresh plugins

## Project Structure

```
my-react-app/
├── src/                    # React frontend source
│   ├── main.jsx           # App entry point with BrowserRouter
│   ├── App.jsx            # Main app with routing and auth state
│   ├── loginPage.jsx      # Salesforce login form
│   ├── SalesforceDashboard.jsx  # Dashboard with tabs for SF data
│   └── *.css              # Component styles
├── server/                 # Express backend
│   └── server.js          # Salesforce API proxy server
├── dist/                   # Built frontend assets
└── public/                 # Static assets
```

## Common Commands

```bash
# Frontend development (runs on port 5173)
npm run dev

# Build frontend for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Backend server (runs on port 3003)
cd server && npm start
```

## Architecture Notes

- **Authentication Flow**: Login credentials are sent to `/api/salesforce/auth` which authenticates with Salesforce via jsforce. Auth state is stored in localStorage (`sfAuthenticated`).
- **API Proxy**: Vite is configured to proxy `/api` requests to the backend server at `localhost:3003`.
- **Salesforce Connection**: The backend maintains a single `sfConnection` instance (note: not production-ready, needs proper session management).

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/salesforce/auth` | POST | Authenticate with Salesforce |
| `/api/salesforce/data` | GET | Get Account records |
| `/api/salesforce/contacts` | GET | Get Contact records |
| `/api/salesforce/opportunities` | GET | Get Opportunity records |
| `/api/salesforce/logout` | POST | Logout from Salesforce |
| `/api/send-verification-code` | POST | Send 6-digit code via AWS SES |
| `/api/verify-code` | POST | Verify the 6-digit code |
| `/api/health` | GET | Health check |

## Environment Variables (server/.env)

```
# Salesforce
SF_USERNAME=your_salesforce_username
SF_PASSWORD=your_salesforce_password
SF_SECURITY_TOKEN=your_security_token
SF_LOGIN_URL=https://login.salesforce.com
PORT=3003

# AWS SES
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_SES_FROM_EMAIL=verified@yourdomain.com
```

## Development Notes

- The frontend runs on port 5173 (Vite default)
- The backend runs on port 3003
- Both servers must be running for full functionality
- The dashboard has three tabs: Accounts, Contacts, and Opportunities
