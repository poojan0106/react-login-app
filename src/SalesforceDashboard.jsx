import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesforceDashboard.css';
import { ToastContainer, useToast } from './components/Toast';

function Dashboard() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobPrompt, setJobPrompt] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jobData, setJobData] = useState({
        jobTitle: '',
        salary: '',
        noOfOpenings: '',
        skills: '',
        jobDescription: ''
    });
    const { toasts, toast, removeToast } = useToast();

    // Job listings state
    const [jobListings, setJobListings] = useState([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        salaryMin: '',
        salaryMax: '',
        sortBy: 'created_at',
        sortOrder: 'DESC'
    });

    // Fetch job listings
    const fetchJobListings = useCallback(async () => {
        setIsLoadingJobs(true);
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.salaryMin) params.append('salaryMin', filters.salaryMin);
            if (filters.salaryMax) params.append('salaryMax', filters.salaryMax);
            params.append('sortBy', filters.sortBy);
            params.append('sortOrder', filters.sortOrder);

            // Filter by logged-in user's email
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) params.append('refererEmail', userEmail);

            const response = await fetch(`/api/salesforce/jobs?${params.toString()}`);
            const result = await response.json();

            if (result.success) {
                setJobListings(result.data);
            } else {
                setJobListings([]);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobListings([]);
        } finally {
            setIsLoadingJobs(false);
        }
    }, [filters]);

    // Fetch jobs on mount and when filters change
    useEffect(() => {
        fetchJobListings();
    }, [fetchJobListings]);

    // Debounced search handler
    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleSort = (field) => {
        setFilters(prev => ({
            ...prev,
            sortBy: field,
            sortOrder: prev.sortBy === field && prev.sortOrder === 'DESC' ? 'ASC' : 'DESC'
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            salaryMin: '',
            salaryMax: '',
            sortBy: 'created_at',
            sortOrder: 'DESC'
        });
    };

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
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getSortIcon = (field) => {
        if (filters.sortBy !== field) return null;
        return filters.sortOrder === 'ASC' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="sort-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="sort-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    const handleGenerateJob = async (e) => {
        e.preventDefault();

        if (!jobPrompt.trim()) {
            toast.warning('Please enter a job description');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/parse-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: jobPrompt })
            });

            const result = await response.json();

            if (result.success) {
                const data = result.data;
                if (data.salary) {
                    data.salary = data.salary.replace(/[^0-9]/g, '');
                }
                setJobData(data);
                setShowReview(true);
                toast.success('Job details generated successfully!');
            } else {
                toast.error(result.message || 'Failed to generate job details');
            }
        } catch (error) {
            console.error('Error generating job:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userEmail = localStorage.getItem('userEmail');
            const response = await fetch('/api/salesforce/campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: jobData.jobTitle,
                    salary: jobData.salary,
                    noOfOpenings: jobData.noOfOpenings,
                    skills: jobData.skills,
                    jobDescription: jobData.jobDescription,
                    refererEmail: userEmail
                })
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Campaign created successfully in Salesforce!');
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
                fetchJobListings(); // Refresh job listings
            } else {
                toast.error(result.message || 'Failed to create Campaign');
            }
        } catch (error) {
            console.error('Error creating Campaign:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToPrompt = () => {
        setShowReview(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowReview(false);
        setJobPrompt('');
    };

    return (
        <div className="dashboard-wrapper">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
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

                {/* Job Listings Section */}
                <div className="jobs-container fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="jobs-header">
                        <h2>Recent Job Listings</h2>
                        <span className="jobs-count">{jobListings.length} jobs</span>
                    </div>

                    {/* Filters */}
                    <div className="jobs-filters">
                        <div className="filter-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={filters.search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="filter-salary">
                            <input
                                type="number"
                                placeholder="Min Salary"
                                value={filters.salaryMin}
                                onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                            />
                            <span className="filter-separator">-</span>
                            <input
                                type="number"
                                placeholder="Max Salary"
                                value={filters.salaryMax}
                                onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                            />
                        </div>
                        {(filters.search || filters.salaryMin || filters.salaryMax) && (
                            <button className="filter-clear" onClick={clearFilters}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Jobs Table */}
                    <div className="jobs-table-wrapper">
                        {isLoadingJobs ? (
                            <div className="jobs-loading">
                                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="32" strokeLinecap="round" />
                                </svg>
                                <span>Loading jobs...</span>
                            </div>
                        ) : jobListings.length === 0 ? (
                            <div className="jobs-empty">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>No job listings found</span>
                                <p>Create your first job posting using the "Add New Job" button above</p>
                            </div>
                        ) : (
                            <table className="jobs-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('name')} className="sortable">
                                            Job Title {getSortIcon('name')}
                                        </th>
                                        <th onClick={() => handleSort('r_ats__salary__c')} className="sortable">
                                            Salary {getSortIcon('r_ats__salary__c')}
                                        </th>
                                        <th onClick={() => handleSort('r_ats__no_of_openings__c')} className="sortable">
                                            Openings {getSortIcon('r_ats__no_of_openings__c')}
                                        </th>
                                        <th onClick={() => handleSort('created_at')} className="sortable">
                                            Created {getSortIcon('created_at')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobListings.map((job, index) => (
                                        <tr
                                            key={job.id}
                                            style={{ animationDelay: `${0.05 * index}s` }}
                                            onClick={() => navigate(`/job/${job.id}`)}
                                            className="clickable-row"
                                        >
                                            <td className="job-title-cell">
                                                <div className="job-title-wrapper">
                                                    <span className="job-title">{job.job_title}</span>
                                                    {job.description && (
                                                        <span className="job-description">{job.description.substring(0, 80)}...</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="job-salary">{formatSalary(job.salary)}</td>
                                            <td className="job-openings">
                                                <span className="openings-badge">{job.no_of_openings || '-'}</span>
                                            </td>
                                            <td className="job-date">{formatDate(job.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
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
                                    <button type="submit" className="submit-btn" disabled={isLoading}>
                                        <span className="btn-content">
                                            {isLoading ? (
                                                <>
                                                    <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="32" strokeLinecap="round" />
                                                    </svg>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    Generate Job Posting
                                                </>
                                            )}
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
