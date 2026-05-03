import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Bell, LogOut, Sun, Moon, Mic, Wind,
  Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset,
  TrendingUp, Home, Compass, AlertTriangle, User as UserIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useWeather } from '../../hooks/useWeather';
import NotificationToast from '../ui/NotificationToast';
import { searchCity } from '../../services/weatherService';
import './Dashboard.css';

const CONDITION_THEMES = {
  sunny: {
    bg: 'linear-gradient(160deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
    particles: '#fde68a',
  },
  cloudy: {
    bg: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    accent: '#94a3b8',
    glow: 'rgba(148,163,184,0.2)',
    particles: '#e2e8f0',
  },
  rainy: {
    bg: 'linear-gradient(160deg, #0d1117 0%, #161b22 40%, #0d3251 100%)',
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.25)',
    particles: '#93c5fd',
  },
  night: {
    bg: 'linear-gradient(160deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)',
    accent: '#a5b4fc',
    glow: 'rgba(165,180,252,0.2)',
    particles: '#c7d2fe',
  },
  storm: {
    bg: 'linear-gradient(160deg, #030712 0%, #111827 40%, #1f2937 100%)',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
    particles: '#fcd34d',
  },
  snow: {
    bg: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 40%, #1e3a5f 100%)',
    accent: '#e0f2fe',
    glow: 'rgba(224,242,254,0.25)',
    particles: '#f0f9ff',
  },
};

