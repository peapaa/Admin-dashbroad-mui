import * as React from "react";

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

//type
import {
  DeleteCategory,
  DeleteCategoryHandleProps,
} from "@/pages/Dashbroad/Categories/type";

interface DeleteCategoryProps {
  setselectedDeleteId: React.Dispatch<React.SetStateAction<DeleteCategory>>;
}

const DeleteCategoryDialog = React.forwardRef<
  DeleteCategoryHandleProps,
  DeleteCategoryProps
>(({ setselectedDeleteId }, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
  }));

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
});

export default DeleteCategoryDialog;
