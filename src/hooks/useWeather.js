import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { fetchWeatherData, CITIES } from '../services/weatherService';

export function useWeather() {
  const { setWeather, setLoading, setLocation, location, addNotification } = useApp();
  const [isFetching, setIsFetching] = useState(false);

  const fetchWeather = useCallback(
    async (cityName = null, lat = null, lon = null, conditionOverride = null) => {
      setIsFetching(true);
      setLoading(true);

      try {
        let cityData;
        if (cityName) {
          cityData = CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase()) || { name: cityName, country: 'US', condition: 'sunny' };
        } else if (!lat || !lon) {
          cityData = CITIES[0]; // New York fallback if nothing is provided
        }

        const nameToFetch = cityData ? cityData.name : null;
        
        const { weather, hourly, forecast, condition } = await fetchWeatherData(nameToFetch, lat, lon);

        setWeather({ weather, hourly, forecast, condition, airQuality: null });
        setLocation({ city: weather.city, country: weather.country, lat: lat || (cityData && cityData.lat), lon: lon || (cityData && cityData.lon) });

        addNotification({
          type: 'success',
          title: 'Weather Updated',
          message: `Now showing weather for ${weather.city}`,
        });
      } catch (err) {
        addNotification({
          type: 'error',
          title: 'Fetch Failed',
          message: 'Unable to load weather data. Please try again.',
        });
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    },
    [setWeather, setLoading, setLocation, addNotification]
  );

  const fetchUserLocationWeather = useCallback(() => {
    if (!navigator.geolocation) {
      fetchWeather('New York'); // Fallback
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(null, position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.warn("Geolocation permission denied or unavailable. Falling back to default city.");
        fetchWeather('New York'); // Fallback
      },
      { timeout: 10000 }
    );
  }, [fetchWeather, setLoading]);

  return { fetchWeather, fetchUserLocationWeather, isFetching };
}
