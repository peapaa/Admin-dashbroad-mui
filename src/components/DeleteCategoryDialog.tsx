import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
interface DeleteCategoryProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteCategoryDialog: React.FC<DeleteCategoryProps> = ({
  open,
  setOpen,
  setDeleteLoading,
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
              setDeleteLoading(true);
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
