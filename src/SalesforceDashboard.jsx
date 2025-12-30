import './SalesforceDashboard.css';

function Dashboard({ onLogout }) {
    const stats = [
        { title: 'Total Users', value: '1,234', icon: 'users', change: '+12%' },
        { title: 'Revenue', value: '$45,678', icon: 'dollar', change: '+8%' },
        { title: 'Orders', value: '567', icon: 'cart', change: '+23%' },
        { title: 'Visitors', value: '8,901', icon: 'eye', change: '+15%' },
    ];

    const recentActivity = [
        { id: 1, action: 'New user registered', user: 'John Doe', time: '2 mins ago' },
        { id: 2, action: 'Order completed', user: 'Jane Smith', time: '15 mins ago' },
        { id: 3, action: 'Payment received', user: 'Bob Wilson', time: '1 hour ago' },
        { id: 4, action: 'New subscription', user: 'Alice Brown', time: '2 hours ago' },
        { id: 5, action: 'Support ticket resolved', user: 'Charlie Davis', time: '3 hours ago' },
    ];

    const renderIcon = (type) => {
        switch (type) {
            case 'users':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'dollar':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'cart':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                );
            case 'eye':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="background-gradient"></div>
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="dashboard-subtitle">Welcome back! Here's your overview.</p>
                </div>
                <button onClick={onLogout} className="logout-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-icon">
                                {renderIcon(stat.icon)}
                            </div>
                            <div className="stat-info">
                                <h3 className="stat-title">{stat.title}</h3>
                                <p className="stat-value">{stat.value}</p>
                                <span className="stat-change positive">{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="activity-section">
                    <h2 className="section-title">Recent Activity</h2>
                    <div className="activity-list">
                        {recentActivity.map((item) => (
                            <div key={item.id} className="activity-item">
                                <div className="activity-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="activity-details">
                                    <p className="activity-action">{item.action}</p>
                                    <p className="activity-user">{item.user}</p>
                                </div>
                                <span className="activity-time">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
