import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleUnit } from "./features/weatherSlice";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import DetailedView from "./components/DetailedView";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AppContent = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.unit);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather Analytics Dashboard
          </Typography>
          {user && (
            <>
              <Typography>°C</Typography>
              <Switch
                checked={unit === "fahrenheit"}
                onChange={() => dispatch(toggleUnit())}
                color="default"
              />
              <Typography>°F</Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <SearchBar />
                  <Dashboard />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:cityName"
            element={
              <PrivateRoute>
                <DetailedView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
