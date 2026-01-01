# Salesforce React Integration

A React application with Salesforce integration that displays Accounts, Contacts, and Opportunities data through a beautiful, modern dashboard.

## 🚀 Features

- **Salesforce Authentication** - Secure login with Salesforce credentials
- **Data Display** - View Accounts, Contacts, and Opportunities in beautiful card layouts
- **Modern UI** - Glassmorphism effects, smooth animations, and responsive design
- **Backend Proxy** - Secure Node.js/Express server handling Salesforce API calls

## 📋 Prerequisites

- Node.js (v14 or higher)
- Salesforce account with API access
- Salesforce credentials (username, password, security token)

## 🛠️ Setup Instructions

### 1. Configure Salesforce Credentials

Edit `server/.env` file with your Salesforce credentials:

```env
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=your_salesforce_username@example.com
SF_PASSWORD=your_salesforce_password
SF_SECURITY_TOKEN=your_security_token
PORT=3003
```

**Note:** To get your Salesforce Security Token:
1. Log in to Salesforce
2. Go to Settings → My Personal Information → Reset My Security Token
3. Check your email for the new security token

### 2. Install Dependencies

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### 3. Run the Application

You need to run both the backend server and frontend dev server:

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔐 Login

Use your Salesforce credentials to log in:
- **Username**: Your Salesforce username
- **Password**: Your Salesforce password (the app will append the security token automatically)

## 📊 Dashboard Features

After logging in, you'll see three tabs:

1. **Accounts** - View company accounts with industry, phone, and website information
2. **Contacts** - Browse contacts with email, phone, and associated accounts
3. **Opportunities** - Track sales opportunities with amounts and close dates

## 🏗️ Project Structure

```
my-react-app/
├── server/
│   ├── server.js          # Express backend server
│   ├── package.json       # Backend dependencies
│   └── .env              # Salesforce credentials (configure this!)
├── src/
│   ├── App.jsx           # Main app with routing
│   ├── loginPage.jsx     # Login page component
│   ├── LoginPage.css     # Login page styles
│   ├── SalesforceDashboard.jsx  # Dashboard component
│   └── SalesforceDashboard.css  # Dashboard styles
└── package.json          # Frontend dependencies
```

## 🔧 API Endpoints

The backend server provides these endpoints:

- `POST /api/salesforce/auth` - Authenticate with Salesforce
- `GET /api/salesforce/data?object=Account&limit=20` - Get Salesforce records
- `GET /api/salesforce/contacts?limit=20` - Get contacts
- `GET /api/salesforce/opportunities?limit=20` - Get opportunities
- `POST /api/salesforce/logout` - Logout from Salesforce
- `GET /api/health` - Health check

## 🎨 Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Salesforce Integration**: JSforce
- **Styling**: CSS with glassmorphism effects

## 🐛 Troubleshooting

**"Network error: Unable to connect to server"**
- Make sure the backend server is running on port 3003
- Check that `server/.env` is configured correctly

**"Authentication failed"**
- Verify your Salesforce credentials in `server/.env`
- Ensure your security token is correct and appended to password
- Check if your IP is whitelisted in Salesforce (or use a VPN)

**"No data found"**
- Your Salesforce org might not have data for the selected object
- Check Salesforce permissions for your user

## 📝 License

MIT
