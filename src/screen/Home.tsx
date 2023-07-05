import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  Tooltip,
  Typography,
} from "@mui/material";
import homeStyle from "./Home.styles";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  OpenWith as OpenWithIcon,
  West as WestIcon,
  East as EastIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface rowData {
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
  console.log(rows);

  const tableHeader = [
    { name: "Action", desc: "Move, Indent, Outdent, Delete" },
    { name: "Standard", desc: "The text of the standard" },
  ];

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const rowIndex = rows.findIndex((row: any) => row.id == id);
    if (rowIndex !== -1) {
      let tempRows = JSON.parse(JSON.stringify(rows));
      tempRows[rowIndex].text = event.target.value;
      setRows(tempRows);
    }
  };

  const handleAddRow = () => {
    let tempRows = JSON.parse(JSON.stringify(rows));
    const lastRow = rows[rows.length - 1];

    const newRow = {
      id: rows.length + 1,
      text: "",
      indentation: lastRow?.indentation || 0,
      children: [],
    };
    let parentOfLastRow = tempRows.find((item: rowData) =>
      item.children.includes(lastRow.id)
    );
    if (parentOfLastRow) {
      parentOfLastRow.children.push(newRow.id);
    }

    tempRows.push(newRow);
    setRows(tempRows);
  };

  const handleMoveRow = (currentIndex: number, newIndex: number) => {
    const updatedRows = [...rows];
    const [removed] = updatedRows.splice(currentIndex, 1);
    updatedRows.splice(newIndex, 0, removed);
    setRows(updatedRows);
  };

  const recurseAndOutdentChildren = (parentId: any, tempRows: rowData[]) => {
    const parentIndex = tempRows.findIndex(
      (item: rowData) => item.id == parentId
    );
    tempRows[parentIndex]?.children.forEach((item: any) => {
      let child = tempRows.find((row: rowData) => row.id == item);
      if (child) {
        child.indentation--;
      }
      recurseAndOutdentChildren(item, tempRows);
    });
  };

  const handleOutdentRow = (index: number) => {
    let tempRows = JSON.parse(JSON.stringify(rows));
    let outdentRow = tempRows[index];
    if (outdentRow.indentation <= 0) return;

    let parentRow = tempRows.find((item: rowData) =>
      item.children.includes(outdentRow.id)
    );
    if (parentRow) {
      parentRow.children = parentRow.children.filter(
        (item: rowData) => item !== outdentRow.id
      );
    }

    let parentOfParentRow = tempRows.find((item: rowData) =>
      item.children.includes(parentRow.id)
    );
    if (parentOfParentRow) {
      parentOfParentRow.children.push(outdentRow.id);
    }
    outdentRow.indentation--;
    recurseAndOutdentChildren(outdentRow.id, tempRows);

    setRows(tempRows);
  };

  const recurseAndIndentChildren = (parentId: any, tempRows: rowData[]) => {
    const parentIndex = tempRows.findIndex(
      (item: rowData) => item.id == parentId
    );
    tempRows[parentIndex]?.children.forEach((item: rowData) => {
      item.indentation++;
      recurseAndIndentChildren(item, tempRows);
    });
  };

  const handleIndentRow = (index: number) => {
    if (index <= 0) return;

    let tempRows = JSON.parse(JSON.stringify(rows));
    let aboveRow = tempRows[index - 1];
    let indentRow = tempRows[index];

    if (indentRow.indentation > aboveRow.indentation) return;

    let parentRow = tempRows.find((item: rowData) =>
      item.children.includes(indentRow.id)
    );
    if (parentRow) {
      parentRow.children = parentRow.children.filter(
        (item: any) => item !== indentRow.id
      );
    }

    if (!aboveRow.children.includes(indentRow.id)) {
      aboveRow.children.push(indentRow.id);
    }
    indentRow.indentation++;
    recurseAndIndentChildren(indentRow.id, tempRows);
    setRows(tempRows);
  };

  const recurseAndGetAllChildIds = (parentId: any, childIds: any[]) => {
    const parent = rows.find((item: rowData) => item.id == parentId);
    parent?.children.forEach((item: any) => {
      childIds.push(item);
      recurseAndGetAllChildIds(item, childIds);
    });
  };

  const handleDeleteRow = (id: number, index: any) => {
    let childIds: any[] = [];
    recurseAndGetAllChildIds(id, childIds);
    let tempRows = JSON.parse(JSON.stringify(rows));
    tempRows[index].children = [];
    childIds.forEach((childId: any) => {
      tempRows = tempRows.filter((item: rowData) => item.id !== childId);
    });
    tempRows = tempRows.filter((item: rowData) => item.id !== id);

    let parentRow = tempRows.find((item: rowData) =>
      item.children.includes(id)
    );
    if (parentRow) {
      parentRow.children = parentRow.children.filter(
        (item: any) => item !== id
      );
    }
    setRows(tempRows);
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
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  onClick={() => handleMoveRow(index, index - 1)}
                >
                  <Tooltip title="Move">
                    <OpenWithIcon />
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  onClick={() => handleOutdentRow(index)}
                >
                  <Tooltip title="Outdent">
                    <WestIcon />
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  onClick={() => handleIndentRow(index)}
                >
                  <Tooltip title="Indent">
                    <EastIcon />
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  onClick={() => handleDeleteRow(row.id, index)}
                >
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
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

  const getAddStandard = () => {
    return (
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="contained"
        sx={{ width: "100%", mt: 2 }}
        onClick={handleAddRow}
      >
        Add a standard
      </Button>
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
          {getAddStandard()}
        </Stack>
      </Container>
    );
  };

  return getHome();
};

export default Home;
