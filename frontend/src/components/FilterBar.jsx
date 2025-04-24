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
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          label="Year"
          value={selectedYear || "All"} // ✅ fallback to All
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
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          label="Country"
          value={selectedCountry || "All"} // ✅ fallback to All
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