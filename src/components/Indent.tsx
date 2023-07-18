import { Box, Tooltip } from "@mui/material";
import { East as EastIcon } from "@mui/icons-material";
import { rowData } from "../screen/Home";

interface CustomProps {
  index: number;
  rows: rowData[];
  setRows: Function;
}

const Indent = (props: CustomProps) => {
  const recurseAndIndentChildren = (parentId: any, tempRows: rowData[]) => {
    const parentIndex = tempRows.findIndex(
      (item: rowData) => item.id === parentId
    );
    tempRows[parentIndex]?.children.forEach((item: rowData) => {
      item.indentation++;
      recurseAndIndentChildren(item, tempRows);
    });
  };
  const handleIndentRow = (index: number) => {
    if (index <= 0) return;

    let tempRows = JSON.parse(JSON.stringify(props.rows));
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
    props.setRows(tempRows);
  };

  return (
    <Box onClick={() => handleIndentRow(props.index)}>
      <Tooltip title="Indent">
        <EastIcon />
      </Tooltip>
    </Box>
  );
};

export default Indent;
