// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import DotsVertical from "mdi-material-ui/DotsVertical";

export interface Category {
  instrument: string;
  count: number;
}

interface TopCategoriesProps {
  topCategories: Category[];
}

const TopCategories = ({ topCategories }: TopCategoriesProps) => {
  return (
    <Card>
      <CardHeader
        title="Top Instrument Categories"
        titleTypographyProps={{
          sx: {
            lineHeight: "1.2 !important",
            letterSpacing: "0.31px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}>
        {topCategories.slice(0, 5).map((item: Category, index: number) => {
          return (
            <Box
              key={item.instrument}
              sx={{
                display: "flex",
                alignItems: "center",
                ...(index !== topCategories.length - 1 ? { mb: 5.875 } : {}),
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: "1rem",
                  color: "common.white",
                }}
              />

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ mr: 0.5, fontWeight: 600, letterSpacing: "0.25px" }}
                    >
                      {item.instrument}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    textAlign: "end",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      lineHeight: 1.72,
                      letterSpacing: "0.22px",
                    }}
                  >
                    {item.count}
                  </Typography>
                  <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                    Lessons
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopCategories;
