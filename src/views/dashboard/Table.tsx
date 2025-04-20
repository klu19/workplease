// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

interface RowType {
  age: number;
  name: string;
  date: string;
  email: string;
  instrument: string;
  status: string;
  designation: string;
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const rows: RowType[] = [
  {
    age: 12,
    status: "scheduled",
    date: "09/27/2018",
    name: "Sally Quinn",
    instrument: "Piano",
    email: "eebsworth2m@sbwire.com",
    designation: "Student",
  },
  {
    age: 13,
    date: "09/23/2016",
    instrument: "Trombone",
    status: "completed",
    name: "Margaret Bowers",
    email: "kocrevy0@thetimes.co.uk",
    designation: "Student",
  },
  {
    age: 11,
    date: "10/15/2017",
    name: "Minnie Roy",
    status: "cancelled",
    instrument: "Piano",
    email: "ediehn6@163.com",
    designation: "Student",
  },
  {
    age: 8,
    date: "06/12/2018",
    status: "new",
    instrument: "Marimba",
    name: "Ralph Leonard",
    email: "dfalloona@ifeng.com",
    designation: "Student",
  },
  {
    age: 16,
    status: "scheduled",
    date: "03/24/2018",
    instrument: "French Horn",
    name: "Annie Martin",
    designation: "Student",
    email: "amartin@gmail.com",
  },
  {
    age: 15,
    date: "08/25/2017",
    instrument: "Piano",
    name: "Adeline Day",
    status: "completed",
    email: "hnisius4@gnu.org",
    designation: "Student",
  },
  {
    age: 16,
    status: "scheduled",
    date: "06/01/2017",
    instrument: "Trumpet",
    name: "Lora Jackson",
    designation: "Student",
    email: "ghoneywood5@narod.ru",
  },
  {
    age: 4,
    date: "12/03/2017",
    instrument: "Violin",
    name: "Rodney Sharp",
    status: "completed",
    designation: "Student",
    email: "dcrossman3@google.co.jp",
  },
];

const statusObj: StatusObj = {
  applied: { color: "info" },
  cancelled: { color: "error" },
  scheduled: { color: "primary" },
  new: { color: "warning" },
  completed: { color: "success" },
};

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Instrument</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow
                hover
                key={row.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row.name}
                    </Typography>
                    <Typography variant="caption">{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.instrument}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                      "& .MuiChip-label": { fontWeight: 500 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
