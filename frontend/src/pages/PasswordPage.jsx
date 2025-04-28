import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function PasswordPage({ onPasswordSubmit }) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onPasswordSubmit(password);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Enter Access Password
      </Typography>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
