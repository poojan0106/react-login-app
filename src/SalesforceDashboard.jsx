import { useState } from 'react';
import './SalesforceDashboard.css';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobPrompt, setJobPrompt] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [jobData, setJobData] = useState({
        jobTitle: '',
        salary: '',
        noOfOpenings: '',
        skills: '',
        jobDescription: ''
    });

    const handleGenerateJob = (e) => {
        e.preventDefault();
        // Simulate AI parsing the prompt - in real app, this would call an API
        setJobData({
            jobTitle: 'Salesforce Developer',
            salary: '$120,000',
            noOfOpenings: '3',
            skills: 'Apex, Lightning, Salesforce Admin, JavaScript, SQL',
            jobDescription: jobPrompt || 'We are looking for an experienced Salesforce Developer to join our team...'
        });
        setShowReview(true);
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();
        console.log('Job submitted:', jobData);
        // Handle final job submission here
        setJobPrompt('');
        setJobData({
            jobTitle: '',
            salary: '',
            noOfOpenings: '',
            skills: '',
            jobDescription: ''
        });
        setShowReview(false);
        setIsModalOpen(false);
    };

    const handleBackToPrompt = () => {
        setShowReview(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowReview(false);
        setJobPrompt('');
    };

    const recentActivity = [
        { id: 1, action: 'New user registered', user: 'John Doe', time: '2 mins ago', type: 'user' },
        { id: 2, action: 'Order completed', user: 'Jane Smith', time: '15 mins ago', type: 'order' },
        { id: 3, action: 'Payment received', user: 'Bob Wilson', time: '1 hour ago', type: 'payment' },
        { id: 4, action: 'New subscription', user: 'Alice Brown', time: '2 hours ago', type: 'subscription' },
        { id: 5, action: 'Support ticket resolved', user: 'Charlie Davis', time: '3 hours ago', type: 'support' },
    ];

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
                    {/* Total Jobs Card */}
                    <div className="stat-card fade-in-up" style={{ animationDelay: '0s' }}>
                        <div className="stat-card-inner">
                            <div className="stat-icon-wrapper">
                                <div className="stat-icon stat-icon-briefcase">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-details">
                                <span className="stat-label">Total Jobs</span>
                                <span className="stat-value">1,234</span>
                                <div className="stat-trend">
                                    <span className="trend-badge up">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        +12%
                                    </span>
                                    <span className="trend-label">vs last month</span>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card-shine"></div>
                    </div>

                    {/* Add New Job Button Card */}
                    <div
                        className="stat-card add-job-card fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="stat-card-inner add-job-inner">
                            <div className="add-job-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="add-job-text">Add New Job</span>
                            <span className="add-job-subtext">Create a new job posting with AI</span>
                        </div>
                        <div className="stat-card-shine"></div>
                        <div className="add-job-glow"></div>
                    </div>

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

            {/* Add New Job Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-glow"></div>
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-header-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="modal-header-text">
                                    <h2>{showReview ? 'Review Job Details' : 'Describe Your Job'}</h2>
                                    <p>{showReview ? 'Review and edit the generated job posting' : 'Let AI help you create the perfect job posting'}</p>
                                </div>
                                <button className="modal-close" onClick={handleCloseModal}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body - Prompt Entry */}
                            {!showReview && (
                                <form onSubmit={handleGenerateJob} className="modal-form">
                                    <div className="form-group">
                                        <label htmlFor="jobPrompt">Job Details</label>
                                        <div className="textarea-wrapper">
                                            <textarea
                                                id="jobPrompt"
                                                value={jobPrompt}
                                                onChange={(e) => setJobPrompt(e.target.value)}
                                                placeholder="Describe your ideal candidate and job requirements..."
                                                rows={6}
                                            />
                                            <div className="textarea-glow"></div>
                                        </div>
                                        <div className="helper-text">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Ex. Job title - Salesforce Developer, City - New York, Salary - $120,000 (must be in dollars only)</span>
                                        </div>
                                    </div>

                                    {/* Generate Button */}
                                    <button type="submit" className="submit-btn">
                                        <span className="btn-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Generate Job Posting
                                        </span>
                                        <div className="btn-glow"></div>
                                    </button>
                                </form>
                            )}

                            {/* Modal Body - Review Section */}
                            {showReview && (
                                <form onSubmit={handleSubmitJob} className="modal-form">
                                    <div className="review-grid">
                                        {/* Job Title */}
                                        <div className="review-field">
                                            <label htmlFor="jobTitle">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Job Title
                                            </label>
                                            <input
                                                type="text"
                                                id="jobTitle"
                                                value={jobData.jobTitle}
                                                onChange={(e) => setJobData({...jobData, jobTitle: e.target.value})}
                                                placeholder="Enter job title"
                                            />
                                        </div>

                                        {/* Salary */}
                                        <div className="review-field">
                                            <label htmlFor="salary">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Salary ($)
                                            </label>
                                            <input
                                                type="text"
                                                id="salary"
                                                value={jobData.salary}
                                                onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                                                placeholder="e.g. $120,000"
                                            />
                                        </div>

                                        {/* No of Openings */}
                                        <div className="review-field">
                                            <label htmlFor="noOfOpenings">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                No. of Openings
                                            </label>
                                            <input
                                                type="number"
                                                id="noOfOpenings"
                                                value={jobData.noOfOpenings}
                                                onChange={(e) => setJobData({...jobData, noOfOpenings: e.target.value})}
                                                placeholder="e.g. 3"
                                                min="1"
                                            />
                                        </div>

                                        {/* Skills */}
                                        <div className="review-field full-width">
                                            <label htmlFor="skills">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                                Skills
                                            </label>
                                            <input
                                                type="text"
                                                id="skills"
                                                value={jobData.skills}
                                                onChange={(e) => setJobData({...jobData, skills: e.target.value})}
                                                placeholder="e.g. JavaScript, React, Node.js"
                                            />
                                        </div>

                                        {/* Job Description */}
                                        <div className="review-field full-width">
                                            <label htmlFor="jobDescription">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Job Description
                                            </label>
                                            <textarea
                                                id="jobDescription"
                                                value={jobData.jobDescription}
                                                onChange={(e) => setJobData({...jobData, jobDescription: e.target.value})}
                                                placeholder="Enter job description..."
                                                rows={4}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="review-actions">
                                        <button type="button" className="back-btn" onClick={handleBackToPrompt}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back
                                        </button>
                                        <button type="submit" className="submit-btn">
                                            <span className="btn-content">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Submit Job
                                            </span>
                                            <div className="btn-glow"></div>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