function TempChart({ data, accent }) {
  const svgRef = useRef(null);
  if (!data?.length) return null;

  const width = 100;
  const height = 40;
  const temps = data.map(d => d.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.temp - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="temp-svg">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#chartGrad)" />
      <polyline points={points} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AQIBar({ value }) {
  const pct = Math.min((value / 300) * 100, 100);
  const color = value < 50 ? '#22c55e' : value < 100 ? '#f59e0b' : value < 150 ? '#f97316' : '#ef4444';
  return (
    <div className="aqi-bar-wrap">
      <div className="aqi-bar-track">
        <div className="aqi-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="aqi-value" style={{ color }}>{value} AQI</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    user, isAuthenticated, theme, toggleTheme, logout,
    weather, forecast, hourly, location, weatherCondition,
    isLoadingWeather, activeTab, setActiveTab, notifications,
    removeNotification,
  } = useApp();
  const { fetchWeather, fetchUserLocationWeather } = useWeather();

  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [tempTrend, setTempTrend] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef(null);

  const theme_cfg = CONDITION_THEMES[weatherCondition] || CONDITION_THEMES.sunny;

  // Load initial weather
  useEffect(() => {
    if (!isAuthenticated) { navigate('/', { replace: true }); return; }
    if (!weather && !isLoadingWeather) {
      fetchUserLocationWeather();
    }
  }, [isAuthenticated, navigate, weather, fetchUserLocationWeather, isLoadingWeather]);

  // Set temp trend from context if available
  useEffect(() => {
    if (weather && weather.tempTrend) {
      setTempTrend(weather.tempTrend);
    }
  }, [weather]);

  // Search filter
  useEffect(() => {
    if (!searchVal.trim()) { setSearchResults([]); return; }
    const timeout = setTimeout(async () => {
      const results = await searchCity(searchVal);
      setSearchResults(results.slice(0, 6));
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchVal]);

  function handleCitySelect(city) {
    fetchWeather(city.name, city.lat, city.lon, city.condition);
    setSearchVal('');
    setShowSearch(false);
    setSearchResults([]);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function handleVoiceSearch() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    rec.lang = 'en-US';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => {
      const city = e.results[0][0].transcript;
      setSearchVal(city);
    };
    rec.start();
  }

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Compass, label: 'Search' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
  ];

  if (!weather && isLoadingWeather) {
    return (
      <div className="dash-loading" style={{ background: CONDITION_THEMES.sunny.bg }}>
        <div className="loading-orb" />
        <span>Loading weather…</span>
      </div>
    );
  }

  return (
    <div
      className={`dashboard ${theme}`}
      style={{ '--accent': theme_cfg.accent, '--glow': theme_cfg.glow, background: theme_cfg.bg }}
    >
      {/* Notifications */}
      <div className="toast-area">
        {notifications.map(n => (
          <NotificationToast key={n.id} notification={n} onClose={() => removeNotification(n.id)} />
        ))}
      </div>

      {/* Ambient Glow Orbs */}
      <div className="ambient-orbs" aria-hidden>
        <div className="amb-orb amb-1" style={{ background: `radial-gradient(circle, ${theme_cfg.accent}44 0%, transparent 70%)` }} />
        <div className="amb-orb amb-2" style={{ background: `radial-gradient(circle, ${theme_cfg.accent}22 0%, transparent 70%)` }} />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="dash-nav">
        <div className="nav-left">
          <div className="nav-brand">
            <span className="nav-logo">🌤</span>
            <span className="nav-title">Weathery</span>
          </div>
        </div>

        <div className="nav-location">
          <MapPin size={14} color="var(--accent)" />
          <span>{location.city}, {location.country}</span>
        </div>

        <div className="nav-actions">
          <button className="nav-btn" onClick={toggleTheme} aria-label="Toggle theme" id="themeToggle">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="nav-btn" aria-label="Notifications" id="notifBtn">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
          <div className="nav-avatar" title="Profile" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
            <span>{user?.name?.[0]?.toUpperCase() || 'U'}</span>
          </div>
        </div>
      </header>

      {/* ── Search Bar ─────────────────────────────────────────── */}
      <div className="search-section">
        <div className="search-wrap" ref={searchRef}>
          <Search size={17} className="search-icon" />
          <input
            id="citySearch"
            className="search-input"
            placeholder="Search city or location…"
            value={searchVal}
            onChange={e => { setSearchVal(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
            onKeyDown={e => e.key === 'Enter' && searchResults[0] && handleCitySelect(searchResults[0])}
          />
          <button className="voice-btn" onClick={fetchUserLocationWeather} aria-label="Use current location" title="Current Location">
            <MapPin size={17} />
          </button>
          <button className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={handleVoiceSearch} aria-label="Voice search">
            <Mic size={17} />
          </button>
        </div>
        {showSearch && searchResults.length > 0 && (
          <div className="search-dropdown">
            {searchResults.map(city => (
              <button key={city.name} className="search-result" onClick={() => handleCitySelect(city)}>
                <MapPin size={14} />
                <span>{city.name}</span>
                <span className="result-country">{city.country_code || city.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      {weather && activeTab === 'home' && (
        <main className="dash-content">

          {/* Hero Temperature Card */}
          <section className="hero-card glass-panel">
            <div className="hero-top">
              <div>
                <div className="hero-condition">{weather.description}</div>
                <div className="hero-temp">
                  {weather.temp}<span className="deg">°C</span>
                </div>
                <div className="hero-feels">
                  Feels like {weather.feelsLike}°C
                </div>
              </div>
              <div className="hero-icon-wrap">
                <div className="weather-icon-anim">{weather.icon}</div>
              </div>
            </div>

            {/* Mini chart */}
            <div className="mini-chart">
              <TempChart data={tempTrend} accent={theme_cfg.accent} />
            </div>

            <div className="hero-meta">
              <span>{new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span className="live-badge">● Live</span>
            </div>
          </section>

          {/* Stats Row */}
          <section className="stats-grid">
            {[
              { icon: <Droplets size={18} />, label: 'Humidity', value: `${weather.humidity}%` },
              { icon: <Wind size={18} />, label: 'Wind', value: `${weather.windSpeed} km/h ${weather.windDir}` },
              { icon: <Eye size={18} />, label: 'Visibility', value: `${weather.visibility} km` },
              { icon: <Gauge size={18} />, label: 'Pressure', value: `${weather.pressure} hPa` },
              { icon: <Sun size={18} />, label: 'UV Index', value: weather.uvIndex },
              { icon: <Thermometer size={18} />, label: 'Dew Point', value: `${weather.dewPoint}°C` },
            ].map((s, i) => (
              <div className="stat-card glass-panel" key={i} style={{ '--delay': `${i * 60}ms` }}>
                <span className="stat-icon" style={{ color: 'var(--accent)' }}>{s.icon}</span>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Hourly Forecast */}
          {hourly && (
            <section className="section-block">
              <h2 className="section-title">Hourly Forecast</h2>
              <div className="hourly-scroll">
                {hourly.map((h, i) => (
                  <div className={`hourly-card glass-panel ${i === 0 ? 'hourly-active' : ''}`} key={i}>
                    <span className="hourly-time">{h.label}</span>
                    <span className="hourly-icon">{h.icon}</span>
                    <span className="hourly-temp">{h.temp}°</span>
                    <div className="hourly-precip">
                      <Droplets size={10} />
                      {h.precipitation}%
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7-Day Forecast */}
          {forecast && (
            <section className="section-block">
              <h2 className="section-title">7-Day Forecast</h2>
              <div className="forecast-list">
                {forecast.map((f, i) => (
                  <div className="forecast-row glass-panel" key={i} style={{ '--delay': `${i * 50}ms` }}>
                    <span className="fc-day">{f.day}</span>
                    <span className="fc-icon">{f.icon}</span>
                    <span className="fc-desc">{f.description}</span>
                    <div className="fc-precip">
                      <Droplets size={11} />
                      {f.precipitation}%
                    </div>
                    <div className="fc-temps">
                      <span className="fc-high">{f.high}°</span>
                      <div className="temp-bar-wrap">
                        <div className="temp-bar" style={{
                          '--low-pct': `${((f.low + 10) / 60) * 100}%`,
                          '--high-pct': `${((f.high + 10) / 60) * 100}%`,
                          '--bar-color': 'var(--accent)'
                        }} />
                      </div>
                      <span className="fc-low">{f.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Two-column: Sunrise/Sunset + AQI */}
          <div className="two-col">
            {/* Sunrise/Sunset */}
            <section className="section-block glass-panel sun-card">
              <h2 className="section-title">Sun & Moon</h2>
              <div className="sun-arc">
                <svg viewBox="0 0 200 100" className="sun-svg">
                  <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke={theme_cfg.accent} strokeWidth="2"
                    strokeDasharray="282" strokeDashoffset="80" strokeLinecap="round" />
                  <circle cx="130" cy="38" r="10" fill={theme_cfg.accent} opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate"
                      from="0 100 90" to="0 100 90" dur="1s" repeatCount="0" />
                  </circle>
                </svg>
              </div>
              <div className="sun-times">
                <div className="sun-time">
                  <Sunrise size={20} color="#fbbf24" />
                  <div>
                    <div className="st-label">Sunrise</div>
                    <div className="st-val">{weather.sunrise}</div>
                  </div>
                </div>
                <div className="sun-time">
                  <Sunset size={20} color="#f97316" />
                  <div>
                    <div className="st-label">Sunset</div>
                    <div className="st-val">{weather.sunset}</div>
                  </div>
                </div>
              </div>
              <div className="moon-phase">
                <span>🌔</span>
                <span>{weather.moonPhase}</span>
              </div>
            </section>

            {/* Air Quality */}
            <section className="section-block glass-panel aqi-card">
              <h2 className="section-title">Air Quality</h2>
              <div className="aqi-status">
                <span className="aqi-emoji">{weather.aqi < 50 ? '😊' : weather.aqi < 100 ? '😐' : '😷'}</span>
                <span className="aqi-label-text">{weather.aqiLabel}</span>
              </div>
              <AQIBar value={weather.aqi} />
              <div className="aqi-pollutants">
                {[
                  { name: 'PM2.5', val: weather.pm25 },
                  { name: 'PM10', val: weather.pm10 },
                  { name: 'O₃', val: weather.o3 },
                  { name: 'NO₂', val: weather.no2 },
                ].map(p => (
                  <div className="pollutant" key={p.name}>
                    <span className="poll-name">{p.name}</span>
                    <span className="poll-val">{p.val} μg</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Temperature Trend Chart */}
          <section className="section-block glass-panel chart-card">
            <h2 className="section-title">
              <TrendingUp size={16} style={{ marginRight: 6, color: 'var(--accent)' }} />
              24-Hour Temperature Trend
            </h2>
            <div className="chart-container">
              <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="full-chart-svg">
                <defs>
                  <linearGradient id="fullGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme_cfg.accent} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={theme_cfg.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {tempTrend.length > 1 && (() => {
                  const temps = tempTrend.map(d => d.temp);
                  const min = Math.min(...temps);
                  const max = Math.max(...temps);
                  const rng = max - min || 1;
                  const pts = tempTrend.map((d, i) => {
                    const x = (i / (tempTrend.length - 1)) * 400;
                    const y = 75 - ((d.temp - min) / rng) * 65;
                    return `${x},${y}`;
                  }).join(' ');
                  const areaPts = `0,80 ${pts} 400,80`;
                  return (
                    <>
                      <polygon points={areaPts} fill="url(#fullGrad)" />
                      <polyline points={pts} fill="none" stroke={theme_cfg.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      {tempTrend.filter((_, i) => i % 4 === 0).map((d, i) => {
                        const idx = i * 4;
                        const x = (idx / (tempTrend.length - 1)) * 400;
                        const y = 75 - ((d.temp - min) / rng) * 65;
                        return (
                          <g key={i}>
                            <circle cx={x} cy={y} r="3" fill={theme_cfg.accent} />
                            <text x={x} y="80" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">
                              {d.hour.split(':')[0]}h
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </section>

        </main>
      )}

      {activeTab === 'search' && (
        <main className="dash-content">
          <section className="section-block glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Compass size={48} color="var(--accent)" style={{ margin: '0 auto 20px', opacity: 0.8 }} />
            <h2 className="section-title" style={{ justifyContent: 'center' }}>Explore Locations</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
              Use the search bar above to find weather for any city in the world.
            </p>
            <button 
              className="primary-btn" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('citySearch')?.focus();
              }}
              style={{ padding: '10px 24px', borderRadius: '20px', background: 'var(--accent)', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Start Searching
            </button>
          </section>
        </main>
      )}

      {activeTab === 'alerts' && (
        <main className="dash-content">
          <section className="section-block glass-panel" style={{ padding: '24px' }}>
            <h2 className="section-title">
              <AlertTriangle size={18} style={{ marginRight: 8, color: '#ef4444' }} />
              Weather Alerts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {weather?.condition === 'storm' ? (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#fca5a5' }}>Severe Thunderstorm Warning</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                    Heavy rain, lightning, and strong winds are expected. Please stay indoors and avoid travel if possible.
                  </p>
                </div>
              ) : weather?.condition === 'snow' ? (
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#93c5fd' }}>Winter Weather Advisory</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                    Snow accumulation expected. Roads may be slippery. Drive with extreme caution.
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'rgba(255,255,255,0.5)' }}>
                  <Bell size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                  <p>No active weather alerts for your area.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'profile' && (
        <main className="dash-content">
          <section className="section-block glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
            <div className="nav-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 20px', fontSize: '32px' }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{user?.name || 'Guest User'}</h2>
            <p style={{ margin: '0 0 30px 0', color: 'rgba(255,255,255,0.6)' }}>{user?.email || 'Not logged in'}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto' }}>
              <button 
                className="glass-panel" 
                onClick={toggleTheme}
                style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'rgba(0,0,0,0.2)' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
              <button 
                className="glass-panel" 
                onClick={handleLogout}
                style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', background: 'rgba(239,68,68,0.1)' }}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ── Bottom Navigation ───────────────────────────────────── */}
      <nav className="bottom-nav glass-panel">
        {tabs.map(t => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            className={`nav-tab ${activeTab === t.id ? 'nav-tab--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <t.icon size={22} />
            <span>{t.label}</span>
            {activeTab === t.id && <span className="tab-indicator" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
