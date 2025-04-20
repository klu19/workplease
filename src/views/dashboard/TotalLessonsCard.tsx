// ** MUI Imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";

// Styled component for the triangle shaped background image
const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

// Styled component for the trophy image
const TotalLessonsCardImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

interface TotalLessonsCardProps {
  totalNumLessons: number;
}

const TotalLessonsCard = ({ totalNumLessons }: TotalLessonsCardProps) => {
  // ** Hook
  const theme = useTheme();

  const imageSrc =
    theme.palette.mode === "light" ? "triangle-light.png" : "triangle-dark.png";

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6">Total Number of Lessons Booked</Typography>
        <Typography variant="h5" sx={{ my: 4, color: "primary.main" }}>
          {totalNumLessons}
        </Typography>
        {/* <Button size='small' variant='contained'>
          View Recent Lessons
        </Button> */}
        <br />
        <TriangleImg
          alt="triangle background"
          src={`/images/misc/${imageSrc}`}
        />
        <TotalLessonsCardImg alt="trophy" src="/images/misc/trophy.png" />
      </CardContent>
    </Card>
  );
};

export default TotalLessonsCard;
