import { SelectCheckAllTableProps } from "@/components/type";
import { ExpandMore } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";

const SelectCheckAllTable: React.FC<SelectCheckAllTableProps> = ({
  numSelected,
  rowCount,
  onSelectAllClick,
  selected,
  handleOpenModal,
}) => {
  return (
    <div className="flex items-center  justify-between bg-white rounded-t-md">
      <span>
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
        <ExpandMore className="cursor-pointer" />
        {selected.length > 0 ? <span>{selected.length} selected</span> : null}
      </span>
      {numSelected > 0 && (
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{
            paddingX: "22px",
          }}
        >
          Delete record
        </Button>
      )}
    </div>
  );
};

export default SelectCheckAllTable;
