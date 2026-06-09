import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useHistory } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login, register } = useApp();
    const history = useHistory();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            history.push('/');
        } catch (err: any) {
            setError(err.message || 'Sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await register(username, email, password, confirmPassword);
            history.push('/');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>

                <form onSubmit={isRegister ? handleRegister : handleSignIn} className="auth-form">
                    {isRegister && (
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {isRegister && (
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={isLoading} className="submit-btn">
                        {isLoading ? 'Loading...' : isRegister ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-switch">
                    <p>
                        {isRegister ? 'Already have an account?' : \"Don't have an account?\"}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setError('');
                            }}
                            className="toggle-btn"
                        >
                            {isRegister ? 'Sign In' : 'Register'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
};

export default SignIn;