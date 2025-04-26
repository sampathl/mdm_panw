import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
  } from "@mui/material";
  
  /**
   * Simple MUI Table to display debt data.
   */
  export default function DebtTable({ rows }) {
    return (
      <>
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Debt Records
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell>Debt Type</TableCell>
                <TableCell align="right">USD (Millions)</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.country_name}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell>{row.debt_type}</TableCell>
                  <TableCell align="right">
                    {row.value.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }