import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    // Display the logo, copyright information and page links
    return (
        <footer className="footer">
            <div className="footer-content">

                <Link to="/" className="footer-logo">
                    <span className="footer-logo-icon">•</span>
                    <span>Alzikrayat</span>
                </Link>

                <p className="footer-copyright">
                    © {new Date().getFullYear()} Alzikrayat
                    — Every memory, perfectly kept.
                </p>

                <nav className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/photos">Photos</Link>
                    <Link to="/">Home</Link>
                </nav>

            </div>
        </footer>
    );
}

export default Footer;