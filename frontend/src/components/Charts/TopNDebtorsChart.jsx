import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

export default function TopNDebtorsChart() {
  const debtData = useSelector((state) => state.debt.data);
  const [topN, setTopN] = useState(5); // Default Top 5

  if (!debtData.length) {
    return null;
  }

  const countryDebtMap = {};
  for (const row of debtData) {
    if (row.country_name && row.value !== null) {
      countryDebtMap[row.country_name] =
        (countryDebtMap[row.country_name] || 0) + row.value;
    }
  }

  const topDebtors = Object.entries(countryDebtMap)
    .map(([country, total]) => ({ country, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, topN);

  return (
    <Box sx={{ width: '100%', height: 450 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Top {topN} Debtor Countries</Typography>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="top-n-label">Top N</InputLabel>
          <Select
            labelId="top-n-label"
            value={topN}
            label="Top N"
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            {[5, 10, 20, 30].map((n) => (
              <MenuItem key={n} value={n}>
                Top {n}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height="120%">
        <BarChart
          layout="vertical"
          data={topDebtors}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
          <XAxis
            type="number"
            tickFormatter={(value) => `${(value / 1e9).toFixed(1)}B`}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={120}
            interval={0}
            tickFormatter={(value) =>
              value.length > 10 ? `${value.substring(0, 10)}...` : value
            }
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="total" fill="#1976d2">
            <LabelList
              dataKey="total"
              position="right"
              formatter={(value) => `${(value / 1e9).toFixed(1)}B`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
