import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiRequest from '../services/api';

function LoginRegister({ onLogin }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(
        searchParams.get('mode') !== 'register'
    );

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLogin(searchParams.get('mode') !== 'register');
        setError('');
    }, [searchParams]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleModeChange = () => {
        const nextMode = isLogin ? 'register' : 'login';

        setIsLogin(!isLogin);
        setSearchParams({ mode: nextMode });
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const endpoint = isLogin
                ? '/auth/login'
                : '/auth/register';

            const data = await apiRequest(endpoint, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));

            onLogin(data.user);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={`auth-page ${isLogin ? 'login-mode' : 'register-mode'}`}>
            <div className="auth-form-container">
                <span className="auth-tag">ALZIKRAYAT</span>

                <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>

                <p className="auth-description">
                    {isLogin
                        ? 'Sign in to continue sharing your memories.'
                        : 'Create an account and start sharing your memories.'}
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Please wait...'
                            : isLogin
                                ? 'Login'
                                : 'Register'}
                    </button>
                </form>

                <div className="auth-switch">
                    {isLogin
                        ? "Don't have an account?"
                        : 'Already have an account?'}

                    <button type="button" onClick={handleModeChange}>
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>

            <div className="auth-image-panel">
                <div className="auth-image-overlay">
                    <h2>
                        {isLogin ? 'Welcome to Alzikrayat' : 'Every Memory Matters'}
                    </h2>

                    <p>
                        Keep your beautiful memories alive and share them with others.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default LoginRegister;