import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Autocomplete, Box } from "@mui/material";
import { fetchWeatherData } from "../features/weatherSlice";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (city) => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500, margin: "20px auto" }}>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={searchInput}
        onInputChange={(event, newValue) => setSearchInput(newValue)}
        onChange={(event, value) => handleSearch(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
