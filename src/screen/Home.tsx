import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import homeStyle from "./Home.styles";
import Indent from "../components/Indent";
import Delete from "../components/Delete";
import Outdent from "../components/Outdent";
import Move from "../components/Move";
import AddRow from "../components/AddRow";

export interface rowData {
  id: number;
  text: string;
  indentation: number;
  children: any[];
}

const Home = () => {
  const classes = homeStyle;
  const [rows, setRows] = useState<rowData[]>([
    {
      id: 1,
      text: "Number",
      indentation: 0,
      children: [],
    },
  ]);

  const tableHeader = [
    { name: "Action", desc: "Move, Indent, Outdent, Delete" },
    { name: "Standard", desc: "The text of the standard" },
  ];

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const rowIndex = rows.findIndex((row: any) => row.id === id);
    if (rowIndex !== -1) {
      let tempRows = JSON.parse(JSON.stringify(rows));
      tempRows[rowIndex].text = event.target.value;
      setRows(tempRows);
    }
  };

  const getTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {tableHeader.map((header: any, index: number) => {
            return (
              <TableCell key={index}>
                <Typography sx={classes.tableHeaderText}>
                  {header.name}
                </Typography>
                <Typography sx={classes.tableSubHeaderText}>
                  {header.desc}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const getTableBody = () => {
    return (
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell sx={{ width: "25%" }}>
              <Grid container spacing={0}>
                <Grid item xl={3} lg={3} md={3}>
                  <Move index={index} rows={rows} setRows={setRows} />
                </Grid>
                <Grid item xl={3} lg={3} md={3}>
                  <Outdent index={index} rows={rows} setRows={setRows} />
                </Grid>
                <Grid item xl={3} lg={3} md={3}>
                  <Indent index={index} rows={rows} setRows={setRows} />
                </Grid>
                <Grid item xl={3} lg={3} md={3}>
                  <Delete
                    index={index}
                    rowID={row.id}
                    rows={rows}
                    setRows={setRows}
                  />
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              <Box pl={row.indentation * 5}>
                <TextField
                  placeholder="Enter your text"
                  value={row.text}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleTextChange(event, row.id)
                  }
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{ width: "100%" }}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const getTable = () => {
    return (
      <TableContainer>
        <Table>
          {getTableHeader()}
          {getTableBody()}
        </Table>
      </TableContainer>
    );
  };

  const getHome = () => {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          py: 2,
        }}
      >
        <Stack sx={{ width: "100%", height: "100%", justifyContent: "center" }}>
          {getTable()}
          <AddRow rows={rows} setRows={setRows} />
        </Stack>
      </Container>
    );
  };

  return getHome();
};

export default Home;
