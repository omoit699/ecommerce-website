import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
// Updated from useHistory to useNavigate to match your React Router v6 setup
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, register } = useApp();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/"); // React Router v6 navigation format
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password, confirmPassword);
      navigate("/"); // React Router v6 navigation format
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className="auth-page"
        style={{
          maxWidth: "400px",
          margin: "50px auto",
          padding: "20px",
          background: "#FFFFFF",
          borderRadius: "4px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div className="auth-container">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#313131",
            }}
          >
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          <form
            onSubmit={isRegister ? handleRegister : handleSignIn}
            className="auth-form"
          >
            {isRegister && (
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Username:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                  style={{
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    border: "1px solid #F1F1F2",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                  border: "1px solid #F1F1F2",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                  border: "1px solid #F1F1F2",
                  borderRadius: "4px",
                }}
              />
            </div>

            {isRegister && (
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    border: "1px solid #F1F1F2",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}

            {error && (
              <p
                className="error-message"
                style={{ color: "red", fontSize: "14px", marginBottom: "15px" }}
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={isLoading} className="btn">
              {isLoading
                ? "Loading..."
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <div
            className="auth-switch"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <p style={{ margin: "0", fontSize: "14px", color: "#75757A" }}>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="toggle-btn"
                style={{
                  background: "none",
                  border: "none",
                  color: "#F68B1E",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
