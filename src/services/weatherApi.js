import axios from "axios";

const API_KEY = "41b45b66d2cc8a281acf136c06d4639d"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Cache configuration
const cache = new Map();
const CACHE_DURATION = 60 * 1000; // 60 seconds cache duration

const getCachedData = (key) => {
  const data = cache.get(key);
  if (data && Date.now() - data.timestamp < CACHE_DURATION) {
    return data.value;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, value) => {
  cache.set(key, { value, timestamp: Date.now() });
};

export const weatherApi = {
  getCurrentWeather: async (city) => {
    const cacheKey = `current_${city}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getForecast: async (city) => {
    const cacheKey = `forecast_${city}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHourlyForecast: async (lat, lon) => {
    const cacheKey = `hourly_${lat}_${lon}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(
        `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${API_KEY}&units=metric`
      );
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchCities: async (query) => {
    const cacheKey = `search_${query}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(
        `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHistoricalData: async (lat, lon, dt) => {
    const cacheKey = `historical_${lat}_${lon}_${dt}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(
        `${BASE_URL}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}&units=metric`
      );
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
