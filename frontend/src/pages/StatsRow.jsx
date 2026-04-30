import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function StatsRow() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                $203k
              </Typography>
              <Typography variant="caption" color="success.main">
                +12% this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                1,245
              </Typography>
              <Typography variant="caption" color="success.main">
                +8% this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                New Users
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                356
              </Typography>
              <Typography variant="caption" color="error.main">
                -3% today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}