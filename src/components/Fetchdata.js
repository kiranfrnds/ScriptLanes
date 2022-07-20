import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Fetchdata = () => {
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [notFormattedDate, setNotFormattedDate] = useState("");

  const handleDate = (e) => {
    const slectedDate = new Date(e.target.value);
    setNotFormattedDate(e.target.value);
    const dateFormated = `${slectedDate.getDate()}-${
      "0" + (slectedDate.getMonth() + 1)
    }-${slectedDate.getFullYear()}`;
    setDate(dateFormated);
  };

  function isFutureDate(notFormattedDate) {
    const date = new Date(notFormattedDate);
    const today = new Date();
    console.log(
      "date === today",
      date > today ||
        (date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear())
    );
    return (
      date > today ||
      (date.getDate() === today.getDate() &&
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear())
    );
  }

  const fetchData = async () => {
    const response = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=${date}`
      // "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=20-07-2022"
    );
    const data = await response.json();
    console.log(data);
    setTableData(data.centers.slice(0, 50));
    setShowTable(true);
  };

  const handleFetchData = async () => {
    isFutureDate(notFormattedDate)
      ? fetchData()
      : alert("Please select future date");
    console.log("date", notFormattedDate);
  };

  return (
    <Container>
      <Box sx={{ marginTop: "10px" }}>
        <TextField
          type="date"
          sx={{ marginRight: "10px" }}
          onChange={handleDate}
        />
        <Button variant="contained" onClick={handleFetchData}>
          Get Data
        </Button>
        {showTable &&
          (tableData.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{ border: "1px solid black", marginTop: "10px" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        backgroundColor: "#afd1ed",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        backgroundColor: "#afd1ed",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        backgroundColor: "#afd1ed",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Vaccine
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        backgroundColor: "#afd1ed",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Available Capacity
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        backgroundColor: "#afd1ed",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Slots
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "1px solid black", textAlign: "center" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "1px solid black", textAlign: "center" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid black", textAlign: "center" }}
                      >
                        {row.sessions[0].vaccine}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid black", textAlign: "center" }}
                      >
                        {row.sessions[0].available_capacity}
                      </TableCell>
                      <TableRow
                        align="center"
                        sx={{
                          border: "1px solid black",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.sessions[0].slots.map((slot) => (
                          <TableCell align="right">{slot.time}</TableCell>
                        ))}
                      </TableRow>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>"No records Found"</h1>
          ))}
      </Box>
    </Container>
  );
};

export default Fetchdata;
