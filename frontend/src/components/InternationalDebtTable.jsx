import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { fetchInternationalDebtData } from '../api/api';

export default function InternationalDebtTable() {
  const [data, setData] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [loading, setLoading] = useState(false);

  const loadDebtData = async (filters = {}) => {
    setLoading(true);
    try {
      const json = await fetchInternationalDebtData(filters);
      setData(json);

      if (!filters.year && !filters.country) {
        const years = Array.from(new Set(json.map((row) => row.year))).sort(
          (a, b) => b - a
        );
        const countries = Array.from(
          new Set(json.map((row) => row.country_name))
        ).sort();
        setYearOptions(years);
        setCountryOptions(countries);
      }
    } catch (error) {
      console.error('Failed to load debt data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDebtData();
  }, []);

  useEffect(() => {
    if (selectedYear !== 'All' || selectedCountry !== 'All') {
      loadDebtData({
        year: selectedYear !== 'All' ? selectedYear : undefined,
        country: selectedCountry !== 'All' ? selectedCountry : undefined,
      });
    }
    if (selectedYear === 'All' && selectedCountry === 'All') {
      loadDebtData();
    }
  }, [selectedYear, selectedCountry]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={selectedYear}
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
            label="Country"
            value={selectedCountry}
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

      {loading ? (
        <CircularProgress />
      ) : data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Country Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Indicator Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Indicator Code
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Value (USD)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.country_name}</TableCell>
                  <TableCell>{row.country_code}</TableCell>
                  <TableCell>{row.indicator_name}</TableCell>
                  <TableCell>{row.indicator_code}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    {row.value !== null
                      ? row.value.toLocaleString('en-US')
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          No data available for selected filters.
        </Typography>
      )}
    </Box>
  );
}
