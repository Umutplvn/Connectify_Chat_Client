import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};



export default function BasicModal({ setOpen, open }) {
  const handleClose = () => setOpen(false);
    const {deleteUser}=useDataCall()
    const { userId } = useSelector((state) => state?.auth);
    const navigate=useNavigate()

    const deleteUserFunc= ()=>{
        deleteUser(userId)
        handleClose()
        navigate("/register")
        toast("We will miss you!")
    }
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{
              fontFamily: "sans-serif",
              fontSize: "1rem",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Do you really want to delete your account?
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              mt: "1rem",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#74a4c7",
                color: "white",
                fontWeight: "700",
                borderRadius: "1rem",
                width: "5rem",
                transition: "0.4s",
                "&:hover": {
                  backgroundColor: "#537c87",
                  color: "white",
                },
              }}
                onClick={()=>deleteUserFunc()}
            >
              YES
            </Button>
            <Button
              sx={{
                backgroundColor: "#d47e7e",
                color: "white",
                fontWeight: "700",
                borderRadius: "1rem",
                width: "5rem",
                transition: "0.4s",
                "&:hover": {
                  backgroundColor: "#b53434",
                  color: "white",
                },
              }}
              onClick={handleClose}
            >
              NO
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
