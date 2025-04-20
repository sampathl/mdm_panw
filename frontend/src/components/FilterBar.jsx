import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  
  /**
   * Reusable FilterBar
   * Accepts: list of years and countries to populate options
   * Returns: selected year and country through parent props
   */
  export default function FilterBar({
    yearOptions = [],
    countryOptions = [],
    selectedYear,
    setSelectedYear,
    selectedCountry,
    setSelectedCountry,
  }) {
    return (
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountry}
            label="Country"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {countryOptions.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }