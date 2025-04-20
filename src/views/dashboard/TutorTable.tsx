// components/TableSection.tsx
import { Box, Text, Table } from "@mantine/core";
 
// Sample Data Object
const tableData = [
    { tuteeName: "John Doe", tutorName: "Sarah Lee", date: "2025-04-06", instrument: "🎸" },
    { tuteeName: "Jane Smith", tutorName: "Jason Park", date: "2025-04-07", instrument: "🎹" },
    { tuteeName: "Emily Davis", tutorName: "Amina Johnson", date: "2025-04-08", instrument: "🎻" },
    { tuteeName: "Michael Clark", tutorName: "Carlos Rivera", date: "2025-04-09", instrument: "🎷" },
    { tuteeName: "Sophia Lee", tutorName: "Emily Zhou", date: "2025-04-10", instrument: "🎺" },
  ];


const TableSection = () => (
  <Box mt="xl" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
    <Text size="lg" ta="center" mb="sm" style={{ fontWeight: 600 }}>
      Lesson Data
    </Text>

    <Table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <thead>
        <tr>
          <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f4f4f4" }}>Tutee Name</th>
          <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f4f4f4" }}>Tutor Name</th>
          <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f4f4f4" }}>Date</th>
          <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f4f4f4" }}>Instrument</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff" }}>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{row.tuteeName}</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{row.tutorName}</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{row.date}</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{row.instrument}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Box>
);

export default TableSection;