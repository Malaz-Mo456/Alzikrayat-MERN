import { useState } from 'react';

function RegisterForm({ onRegister, isLoading, error }) {
    // Store all registration fields in one state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        location: '',
        occupation: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the changed field without removing other values
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the registration data to the parent component
        onRegister(formData);
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >
            <h2>Create Account</h2>

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
                minLength="8"
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location (Optional)"
                value={formData.location}
                onChange={handleChange}
            />

            <input
                type="text"
                name="occupation"
                placeholder="Occupation (Optional)"
                value={formData.occupation}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Tell us about yourself (Optional)"
                value={formData.description}
                onChange={handleChange}
            />

            {error && (
                <p className="error-message">{error}</p>
            )}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Register'}
            </button>
        </form>
    );
}

export default RegisterForm;