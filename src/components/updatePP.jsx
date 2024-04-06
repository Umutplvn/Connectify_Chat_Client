import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Input, InputLabel, Button, Box, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import useAuthCall from "../hooks/useAuthCall";
import nouser from "../assets/nouser.png";
import { btnGreen, btnRed } from "../styles/globalStyle";

export default function BasicModal({ setOpen, open, image }) {
  const handleClose = () => setOpen(false);
  const [postImage, setPostImage] = useState({ image: "" });
  const [secondModal, setSecondModal] = useState(false);
  const { update } = useAuthCall();

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        throw new Error("No file selected");
      }
      const base64 = await convertToBase64(file);
      setPostImage({ image: base64 });
      setSecondModal(true);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleYes = async () => {
    await update(postImage);
    handleClose();
    setPostImage({ image: "" })
    setSecondModal(false);
  };

  const handleNo = () => {
    setSecondModal(false);
    setPostImage({ image: "" }); // Reset the selected image
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "14rem",
    height: "14rem",
  };

  const styleSecondModal = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    width: "20rem",
    height: "8.5rem",
    backgroundColor:"#f4fffe",
    padding:"1rem",
    borderRadius:"1rem"
  };


  const iconStyle = {
    color: "#449eb7",
    position: "absolute",
    bottom: "-1.2rem",
    right: "3rem",
    transform: "translate(50%, -50%)",
    zIndex: 3,
    backgroundColor: "white",
    width: "4rem",
    height: "4rem",
    padding: "0.6rem",
    borderRadius: "50%",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form flexDirection={"column"}>
          <InputLabel htmlFor="file-upload" sx={style}>
            <img
              src={image ? image : nouser}
              style={{
                backgroundColor: "#fff",
                width: "80%",
                height: "80%",
                position: "relative",
                borderRadius: "50%",
              }}
            />
            <AddAPhotoIcon sx={iconStyle} />
          </InputLabel>

          <Input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            sx={{ display: "none" }}
            onChange={(e) => handleFileUpload(e)}
          ></Input>
        </form>
      </Modal>

      <Modal
        open={secondModal}
        onClose={handleNo}
        aria-labelledby="second-modal-title"
        aria-describedby="second-modal-description"
      >
        <Box style={styleSecondModal}>
          <Typography sx={{textAlign:"center", fontWeight:"500"}}>Do you want to proceed with the selected image?</Typography>
          <Box sx={{display:"flex", flexDirection:"row", gap:1, m:"1rem 0.5rem 0.5rem "}}>
          <Button sx={btnGreen} onClick={handleYes}>Yes</Button>
          <Button sx={btnRed} onClick={handleNo}>No</Button>
          </Box>
         
        </Box>
      </Modal>
    </>
  );
}
