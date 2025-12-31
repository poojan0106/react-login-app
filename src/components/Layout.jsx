import Header from './Header';
import Footer from './Footer';
import './Layout.css';

function Layout({ children, onLogout }) {
    return (
        <div className="app-layout">
            <Header onLogout={onLogout} />
            <main className="app-main">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
