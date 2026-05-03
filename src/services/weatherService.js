// Open-Meteo API Implementation (Free, No API Key Required)
export const CONDITIONS = ['sunny', 'cloudy', 'rainy', 'night', 'storm', 'snow'];

function mapWmoToCondition(code, isDay) {
  if (code === 0) return isDay ? 'sunny' : 'night';
  if (code === 1 || code === 2 || code === 3 || code === 45 || code === 48) return 'cloudy';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95 && code <= 99) return 'storm';
  return 'cloudy';
}

function mapWmoToDescription(code) {
  const map = {
    0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing Rime Fog',
    51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
    61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
    71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
    85: 'Slight Snow Showers', 86: 'Heavy Snow Showers',
    95: 'Thunderstorm', 96: 'Thunderstorm & Hail', 99: 'Heavy Thunderstorm'
  };
  return map[code] || 'Unknown';
}

function mapWmoToIcon(code, isDay) {
  const condition = mapWmoToCondition(code, isDay);
  const iconMap = {
    sunny: '☀️', cloudy: '⛅', rainy: '🌧️', night: '🌙', storm: '⛈️', snow: '❄️'
  };
  return iconMap[condition] || '⛅';
}

function mapWindDir(degrees) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(degrees / 45) % 8];
}

function formatTime(isoString) {
  if (!isoString) return '--:--';
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export async function fetchWeatherData(city, inputLat, inputLon) {
  try {
    let lat = inputLat;
    let lon = inputLon;
    let resolvedCity = city;
    let country = 'US';

    // 1. Geocode if lat/lon is missing
    if (!lat || !lon) {
      const q = encodeURIComponent(city || 'New York');
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error('Geocoding failed');
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const result = geoData.results[0];
      lat = result.latitude;
      lon = result.longitude;
      resolvedCity = result.name;
      country = result.country_code;
    } else if (!resolvedCity) {
      resolvedCity = "Current Location";
    }

    // 2. Fetch Weather Data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;
    
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error('Weather fetch failed');
    const wData = await weatherRes.json();

    // 3. Fetch Air Quality Data
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,nitrogen_dioxide,ozone,us_aqi`;
    let aqiData = null;
    try {
      const aqiRes = await fetch(aqiUrl);
      if (aqiRes.ok) aqiData = await aqiRes.json();
    } catch (e) {
      console.warn("AQI fetch failed, using fallback AQI");
    }

    // Process Current Weather
    const current = wData.current;
    const daily = wData.daily;
    const condition = mapWmoToCondition(current.weather_code, current.is_day);

    const aqiVal = aqiData?.current?.us_aqi || 45;
    const aqiLabel = aqiVal < 50 ? 'Good' : aqiVal < 100 ? 'Moderate' : 'Unhealthy';

    const weather = {
      city: resolvedCity,
      country: country,
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      windDir: mapWindDir(current.wind_direction_10m),
      uvIndex: daily.uv_index_max ? Math.round(daily.uv_index_max[0]) : 5,
      visibility: Math.round((wData.hourly.visibility[0] || 10000) / 1000),
      pressure: Math.round(current.pressure_msl),
      dewPoint: Math.round(current.temperature_2m - ((100 - current.relative_humidity_2m)/5)),
      icon: mapWmoToIcon(current.weather_code, current.is_day),
      description: mapWmoToDescription(current.weather_code),
      condition,
      sunrise: formatTime(daily.sunrise[0]),
      sunset: formatTime(daily.sunset[0]),
      moonPhase: 'Waning Gibbous', // Default mock
      aqi: aqiVal,
      aqiLabel,
      pm25: aqiData?.current?.pm2_5 ? Math.round(aqiData.current.pm2_5) : 12,
      pm10: aqiData?.current?.pm10 ? Math.round(aqiData.current.pm10) : 20,
      o3: aqiData?.current?.ozone ? Math.round(aqiData.current.ozone) : 30,
      no2: aqiData?.current?.nitrogen_dioxide ? Math.round(aqiData.current.nitrogen_dioxide) : 15,
      updatedAt: new Date(),
      tempTrend: wData.hourly.time.slice(0, 24).map((timeStr, i) => ({
        hour: new Date(timeStr).toLocaleTimeString([], { hour: 'numeric' }),
        temp: Math.round(wData.hourly.temperature_2m[i]),
      }))
    };

    // Process Hourly Forecast (Next 24 hours in 3-hour steps)
    const hourly = [];
    for (let i = 0; i < 24; i += 3) {
      // Very basic day/night check for hourly icons
      const hourNum = new Date(wData.hourly.time[i]).getHours();
      const isDay = hourNum >= 6 && hourNum <= 18;
      
      hourly.push({
        label: i === 0 ? 'Now' : new Date(wData.hourly.time[i]).toLocaleTimeString([], { hour: 'numeric', hour12: true }).replace(':00', ''),
        temp: Math.round(wData.hourly.temperature_2m[i]),
        icon: mapWmoToIcon(wData.hourly.weather_code[i], isDay),
        precipitation: wData.hourly.precipitation_probability[i] || 0
      });
    }

    // Process Daily Forecast
    const forecast = daily.time.slice(0, 7).map((timeStr, i) => {
      const date = new Date(timeStr);
      return {
        day: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
        icon: mapWmoToIcon(daily.weather_code[i], true),
        high: Math.round(daily.temperature_2m_max[i]),
        low: Math.round(daily.temperature_2m_min[i]),
        precipitation: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0,
        description: mapWmoToDescription(daily.weather_code[i])
      };
    });

    return { weather, hourly, forecast, condition };
  } catch (error) {
    console.warn("Error fetching real API data, falling back to mock:", error);
    return generateMockWeather(city || 'New York');
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockWeather(city = 'New York', condition = 'sunny') {
  const conditionData = {
    sunny: { icon: '☀️', description: 'Clear Skies', tempRange: [24, 38], humidity: [30, 55] },
    cloudy: { icon: '⛅', description: 'Partly Cloudy', tempRange: [18, 28], humidity: [50, 70] },
    rainy: { icon: '🌧️', description: 'Heavy Rain', tempRange: [12, 22], humidity: [75, 95] },
    night: { icon: '🌙', description: 'Clear Night', tempRange: [10, 20], humidity: [45, 65] },
    storm: { icon: '⛈️', description: 'Thunderstorm', tempRange: [8, 18], humidity: [80, 100] },
    snow: { icon: '❄️', description: 'Snowfall', tempRange: [-5, 5], humidity: [60, 85] },
  };

  const cd = conditionData[condition] || conditionData.sunny;
  const temp = randomBetween(cd.tempRange[0], cd.tempRange[1]);

  const weather = {
    city,
    country: 'US',
    temp,
    feelsLike: temp - randomBetween(1, 4),
    humidity: randomBetween(cd.humidity[0], cd.humidity[1]),
    windSpeed: randomBetween(5, 45),
    windDir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][randomBetween(0, 7)],
    uvIndex: randomBetween(1, 11),
    visibility: randomBetween(5, 20),
    pressure: randomBetween(990, 1030),
    dewPoint: randomBetween(8, 22),
    icon: cd.icon,
    description: cd.description,
    condition,
    sunrise: '06:14 AM',
    sunset: '07:48 PM',
    moonPhase: 'Waning Gibbous',
    aqi: randomBetween(20, 180),
    aqiLabel: ['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy'][randomBetween(0, 4)],
    pm25: randomBetween(5, 60),
    pm10: randomBetween(10, 80),
    o3: randomBetween(20, 100),
    no2: randomBetween(10, 80),
    updatedAt: new Date(),
    tempTrend: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      temp: temp + Math.sin((i / 24) * Math.PI * 2) * 6 + randomBetween(-2, 2),
    }))
  };

  const hourlyLabels = ['Now', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'];
  const hourly = hourlyLabels.map((label, i) => ({
    label,
    temp: temp + randomBetween(-4, 4),
    icon: i < 6 ? '🌙' : cd.icon,
    precipitation: randomBetween(0, 80),
  }));

  const days = ['Today', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];
  const forecast = days.map((day, i) => ({
    day,
    icon: cd.icon,
    high: temp + randomBetween(-2, 6) - i,
    low: temp - randomBetween(4, 10),
    precipitation: randomBetween(0, 70),
    description: cd.description,
  }));

  return { weather, hourly, forecast, condition };
}

export const CITIES = [
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.006, condition: 'sunny' },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278, condition: 'rainy' },
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503, condition: 'cloudy' },
  { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708, condition: 'sunny' },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522, condition: 'cloudy' },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093, condition: 'sunny' },
  { name: 'Mumbai', country: 'IN', lat: 19.076, lon: 72.8777, condition: 'rainy' },
  { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832, condition: 'snow' },
  { name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.405, condition: 'cloudy' },
  { name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357, condition: 'sunny' },
  { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6176, condition: 'snow' },
  { name: 'Karachi', country: 'PK', lat: 24.8607, lon: 67.0011, condition: 'sunny' },
];

export async function searchCity(query) {
  try {
    const q = encodeURIComponent(query);
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=5&language=en&format=json`);
    const geoData = await geoRes.json();
    if (geoData.results) {
      return geoData.results.map(r => ({
        name: r.name,
        country: r.country_code,
        lat: r.latitude,
        lon: r.longitude
      }));
    }
    return [];
  } catch (err) {
    // Fallback to local static cities if API fails
    const q = query.toLowerCase();
    return CITIES.filter(c => c.name.toLowerCase().includes(q));
  }
}
