import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useState } from 'react';

export default function GenericTable({ rows = [] }) {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  if (!rows.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1">No data available.</Typography>
      </Box>
    );
  }

  const columns = Object.keys(rows[0]);
  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrderBy(column);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!orderBy) return 0;
    const aVal = a[orderBy];
    const bVal = b[orderBy];

    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return order === 'asc'
      ? aVal.toString().localeCompare(bVal.toString())
      : bVal.toString().localeCompare(aVal.toString());
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === col}
                  direction={orderBy === col ? order : 'asc'}
                  onClick={() => handleSort(col)}
                >
                  {col.replaceAll('_', ' ').toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedRows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col}>
                  {row[col] !== null && row[col] !== undefined
                    ? row[col].toString()
                    : '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
