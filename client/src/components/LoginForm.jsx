import { useState } from 'react';

function LoginForm({ onLogin, isLoading, error }) {
    // Store the login information
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the login information to the parent component
        onLogin({
            email,
            password
        });
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >
            <h2>Welcome Back</h2>

            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && (
                <p className="error-message">{error}</p>
            )}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;