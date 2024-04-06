import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { btnGreen, btnRed } from "../styles/globalStyle";
import useAuthCall from "../hooks/useAuthCall";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "12rem",
  bgcolor: "#DBE9FE",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  name,
  handleClose,
  contactId,
  check,
}) {
  const { addContact, removeContact } = useAuthCall();

  const handleAddFriend = () => {
      addContact(contactId, name);
      handleClose();    
    
  };

  const handleRemoveFriend =()=>{
    removeContact(contactId, name)
    handleClose()
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {check ? (
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Do you really want to remove{" "}
              {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} from
              your contacts?
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: "auto",
                p: "1rem 0.5rem",
                gap: "1rem",
              }}
            >
              <Button
                sx={btnGreen}
                onClick={handleRemoveFriend}
                variant="contained"
              >
                YES
              </Button>
              <Button sx={btnRed} onClick={handleClose} variant="contained">
                NO
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Do you really want to add{" "}
              {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} to
              your contacts?
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: "auto",
                p: "1rem 0.5rem",
                gap: "1rem",
              }}
            >
              <Button
                sx={btnGreen}
                onClick={() => handleAddFriend()}
                variant="contained"
              >
                YES
              </Button>
              <Button sx={btnRed} onClick={handleClose} variant="contained">
                NO
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
}
