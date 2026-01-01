import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/salesforce/jobs/${id}`);
                const result = await response.json();

                if (result.success) {
                    // Parse skills from description if present
                    const jobData = result.data;
                    if (jobData.description) {
                        const skillsMatch = jobData.description.match(/Required Skills:\s*(.+)/i);
                        if (skillsMatch) {
                            jobData.skills = skillsMatch[1].trim();
                            jobData.description = jobData.description.replace(/\n\nRequired Skills:.+/i, '').trim();
                        }
                    }
                    setJob(jobData);
                } else {
                    setJob(null);
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                setJob(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const formatSalary = (salary) => {
        if (!salary) return '-';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(salary);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleApply = () => {
        // Placeholder for apply functionality
        alert('Application submitted! (Demo)');
    };

    if (isLoading) {
        return (
            <div className="job-details-wrapper">
                <div className="job-details-bg">
                    <div className="bg-gradient"></div>
                    <div className="bg-orbs">
                        <div className="orb orb-1"></div>
                        <div className="orb orb-2"></div>
                        <div className="orb orb-3"></div>
                    </div>
                    <div className="bg-grid"></div>
                </div>
                <div className="job-details-content">
                    <div className="loading-container">
                        <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="32" strokeLinecap="round" />
                        </svg>
                        <span>Loading job details...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="job-details-wrapper">
                <div className="job-details-bg">
                    <div className="bg-gradient"></div>
                    <div className="bg-orbs">
                        <div className="orb orb-1"></div>
                        <div className="orb orb-2"></div>
                        <div className="orb orb-3"></div>
                    </div>
                    <div className="bg-grid"></div>
                </div>
                <div className="job-details-content">
                    <div className="not-found-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2>Job Not Found</h2>
                        <p>The job you're looking for doesn't exist or has been removed.</p>
                        <button className="back-btn" onClick={handleBack}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="job-details-wrapper">
            {/* Animated Background */}
            <div className="job-details-bg">
                <div className="bg-gradient"></div>
                <div className="bg-orbs">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                </div>
                <div className="bg-grid"></div>
            </div>

            {/* Main Content */}
            <div className="job-details-content">
                {/* Back Button */}
                <button className="back-nav-btn fade-in" onClick={handleBack}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Jobs</span>
                </button>

                {/* Job Header Card */}
                <div className="job-header-card fade-in-up">
                    <div className="job-header-main">
                        <div className="job-title-section">
                            <h1>{job.job_title}</h1>
                            <div className="job-meta">
                                {job.no_of_openings && (
                                    <span className="meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {job.no_of_openings} openings
                                    </span>
                                )}
                                {job.salary && (
                                    <span className="meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatSalary(job.salary)}
                                    </span>
                                )}
                                <span className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(job.created_at)}
                                </span>
                            </div>
                        </div>
                        <div className="job-actions">
                            <button className="apply-btn" onClick={handleApply}>
                                <span className="btn-content">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Apply Now
                                </span>
                                <div className="btn-glow"></div>
                            </button>
                        </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="quick-info-grid">
                        <div className="quick-info-card">
                            <div className="quick-info-icon salary-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="quick-info-text">
                                <span className="quick-info-label">Salary</span>
                                <span className="quick-info-value">{formatSalary(job.salary)}</span>
                            </div>
                        </div>
                        <div className="quick-info-card">
                            <div className="quick-info-icon openings-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="quick-info-text">
                                <span className="quick-info-label">Openings</span>
                                <span className="quick-info-value">{job.no_of_openings || '-'} positions</span>
                            </div>
                        </div>
                        <div className="quick-info-card">
                            <div className="quick-info-icon date-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="quick-info-text">
                                <span className="quick-info-label">Posted</span>
                                <span className="quick-info-value">{formatDate(job.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="job-content-grid">
                    {/* Main Content */}
                    <div className="job-main-content">
                        {/* Description */}
                        <div className="content-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <h2>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Job Description
                            </h2>
                            <p className="description-text">{job.description || 'No description available.'}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="job-sidebar">
                        {/* Skills */}
                        {job.skills && (
                            <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.15s' }}>
                                <h3>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Required Skills
                                </h3>
                                <div className="skills-tags">
                                    {job.skills.split(',').map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share */}
                        <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.25s' }}>
                            <h3>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share this Job
                            </h3>
                            <div className="share-buttons">
                                <button className="share-btn linkedin">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </button>
                                <button className="share-btn twitter">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </button>
                                <button className="share-btn copy" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
