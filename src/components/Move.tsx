import { Box, Tooltip } from "@mui/material";
import { rowData } from "../screen/Home";
import { OpenWith as OpenWithIcon } from "@mui/icons-material";

interface CustomProps {
  index: number;
  rows: rowData[];
  setRows: Function;
}

const Move = (props: CustomProps) => {
  const handleMoveRow = (currentIndex: number, newIndex: number) => {
    const updatedRows = [...props.rows];
    const [removed] = updatedRows.splice(currentIndex, 1);
    updatedRows.splice(newIndex, 0, removed);
    props.setRows(updatedRows);
  };

  return (
    <Box onClick={() => handleMoveRow(props.index, props.index - 1)}>
      <Tooltip title="Move">
        <OpenWithIcon />
      </Tooltip>
    </Box>
  );
};

export default Move;
