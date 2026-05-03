import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Globe, CloudRain, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useForm } from '../../hooks/useForm';
import ParticleBackground from '../ui/ParticleBackground';
import './Auth.css';

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'OTHER', flag: '🌍', name: 'Other' },
];

function getStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

const validators = {
  name: (v) => (!v?.trim() ? 'Full name is required' : ''),
  email: (v) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 8) return 'Password must be at least 8 characters';
    return '';
  },
  confirmPassword: (v, all) => {
    if (!v) return 'Please confirm your password';
    if (v !== all.password) return 'Passwords do not match';
    return '';
  },
  country: (v) => (!v ? 'Please select your country' : ''),
  terms: (v) => (!v ? 'You must accept the terms to continue' : ''),
};

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated, addNotification } = useApp();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm(
    { name: '', email: '', password: '', confirmPassword: '', country: '', terms: false },
    validators
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const strength = getStrength(values.password);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('weathery_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.some(u => u.email === values.email)) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: 'An account with this email already exists.',
      });
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      password: values.password, // In a real app, never store plain text passwords!
      country: values.country,
      avatar: null,
    };

    // Save to local storage
    localStorage.setItem('weathery_users', JSON.stringify([...existingUsers, newUser]));

    // Log the user in
    register({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      country: newUser.country,
      avatar: newUser.avatar,
    });

    addNotification({
      type: 'success',
      title: 'Account Created!',
      message: `Welcome to Weathery, ${values.name.split(' ')[0]}!`,
    });
    setIsLoading(false);
    navigate('/dashboard');
  }

  return (
    <div className="auth-page register-page">
      <ParticleBackground />

      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="cloud-wrap">
          <div className="cloud c1" />
          <div className="cloud c2" />
        </div>
      </div>

      <main className="auth-container">
        <div className="glass-card register-card" id="registerCard">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">
              <CloudRain size={22} color="#fff" />
            </div>
            <span className="brand-name">Weathery</span>
          </div>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-sub">Join thousands of weather enthusiasts</p>

          <form onSubmit={handleSubmit} noValidate className="auth-form">

            {/* Name */}
            <div className={`field ${touched.name && errors.name ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="regName">Full Name</label>
              <div className="field-wrap">
                <span className="field-icon"><User size={17} /></span>
                <input
                  id="regName" type="text" name="name"
                  className="field-input" placeholder="John Doe"
                  autoComplete="name"
                  value={values.name} onChange={handleChange} onBlur={handleBlur}
                />
              </div>
              {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={`field ${touched.email && errors.email ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="regEmail">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={17} /></span>
                <input
                  id="regEmail" type="email" name="email"
                  className="field-input" placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email} onChange={handleChange} onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`field ${touched.password && errors.password ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="regPassword">Password</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={17} /></span>
                <input
                  id="regPassword" type={showPwd ? 'text' : 'password'} name="password"
                  className="field-input" placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(p => !p)}>
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {/* Strength meter */}
              {values.password && (
                <div className="strength-meter">
                  <div className="strength-bars">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)' }}
                      />
                    ))}
                  </div>
                  <span className="strength-text" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
              {touched.password && errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className={`field ${touched.confirmPassword && errors.confirmPassword ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="confirmPwd">Confirm Password</label>
              <div className="field-wrap">
                <span className="field-icon">
                  {values.confirmPassword && values.confirmPassword === values.password
                    ? <CheckCircle size={17} color="#22c55e" />
                    : <Lock size={17} />}
                </span>
                <input
                  id="confirmPwd" type={showConfirm ? 'text' : 'password'} name="confirmPassword"
                  className="field-input" placeholder="Repeat your password"
                  autoComplete="new-password"
                  value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowConfirm(p => !p)}>
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Country */}
            <div className={`field ${touched.country && errors.country ? 'field--error' : ''}`}>
              <label className="field-label" htmlFor="regCountry">Country</label>
              <div className="field-wrap select-wrap">
                <span className="field-icon"><Globe size={17} /></span>
                <select
                  id="regCountry" name="country"
                  className="field-input field-select"
                  value={values.country} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
                <span className="select-chevron">▾</span>
              </div>
              {touched.country && errors.country && <span className="field-error">{errors.country}</span>}
            </div>

            {/* Terms */}
            <div className={`field ${touched.terms && errors.terms ? 'field--error' : ''}`}>
              <label className="check-label" htmlFor="acceptTerms">
                <input
                  type="checkbox" id="acceptTerms" name="terms"
                  className="check-input"
                  checked={values.terms} onChange={handleChange} onBlur={handleBlur}
                />
                <span className="checkmark" />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="auth-link">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                </span>
              </label>
              {touched.terms && errors.terms && <span className="field-error">{errors.terms}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary" disabled={isLoading} id="registerSubmit">
              {isLoading ? <span className="btn-spinner" /> : 'Create Account'}
            </button>

            <div className="divider"><span>or sign up with</span></div>

            <div className="social-row">
              <button type="button" className="btn-social" id="googleReg">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="btn-social" id="appleReg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/" className="auth-link">Sign in</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
