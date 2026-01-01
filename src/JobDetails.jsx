import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Sample job data (matching the dashboard sample data)
    const sampleJobs = [
        {
            id: 1,
            job_title: 'Senior React Developer',
            salary: 150000,
            no_of_openings: 3,
            description: 'We are looking for an experienced React developer to join our team. Must have 5+ years of experience with modern JavaScript frameworks.',
            skills: 'React, JavaScript, TypeScript, Redux, Node.js, REST APIs, GraphQL',
            location: 'San Francisco, CA',
            job_type: 'Full-time',
            experience_level: 'Senior',
            department: 'Engineering',
            created_at: new Date().toISOString(),
            benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Stock Options', 'Unlimited PTO'],
            responsibilities: [
                'Design and implement new features using React and TypeScript',
                'Collaborate with cross-functional teams to define and ship new features',
                'Write clean, maintainable, and well-tested code',
                'Mentor junior developers and conduct code reviews',
                'Participate in architectural decisions and technical planning'
            ],
            requirements: [
                '5+ years of experience with React.js',
                'Strong proficiency in JavaScript/TypeScript',
                'Experience with state management (Redux, Context API)',
                'Familiarity with RESTful APIs and GraphQL',
                'Bachelor\'s degree in Computer Science or equivalent experience'
            ]
        },
        {
            id: 2,
            job_title: 'Salesforce Administrator',
            salary: 95000,
            no_of_openings: 2,
            description: 'Seeking a certified Salesforce Administrator to manage our CRM platform and implement new features.',
            skills: 'Salesforce, Apex, SOQL, Lightning, Process Builder, Flow',
            location: 'New York, NY',
            job_type: 'Full-time',
            experience_level: 'Mid-level',
            department: 'Operations',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            benefits: ['Health Insurance', '401k Match', 'Hybrid Work', 'Professional Development'],
            responsibilities: [
                'Manage and maintain Salesforce CRM environment',
                'Create and customize reports and dashboards',
                'Implement automation using Flow and Process Builder',
                'Provide user training and support',
                'Ensure data integrity and security compliance'
            ],
            requirements: [
                'Salesforce Administrator certification required',
                '3+ years of Salesforce administration experience',
                'Experience with Apex and SOQL preferred',
                'Strong analytical and problem-solving skills',
                'Excellent communication skills'
            ]
        },
        {
            id: 3,
            job_title: 'Full Stack Engineer',
            salary: 130000,
            no_of_openings: 5,
            description: 'Join our engineering team to build scalable web applications using Node.js, React, and PostgreSQL.',
            skills: 'Node.js, React, PostgreSQL, Docker, AWS, Git, Agile',
            location: 'Austin, TX',
            job_type: 'Full-time',
            experience_level: 'Mid-level',
            department: 'Engineering',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Learning Budget', 'Gym Membership'],
            responsibilities: [
                'Develop and maintain full-stack web applications',
                'Design and implement database schemas',
                'Build RESTful APIs and microservices',
                'Deploy and manage applications on AWS',
                'Collaborate with product and design teams'
            ],
            requirements: [
                '3+ years of full-stack development experience',
                'Proficiency in Node.js and React',
                'Experience with SQL databases (PostgreSQL preferred)',
                'Familiarity with cloud services (AWS/GCP)',
                'Experience with Docker and containerization'
            ]
        },
        {
            id: 4,
            job_title: 'DevOps Engineer',
            salary: 140000,
            no_of_openings: 1,
            description: 'Looking for a DevOps expert to manage our AWS infrastructure and CI/CD pipelines.',
            skills: 'AWS, Kubernetes, Docker, Terraform, Jenkins, Python, Linux',
            location: 'Seattle, WA',
            job_type: 'Full-time',
            experience_level: 'Senior',
            department: 'Infrastructure',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Stock Options', 'Conference Budget'],
            responsibilities: [
                'Design and maintain cloud infrastructure on AWS',
                'Implement and manage CI/CD pipelines',
                'Automate deployment and scaling processes',
                'Monitor system performance and reliability',
                'Implement security best practices'
            ],
            requirements: [
                '5+ years of DevOps/SRE experience',
                'Strong experience with AWS services',
                'Expertise in Kubernetes and Docker',
                'Experience with Infrastructure as Code (Terraform)',
                'Strong scripting skills (Python, Bash)'
            ]
        },
        {
            id: 5,
            job_title: 'UI/UX Designer',
            salary: 110000,
            no_of_openings: 2,
            description: 'Creative designer needed to craft beautiful user interfaces and improve user experience across our products.',
            skills: 'Figma, Sketch, Adobe XD, Prototyping, User Research, Design Systems',
            location: 'Los Angeles, CA',
            job_type: 'Full-time',
            experience_level: 'Mid-level',
            department: 'Design',
            created_at: new Date(Date.now() - 345600000).toISOString(),
            benefits: ['Health Insurance', '401k Match', 'Hybrid Work', 'Creative Tools Budget', 'Wellness Program'],
            responsibilities: [
                'Create wireframes, prototypes, and high-fidelity designs',
                'Conduct user research and usability testing',
                'Develop and maintain design systems',
                'Collaborate with developers to implement designs',
                'Present design solutions to stakeholders'
            ],
            requirements: [
                '4+ years of UI/UX design experience',
                'Proficiency in Figma and design tools',
                'Strong portfolio demonstrating design process',
                'Experience with design systems',
                'Excellent visual design skills'
            ]
        }
    ];

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call - in production, fetch from /api/salesforce/jobs/:id
        setTimeout(() => {
            const foundJob = sampleJobs.find(j => j.id === parseInt(id));
            setJob(foundJob || null);
            setIsLoading(false);
        }, 500);
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
                                <span className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {job.location}
                                </span>
                                <span className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {job.department}
                                </span>
                                <span className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {job.job_type}
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
                                <span className="quick-info-value">{job.no_of_openings} positions</span>
                            </div>
                        </div>
                        <div className="quick-info-card">
                            <div className="quick-info-icon level-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="quick-info-text">
                                <span className="quick-info-label">Experience</span>
                                <span className="quick-info-value">{job.experience_level}</span>
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
                            <p className="description-text">{job.description}</p>
                        </div>

                        {/* Responsibilities */}
                        <div className="content-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <h2>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                Responsibilities
                            </h2>
                            <ul className="list-items">
                                {job.responsibilities?.map((item, index) => (
                                    <li key={index}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="content-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <h2>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Requirements
                            </h2>
                            <ul className="list-items">
                                {job.requirements?.map((item, index) => (
                                    <li key={index}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="job-sidebar">
                        {/* Skills */}
                        <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.15s' }}>
                            <h3>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Required Skills
                            </h3>
                            <div className="skills-tags">
                                {job.skills?.split(',').map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill.trim()}</span>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.25s' }}>
                            <h3>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                                Benefits
                            </h3>
                            <ul className="benefits-list">
                                {job.benefits?.map((benefit, index) => (
                                    <li key={index}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Share */}
                        <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.35s' }}>
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
