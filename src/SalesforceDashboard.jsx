import { useState, useEffect } from 'react';
import './SalesforceDashboard.css';

function SalesforceDashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('contacts');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (endpoint) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3001/api/salesforce/${endpoint}`);
            const result = await response.json();

            if (result.success) {
                setData(result.records);
            } else {
                setError(result.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'accounts') {
            fetchData('data?object=Account&limit=20');
        } else if (activeTab === 'contacts') {
            fetchData('contacts?limit=5');
        } else if (activeTab === 'opportunities') {
            fetchData('opportunities?limit=20');
        }
    }, [activeTab]);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3001/api/salesforce/logout', { method: 'POST' });
            onLogout();
        } catch (err) {
            console.error('Logout error:', err);
            onLogout();
        }
    };

    const renderAccountCard = (record) => (
        <div key={record.Id} className="data-card">
            <div className="card-header">
                <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 className="card-title">{record.Name}</h3>
            </div>
            <div className="card-content">
                {record.Type && <p><strong>Type:</strong> {record.Type}</p>}
                {record.Industry && <p><strong>Industry:</strong> {record.Industry}</p>}
                {record.Phone && <p><strong>Phone:</strong> {record.Phone}</p>}
                {record.Website && <p><strong>Website:</strong> <a href={record.Website} target="_blank" rel="noopener noreferrer">{record.Website}</a></p>}
            </div>
            <div className="card-footer">
                <span className="card-date">Created: {new Date(record.CreatedDate).toLocaleDateString()}</span>
            </div>
        </div>
    );

    const renderContactsTable = () => (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Account</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record) => (
                        <tr key={record.Id}>
                            <td>
                                <div className="contact-name-cell">
                                    <div className="table-icon contact-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {record.FirstName} {record.LastName}
                                </div>
                            </td>
                            <td>{record.Title || '-'}</td>
                            <td>
                                {record.Email ? (
                                    <a href={`mailto:${record.Email}`} className="table-link">{record.Email}</a>
                                ) : '-'}
                            </td>
                            <td>{record.Phone || '-'}</td>
                            <td>{record.Account ? record.Account.Name : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderContactCard = (record) => (
        <div key={record.Id} className="data-card">
            <div className="card-header">
                <div className="card-icon contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 className="card-title">{record.FirstName} {record.LastName}</h3>
            </div>
            <div className="card-content">
                {record.Title && <p><strong>Title:</strong> {record.Title}</p>}
                {record.Email && <p><strong>Email:</strong> <a href={`mailto:${record.Email}`}>{record.Email}</a></p>}
                {record.Phone && <p><strong>Phone:</strong> {record.Phone}</p>}
                {record.Account && <p><strong>Account:</strong> {record.Account.Name}</p>}
            </div>
        </div>
    );

    const renderOpportunityCard = (record) => (
        <div key={record.Id} className="data-card">
            <div className="card-header">
                <div className="card-icon opportunity-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="card-title">{record.Name}</h3>
            </div>
            <div className="card-content">
                <p><strong>Stage:</strong> <span className={`stage-badge ${record.StageName.toLowerCase().replace(/\s+/g, '-')}`}>{record.StageName}</span></p>
                {record.Amount && <p><strong>Amount:</strong> ${record.Amount.toLocaleString()}</p>}
                {record.CloseDate && <p><strong>Close Date:</strong> {new Date(record.CloseDate).toLocaleDateString()}</p>}
                {record.Account && <p><strong>Account:</strong> {record.Account.Name}</p>}
            </div>
        </div>
    );

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
                    <h1 className="dashboard-title">Salesforce Dashboard</h1>
                    <p className="dashboard-subtitle">View and manage your Salesforce data</p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={`tab-button ${activeTab === 'accounts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('accounts')}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Accounts
                </button>
                <button
                    className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Contacts
                </button>
                <button
                    className={`tab-button ${activeTab === 'opportunities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('opportunities')}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Opportunities
                </button>
            </div>

            <div className="dashboard-content">
                {loading && (
                    <div className="loading-state">
                        <div className="spinner-large"></div>
                        <p>Loading {activeTab}...</p>
                    </div>
                )}

                {error && (
                    <div className="error-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3>Error Loading Data</h3>
                        <p>{error}</p>
                        <button onClick={() => fetchData(activeTab)} className="retry-button">Retry</button>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3>No Data Found</h3>
                        <p>There are no {activeTab} to display.</p>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <>
                        {activeTab === 'contacts' ? (
                            renderContactsTable()
                        ) : (
                            <div className="data-grid">
                                {activeTab === 'accounts' && data.map(renderAccountCard)}
                                {activeTab === 'opportunities' && data.map(renderOpportunityCard)}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SalesforceDashboard;
