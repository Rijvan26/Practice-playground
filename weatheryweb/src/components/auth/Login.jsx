import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, CloudRain } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useForm } from '../../hooks/useForm';
import ParticleBackground from '../ui/ParticleBackground';
import './Auth.css';

const validators = {
  email: (v) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 6) return 'Password must be at least 6 characters';
    return '';
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, addNotification } = useApp();
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm(
    { email: '', password: '', remember: false },
    validators
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const existingUsers = JSON.parse(localStorage.getItem('weathery_users') || '[]');
    const user = existingUsers.find(u => u.email === values.email);

    if (!user || user.password !== values.password) {
      addNotification({ 
        type: 'error', 
        title: 'Login Failed', 
        message: 'Invalid email or password.' 
      });
      setIsLoading(false);
      return;
    }

    login({
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      avatar: user.avatar,
    });

    addNotification({ type: 'success', title: 'Welcome back!', message: `Signed in as ${values.email}` });
    setIsLoading(false);
    navigate('/dashboard');
  }

  return (
    <div className="auth-page">
      <ParticleBackground />

      {/* Animated orbs */}
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="cloud-wrap">
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="cloud c3" />
        </div>
        <div className="rain-wrap" id="rainWrap">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.6 + Math.random() * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <main className="auth-container">
        <div className="glass-card" id="loginCard">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">
              <CloudRain size={22} color="#fff" />
            </div>
            <span className="brand-name">Weathery</span>
          </div>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Sign in to your weather dashboard</p>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Email */}
            <div className={`field ${touched.email && errors.email ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="loginEmail">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={17} /></span>
                <input
                  id="loginEmail"
                  type="email"
                  name="email"
                  className="field-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className={`field ${touched.password && errors.password ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="loginPassword">Password</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={17} /></span>
                <input
                  id="loginPassword"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  className="field-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  onClick={() => setShowPwd((p) => !p)}
                  aria-label="Toggle password"
                >
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="form-row">
              <label className="check-label" htmlFor="rememberMe">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="remember"
                  className="check-input"
                  checked={values.remember}
                  onChange={handleChange}
                />
                <span className="checkmark" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary" disabled={isLoading} id="loginSubmit">
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="divider"><span>or continue with</span></div>

            {/* Social */}
            <div className="social-row">
              <button type="button" className="btn-social" id="googleLogin">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="btn-social" id="appleLogin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">Create one</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
