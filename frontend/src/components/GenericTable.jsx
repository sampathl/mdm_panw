// src/components/GenericTable.jsx
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
  } from "@mui/material";
  

  export default function GenericTable({ rows = [] }) {
    if (!rows.length) {
      return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1">No data available.</Typography>
        </Box>
      );
    }

    const columns = Object.keys(rows[0]);
  
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col} sx={{ fontWeight: "bold" }}>
                  {col.replaceAll("_", " ").toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {row[col] !== null && row[col] !== undefined ? row[col].toString() : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }