import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteCategory } from "../pages/Dashbroad/Categories/type";
interface DeleteCategoryProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setselectedDeleteId: React.Dispatch<React.SetStateAction<DeleteCategory>>;
}
const DeleteCategoryDialog: React.FC<DeleteCategoryProps> = ({
  open,
  setOpen,
  setselectedDeleteId,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" You want to delete category ?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setselectedDeleteId((prev) => ({ ...prev, loading: true }));
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteCategoryDialog;
