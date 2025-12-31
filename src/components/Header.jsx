import './Header.css';

function Header({ onLogout }) {
    return (
        <header className="app-header">
            <div className="header-left">
                <img src="/rezourcer-logo.png" alt="Rezourcer Logo" className="header-logo" />
            </div>
            <div className="header-right">
                <button onClick={onLogout} className="header-logout-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
