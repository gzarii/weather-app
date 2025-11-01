import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleUnit } from "./features/weatherSlice";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import DetailedView from "./components/DetailedView";

function App() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.unit);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather Analytics Dashboard
          </Typography>
          <Typography>°C</Typography>
          <Switch
            checked={unit === "fahrenheit"}
            onChange={() => dispatch(toggleUnit())}
            color="default"
          />
          <Typography>°F</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <Dashboard />
              </>
            }
          />
          <Route path="/details/:cityName" element={<DetailedView />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
