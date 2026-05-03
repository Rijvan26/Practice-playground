import { createContext, useContext, useReducer, useCallback } from 'react';

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  // Auth
  user: null,
  isAuthenticated: false,

  // Theme
  theme: 'dark', // 'dark' | 'light'

  // Weather
  weather: null,
  forecast: null,
  hourly: null,
  airQuality: null,
  location: { city: 'New York', country: 'US', lat: 40.7128, lon: -74.006 },
  weatherCondition: 'cloudy', // sunny | rainy | cloudy | night | storm | snow
  isLoadingWeather: false,
  weatherError: null,

  // UI
  activeTab: 'home',
  searchQuery: '',
  notifications: [],
};

// ── Action Types ──────────────────────────────────────────────────────────────
export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_WEATHER: 'SET_WEATHER',
  SET_LOCATION: 'SET_LOCATION',
  SET_LOADING: 'SET_LOADING',
  SET_WEATHER_ERROR: 'SET_WEATHER_ERROR',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case ACTIONS.REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    case ACTIONS.SET_WEATHER:
      return {
        ...state,
        weather: action.payload.weather,
        forecast: action.payload.forecast,
        hourly: action.payload.hourly,
        airQuality: action.payload.airQuality,
        weatherCondition: action.payload.condition,
        isLoadingWeather: false,
        weatherError: null,
      };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoadingWeather: action.payload };
    case ACTIONS.SET_WEATHER_ERROR:
      return { ...state, weatherError: action.payload, isLoadingWeather: false };
    case ACTIONS.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 5),
      };
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = useCallback((userData) => {
    dispatch({ type: ACTIONS.LOGIN, payload: userData });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
  }, []);

  const register = useCallback((userData) => {
    dispatch({ type: ACTIONS.REGISTER, payload: userData });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  }, []);

  const setWeather = useCallback((data) => {
    dispatch({ type: ACTIONS.SET_WEATHER, payload: data });
  }, []);

  const setLocation = useCallback((loc) => {
    dispatch({ type: ACTIONS.SET_LOCATION, payload: loc });
  }, []);

  const setLoading = useCallback((val) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: val });
  }, []);

  const setActiveTab = useCallback((tab) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab });
  }, []);

  const setSearchQuery = useCallback((q) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: q });
  }, []);

  const addNotification = useCallback((notification) => {
    dispatch({
      type: ACTIONS.ADD_NOTIFICATION,
      payload: { ...notification, id: Date.now() },
    });
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id });
  }, []);

  const value = {
    ...state,
    login,
    logout,
    register,
    toggleTheme,
    setWeather,
    setLocation,
    setLoading,
    setActiveTab,
    setSearchQuery,
    addNotification,
    removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
