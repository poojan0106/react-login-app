import { useState, useEffect } from 'react';
import { ToastContainer, useToast } from './components/Toast';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toasts, toast, removeToast } = useToast();

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Format timer display (MM:SS)
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendCode = async () => {
    if (!email) {
      toast.warning('Please enter your email address first');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSendingCode(true);
    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setCodeSent(true);
        setResendTimer(60); // Start 1-minute timer
        toast.success('Verification code sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('Send code error:', error);
      toast.error('Network error: Unable to send verification code');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeSent) {
      toast.warning('Please send a verification code first');
      return;
    }

    if (!verificationCode || verificationCode.length !== 6) {
      toast.warning('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Verification successful! Redirecting...');
        setTimeout(() => {
          onLogin();
        }, 1000);
      } else {
        toast.error(data.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Network error: Unable to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const isResendDisabled = isSendingCode || resendTimer > 0;

  return (
    <div className="login-container">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="circle-decoration">
        <img src="/globle.png" alt="Decorative Globe" />
      </div>

      <div className="content-wrapper">
        <div className="left-section">
          <div className="logo-section sm-hidden">
            <div className="logo-container">
              <img src="rezourcer-logo.png" alt="ReZourcer Logo" className="logo-img" />
              <div className="ai-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          <div className="intro-text">
            <h1 className="main-heading">
              <span className="gradient-text">Transform</span> Your Recruitment
            </h1>
            <h2 className="sub-heading">The Future of Talent Acquisition is Here</h2>
            <p className="description">
              ReZourcer Performance combines cutting-edge AI technology with Salesforce's #1 CRM platform.
              Experience intelligent candidate matching, automated workflows, and data-driven insights that
              empower your recruitment team to work smarter, not harder.
            </p>
          </div>

          <div className="feature-highlights">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Smart Matching AI</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Automated Workflows</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19V6L20 3V16M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM20 16C20 17.1046 18.6569 18 17 18C15.3431 18 14 17.1046 14 16C14 14.8954 15.3431 14 17 14C18.6569 14 20 14.8954 20 16Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Real-time Analytics</span>
            </div>
          </div>

          <div className="buttons">
            <button className="btn-outline">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.752 11.168L20.707 5.213M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Explore Features
            </button>
            <button className="btn-outline">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              View Roadmap
            </button>
          </div>
        </div>

        <div className="right-section">
          <div className="logo-section xl-hidden">
            <div className="logo-container">
              <img src="rezourcer-logo.png" alt="ReZourcer Logo" className="logo-img" />
              <div className="ai-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          <div className="login-box">
            <div className="box-glow"></div>
            <div className="avatar-container">
              <div className="avatar-silhouette">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <div className="pulse-ring"></div>
            </div>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to access your AI-powered dashboard</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="input-label">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                      <path d="M10 12C4.477 12 0 14.686 0 18V20H20V18C20 14.686 15.523 12 10 12Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input-field"
                    required
                  />
                </div>
                <button
                  type="button"
                  className={`send-code-button ${isSendingCode ? 'loading' : ''} ${codeSent ? 'sent' : ''}`}
                  onClick={handleSendCode}
                  disabled={isResendDisabled}
                >
                  {isSendingCode ? (
                    <span className="spinner-small"></span>
                  ) : resendTimer > 0 ? (
                    <span className="timer-text">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="timer-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTimer(resendTimer)}
                    </span>
                  ) : codeSent ? (
                    'Resend Code'
                  ) : (
                    'Send Code'
                  )}
                </button>

                {codeSent && (
                  <div className="form-group verificaionbox">
                    <label htmlFor="code" className="input-label">Verification Code</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        id="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit code"
                        className="input-field"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`btn-login ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !codeSent}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify & Sign In'
                )}
              </button>
            </form>

            <div className="signup-prompt">
              Don't have an account? <a href="#" className="signup-link">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
