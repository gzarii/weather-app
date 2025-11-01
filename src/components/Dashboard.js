import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Favorite, FavoriteBorder, ArrowForward } from "@mui/icons-material";
import { toggleFavorite, fetchWeatherData } from "../features/weatherSlice";
import { TemperatureChart, WindChart } from "./WeatherChart";

const WeatherCard = ({ city, weather, isFavorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unit } = useSelector((state) => state.weather);

  const formatTemperature = (temp) => {
    if (unit === "fahrenheit") {
      return ((temp * 9) / 5 + 32).toFixed(1) + "°F";
    }
    return temp.toFixed(1) + "°C";
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {city}
            <IconButton
              onClick={() => dispatch(toggleFavorite(city))}
              color="primary"
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate(`/details/${city}`)}
          >
            Details
          </Button>
        </Box>
        <Typography variant="h4">
          {formatTemperature(weather.main.temp)}
        </Typography>
        <Typography variant="subtitle1">
          {weather.weather[0].description}
        </Typography>
        <Typography color="text.secondary">
          Humidity: {weather.main.humidity}%
        </Typography>
        <Typography color="text.secondary">
          Wind: {weather.wind.speed} m/s
        </Typography>
        <Typography color="text.secondary">
          Pressure: {weather.main.pressure} hPa
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentWeather, favorites, forecast, loading, unit, weatherData } =
    useSelector((state) => state.weather);

  // Fetch weather data for favorite cities on component mount
  useEffect(() => {
    favorites.forEach((city) => {
      dispatch(fetchWeatherData(city));
    });
  }, [dispatch, favorites]);

  // Format data for charts
  const formatChartData = () => {
    if (!forecast.list) return [];
    return forecast.list.slice(0, 8).map((item) => ({
      time: item.dt * 1000, // Pass timestamp in milliseconds
      temp: item.main.temp,
      speed: item.wind.speed,
    }));
  };

  if (loading && !currentWeather.name && favorites.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Current Weather
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {currentWeather.name && (
          <Grid item xs={12} sm={6} md={4}>
            <WeatherCard
              city={currentWeather.name}
              weather={currentWeather}
              isFavorite={favorites.includes(currentWeather.name)}
            />
          </Grid>
        )}
      </Grid>

      {favorites.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Favorite Locations
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {favorites.map(
              (city) =>
                weatherData[city] && (
                  <Grid item xs={12} sm={6} md={4} key={city}>
                    <WeatherCard
                      city={city}
                      weather={weatherData[city]}
                      isFavorite={true}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}

      {forecast.list && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Weather Trends
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TemperatureChart data={formatChartData()} unit={unit} />
            </Grid>
            <Grid item xs={12}>
              <WindChart data={formatChartData()} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
