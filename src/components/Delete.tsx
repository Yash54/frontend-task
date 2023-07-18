import { Box, Tooltip } from "@mui/material";
import { rowData } from "../screen/Home";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface CustomProps {
  index: number;
  rowID: number;
  rows: rowData[];
  setRows: Function;
}

const Delete = (props: CustomProps) => {
  const recurseAndGetAllChildIds = (parentId: any, childIds: any[]) => {
    const parent = props.rows.find((item: rowData) => item.id === parentId);
    parent?.children.forEach((item: any) => {
      childIds.push(item);
      recurseAndGetAllChildIds(item, childIds);
    });
  };
  const handleDeleteRow = (id: number, index: any) => {
    let childIds: any[] = [];
    recurseAndGetAllChildIds(id, childIds);
    let tempRows = JSON.parse(JSON.stringify(props.rows));
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
    props.setRows(tempRows);
  };

  return (
    <Box onClick={() => handleDeleteRow(props.rowID, props.index)}>
      <Tooltip title="Delete">
        <DeleteIcon />
      </Tooltip>
    </Box>
  );
};

export default Delete;
