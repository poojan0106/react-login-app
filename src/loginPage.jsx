import { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      alert('Please enter your email address first');
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
        alert('Verification code sent to your email!');
      } else {
        alert('Failed to send code: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Send code error:', error);
      alert('Network error: Unable to send verification code.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeSent) {
      alert('Please send a verification code first');
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
        onLogin();
      } else {
        alert('Verification failed: ' + (data.message || 'Invalid code'));
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Network error: Unable to verify code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-gradient"></div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <div className="input-with-button">
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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
                disabled={isSendingCode}
              >
                {isSendingCode ? (
                  <span className="spinner-small"></span>
                ) : codeSent ? (
                  'Resend'
                ) : (
                  'Send Code'
                )}
              </button>
            </div>
          </div>

          {codeSent && (
            <div className="input-group">
              <label htmlFor="code" className="input-label">Verification Code</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="input-field"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
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
  );
}

export default LoginPage;
