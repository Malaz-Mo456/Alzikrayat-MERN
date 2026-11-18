import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <span className="navbar-logo-icon">•</span>
                <span>Alzikrayat</span>
            </Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/photos">Gallery</Link>
                <Link to="/about">About</Link>
            </div>

            <div className="navbar-actions">
                {currentUser ? (
                    <>
                        <span className="navbar-greeting">
                            Hi {currentUser.firstName}
                        </span>

                        <Link to="/upload" className="upload-nav-button">
                            Upload Photo
                        </Link>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login-register?mode=login">
                            Login
                        </Link>

                        <Link
                            to="/login-register?mode=register"
                            className="register-button"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;