import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usernone from "../assets/nouser.png";
import "../styles/bubblestyle.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicModal from "./addNoteModal";
import CancelIcon from "@mui/icons-material/Cancel";
import useDataCall from "../hooks/useDataCall";

const Notes = () => {
  const { image, name, userId } = useSelector((state) => state?.auth);
  const { notes } = useSelector((state) => state?.appData);
  const { deleteNote, getNotes } = useDataCall();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getNotes();
  }, []);

  console.log(image);
  

  const cancelStyle = {
    color: "#d32828",
    position: "absolute",
    zIndex: 2,
    top: -10,
    right: -14,
    cursor: "pointer",
  };

  const myNote = notes?.filter((item) => item?.userId == userId);
  const showNotes = notes?.filter(
    (item) => item?.userId !== userId && item?.userId._id !== userId
  );

  return (
    <>
      <Box
        sx={{
          boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;",
          height: "8rem",
          borderRadius: "0.5rem",
          m: "0.5rem 0.5rem",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {myNote?.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.1rem",
              pl: "0.5rem",
              mt: "0.5rem",
              width: "7rem",
              height: "8rem",
            }}
          >
            <i class="speech-bubble" data-arrow="bottom-center">
              {myNote[0]?.content}
              <CancelIcon
                sx={cancelStyle}
                onClick={deleteNote}
                className="delete-icon"
              />
            </i> 

            <img
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #e0e4eb",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              src={image ? image : usernone}
              alt="PP"
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "12px",
                color: "#716868",
              }}
            >
              {name?.charAt(0).toUpperCase()+name.slice(1).toLowerCase()}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.1rem",
              pl: "0.5rem",
              mt: "2rem",
              width: "7rem",
              height: "8rem",
            }}
          >
            <AddCircleIcon onClick={() => setOpen(true)} className="addBtn" />
            <img
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #e0e4eb",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              src={image ? image : usernone}
              alt="PP"
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "12px",
                color: "#716868",
              }}
            >
              Leave a note...
            </Typography>
          </Box>
        )}

        {showNotes?.map((item) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.1rem",
              pl: "0.5rem",
              mt: "0.5rem",
              width: "7rem",
              height: "8rem",
            }}
          >
            <i class="speech-bubble" data-arrow="bottom-center">
              {item?.content}
            </i>
            <img
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #e0e4eb",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              src={item?.userId?.image || usernone}
              alt="PP"
            />
            <Typography
              sx={{
                width: "40px",
                textAlign: "center",
                fontSize: "12px",
                color: "#716868",
              }}
            >
              {item?.userId?.name?.charAt(0).toUpperCase()+item?.userId?.name.slice(1).toLowerCase()}
            </Typography>
          </Box>
        ))}
      </Box>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default Notes;
