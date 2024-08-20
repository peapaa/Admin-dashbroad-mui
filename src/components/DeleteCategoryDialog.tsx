import * as React from "react";

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

//type
import { DeleteCategoryHandleProps } from "@/pages/Dashbroad/Categories/type";
import { DialogContent } from "@mui/material";

interface DeleteCategoryProps {
  handleClickDeleteCategory: () => void;
  content: string;
}

const DeleteCategoryDialog = React.forwardRef<
  DeleteCategoryHandleProps,
  DeleteCategoryProps
>(({ handleClickDeleteCategory, content }, ref) => {
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
        <DialogTitle id="alert-dialog-title">{"Delete category"}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="hover:!bg-blue-300 hover:text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClickDeleteCategory();
              handleClose();
            }}
            autoFocus
            className="hover:!bg-red-400 hover:text-black"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default DeleteCategoryDialog;
