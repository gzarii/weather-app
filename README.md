# Weather Dashboard Application

A modern, responsive weather dashboard built with React, Redux Toolkit, and Material-UI that provides current weather data, forecasts, and favorites management.

## Features

- **Authentication**
  - Google Sign-In integration
  - Protected routes and secure access
  - Persistent user sessions
  - User-specific favorites and settings

- **Current Weather Display**
  - Real-time weather information
  - Temperature display (Celsius/Fahrenheit)
  - Humidity, wind speed, and pressure data
  - Weather condition descriptions and icons

- **Weather Forecasts**
  - 24-hour forecast with hourly updates
  - 5-day forecast with daily predictions
  - Interactive charts showing temperature and humidity trends

- **Location Management**
  - Search for any city worldwide
  - Add/remove favorite locations
  - Quick access to favorite cities' weather data

- **Customization**
  - Toggle between Celsius and Fahrenheit
  - Persistent favorites storage
  - Responsive design for all devices

## Technology Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Charts**: Recharts
- **Authentication**: Firebase Authentication
- **API**: OpenWeatherMap
- **Storage**: Local Storage for persistence
- **Routing**: React Router
- **Backend Services**: Firebase

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gzarii/weather-app
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys and Firebase configuration:
   ```
   # OpenWeather API
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key

   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Authentication**
   - Sign in using your Google account
   - Access to all features requires authentication
   - Your preferences and favorites are tied to your account
   - Secure logout available in the navigation bar

2. **View Current Weather**
   - Enter a city name in the search bar
   - View detailed weather information including temperature, humidity, wind speed, and more

2. **Check Forecasts**
   - Click on "Details" to view detailed forecasts
   - Switch between 24-hour and 5-day forecast views
   - Analyze weather trends through interactive charts

3. **Manage Favorites**
   - Click the heart icon to add/remove cities from favorites
   - Access favorite cities quickly from the dashboard
   - View all favorite locations in a dedicated section

4. **Customize Settings**
   - Toggle temperature unit (°C/°F) using the unit switch
   - Settings persist across sessions

## Project Structure

```
weather-application/
├── src/
│   ├── components/          # React components
│   ├── features/           # Redux slices
│   ├── services/           # API services
│   ├── contexts/           # Context providers (Auth)
│   ├── config/            # Configuration files
│   ├── app/               # App configuration
│   └── ...
├── public/                # Static files
└── ...
```

## Key Components

- **Login**: Google authentication interface
- **PrivateRoute**: Protected route wrapper for authenticated access
- **Dashboard**: Main view showing current weather and favorites
- **DetailedView**: Detailed weather information and forecasts
- **WeatherChart**: Interactive weather trend visualizations
- **SearchBar**: City search functionality
- **AuthContext**: Authentication state management

## API Integration

The application integrates with multiple services:

**OpenWeatherMap API**:
- Current weather data
- 24-hour forecasts
- 5-day forecasts

**Firebase**:
- Authentication services
- Google Sign-In
- User session management
- Secure data access

## State Management

**Redux Toolkit**:
- Weather data management
- Favorites management
- Temperature unit preferences
- API call states

**Context API**:
- Authentication state
- User session management
- Protected route handling

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with [React](https://reactjs.org/) and [Material-UI](https://mui.com/)
- Charts powered by [Recharts](https://recharts.org/)

## Support

For support, please open an issue in the repository or contact the maintainers.