import { Container, Box, Typography, Button } from '@mui/material';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Demo Login Page
        </Typography>

        <Button variant="contained">Log in (coming soon)</Button>
      </Box>
    </Container>
  );
}
