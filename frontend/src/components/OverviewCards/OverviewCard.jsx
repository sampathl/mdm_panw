import { Card, CardContent, Typography } from "@mui/material";

export default function OverviewCard({ title, value }) {
  return (
    <Card elevation={2} sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}