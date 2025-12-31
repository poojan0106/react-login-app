import './SalesforceDashboard.css';

function Dashboard() {
    const stats = [
        { title: 'Total Users', value: '1,234', icon: 'users', change: '+12%', trend: 'up' },
        { title: 'Revenue', value: '$45,678', icon: 'dollar', change: '+8%', trend: 'up' },
        { title: 'Orders', value: '567', icon: 'cart', change: '+23%', trend: 'up' },
        { title: 'Visitors', value: '8,901', icon: 'eye', change: '+15%', trend: 'up' },
    ];

    const recentActivity = [
        { id: 1, action: 'New user registered', user: 'John Doe', time: '2 mins ago', type: 'user' },
        { id: 2, action: 'Order completed', user: 'Jane Smith', time: '15 mins ago', type: 'order' },
        { id: 3, action: 'Payment received', user: 'Bob Wilson', time: '1 hour ago', type: 'payment' },
        { id: 4, action: 'New subscription', user: 'Alice Brown', time: '2 hours ago', type: 'subscription' },
        { id: 5, action: 'Support ticket resolved', user: 'Charlie Davis', time: '3 hours ago', type: 'support' },
    ];

    const renderStatIcon = (type) => {
        switch (type) {
            case 'users':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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

    const renderActivityIcon = (type) => {
        switch (type) {
            case 'user':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                );
            case 'order':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                );
            case 'payment':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                );
            case 'subscription':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                );
            case 'support':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
        }
    };

    return (
        <div className="dashboard-wrapper">
            {/* Animated Background */}
            <div className="dashboard-bg">
                <div className="bg-gradient"></div>
                <div className="bg-orbs">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                </div>
                <div className="bg-grid"></div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                {/* Welcome Section */}
                <div className="welcome-section fade-in">
                    <div className="welcome-text">
                        <h1>Welcome back!</h1>
                        <p>Here's what's happening with your business today.</p>
                    </div>
                    <div className="date-display">
                        <span className="date-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="stat-card-inner">
                                <div className="stat-icon-wrapper">
                                    <div className={`stat-icon stat-icon-${stat.icon}`}>
                                        {renderStatIcon(stat.icon)}
                                    </div>
                                </div>
                                <div className="stat-details">
                                    <span className="stat-label">{stat.title}</span>
                                    <span className="stat-value">{stat.value}</span>
                                    <div className="stat-trend">
                                        <span className={`trend-badge ${stat.trend}`}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            {stat.change}
                                        </span>
                                        <span className="trend-label">vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stat-card-shine"></div>
                        </div>
                    ))}
                </div>

                {/* Activity Section */}
                <div className="activity-container fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="activity-header">
                        <h2>Recent Activity</h2>
                        <button className="view-all-btn">
                            View All
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map((item, index) => (
                            <div
                                key={item.id}
                                className="activity-item"
                                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                            >
                                <div className={`activity-icon activity-icon-${item.type}`}>
                                    {renderActivityIcon(item.type)}
                                </div>
                                <div className="activity-info">
                                    <span className="activity-action">{item.action}</span>
                                    <span className="activity-user">{item.user}</span>
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
