import { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import PhotoDetail from './pages/PhotoDetail';
import Upload from './pages/Upload';
import LoginRegister from './pages/LoginRegister';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    // Load the saved user when the app starts
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
            try {
                setCurrentUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
            }
        } else {
            localStorage.removeItem('currentUser');
        }

        setAuthReady(true);
    }, []);

    // Update the user after login
    const handleLogin = (user) => {
        setCurrentUser(user);
    };

    // Clear the user data after logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <BrowserRouter>
            <div className="app-shell">

                <Navbar
                    currentUser={currentUser}
                    onLogout={handleLogout}
                />

                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/photos" element={<Gallery />} />

                        <Route
                            path="/photos/:id"
                            element={<PhotoDetail currentUser={currentUser} />}
                        />

                        <Route path="/about" element={<About />} />

                        <Route
                            path="/upload"
                            element={
                                <Upload
                                    currentUser={currentUser}
                                    authReady={authReady}
                                />
                            }
                        />

                        <Route
                            path="/login-register"
                            element={<LoginRegister onLogin={handleLogin} />}
                        />
                    </Routes>
                </div>

                <Footer />

            </div>
        </BrowserRouter>
    );
}

export default App;
