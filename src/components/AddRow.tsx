import { Button } from "@mui/material";
import { rowData } from "../screen/Home";
import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";

interface CustomProps {
  rows: rowData[];
  setRows: Function;
}

const AddRow = (props: CustomProps) => {
  const handleAddRow = () => {
    let tempRows = JSON.parse(JSON.stringify(props.rows));
    const lastRow = props.rows[props.rows.length - 1];

    const newRow = {
      id: props.rows.length + 1,
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
    props.setRows(tempRows);
  };
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

export default AddRow;
