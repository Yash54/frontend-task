import { Box, Tooltip } from "@mui/material";
import { rowData } from "../screen/Home";
import { West as WestIcon } from "@mui/icons-material";

interface CustomProps {
  index: number;
  rows: rowData[];
  setRows: Function;
}

const Outdent = (props: CustomProps) => {
  const recurseAndOutdentChildren = (parentId: any, tempRows: rowData[]) => {
    const parentIndex = tempRows.findIndex(
      (item: rowData) => item.id === parentId
    );
    tempRows[parentIndex]?.children.forEach((item: any) => {
      let child = tempRows.find((row: rowData) => row.id === item);
      if (child) {
        child.indentation--;
      }
      recurseAndOutdentChildren(item, tempRows);
    });
  };

  const handleOutdentRow = (index: number) => {
    let tempRows = JSON.parse(JSON.stringify(props.rows));
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

    props.setRows(tempRows);
  };

  return (
    <Box onClick={() => handleOutdentRow(props.index)}>
      <Tooltip title="Outdent">
        <WestIcon />
      </Tooltip>
    </Box>
  );
};

export default Outdent;
