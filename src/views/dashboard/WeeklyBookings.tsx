// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import MenuUp from "mdi-material-ui/MenuUp";
import MenuDown from "mdi-material-ui/MenuDown";

// ** Props
interface WeeklyBookingsProps {
  thisWeekBookings: number;
  lastWeekBookings: number;
}

const WeeklyBookings = ({ thisWeekBookings, lastWeekBookings }: WeeklyBookingsProps) => {
  const percentChange =
    lastWeekBookings === 0
      ? 100
      : ((thisWeekBookings - lastWeekBookings) / lastWeekBookings) * 100;

  const isPositive = percentChange >= 0;
  const Icon = isPositive ? MenuUp : MenuDown;
  const color = isPositive ? "success.main" : "error.main";

  return (
    <Card>
      <CardHeader
        title="Total Bookings This Week"
        titleTypographyProps={{
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, fontSize: "1.725rem !important" }}
          >
            {thisWeekBookings} lessons
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", color, ml: 2 }}>
            <Icon sx={{ fontSize: "1.875rem", verticalAlign: "middle" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color, ml: 0.5 }}
            >
              {percentChange.toFixed(2)}%
            </Typography>
          </Box>
        </Box>

        <Typography component="p" variant="caption" sx={{ mb: 10 }}>
          Compared to {lastWeekBookings} lessons booked last week
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeeklyBookings;
