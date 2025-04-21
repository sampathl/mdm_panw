import { Card, CardContent, Typography } from "@mui/material";


export default function OverviewCard({ title, value }) {
  return (
    <Card sx={{ minHeight: 120 }} variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}