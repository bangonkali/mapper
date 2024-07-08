import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface iModal {
  isOpen: boolean;
  onClose: () => void; // onClose is a function that takes no parameters and returns void
  children: React.ReactNode; // children can be any valid React node
}

const Modal: React.FC<iModal> = ({ isOpen, onClose, children }) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  // Update state when isOpen prop changes
  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  // Function to handle closing the modal
  const closeModal = () => {
    setIsOpenState(false);
    onClose && onClose();
  };

  // Render nothing if modal is not open
  if (!isOpenState) return null;

  return (
    <React.Fragment>
      <Dialog
        open={isOpenState}
        onClose={closeModal}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            closeModal();
          },
        }}
      >
        {children}
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
