import React, { useState } from "react";
import Footer from "../components/Footer";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ProfileBox, logStyle } from "../styles/globalStyle";
import UpdateProfile from "../components/UpdateProfile";
import FavoriteMessages from "../components/FavoriteMessages";
import ChangePass from "../components/ChangePass";
import ContactMe from "../components/ContactMe";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";
import BasicModal from "../components/updatePP";

const Settings = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { logout } = useAuthCall();
  const { image } = useSelector((state) => state?.auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            padding: "1rem 0.5rem",
            fontSize: "24px",
            fontWeight: "700",
            backgroundColor: "#fdffff",
          }}
        >
          Settings
        </Typography>

        <BasicModal setOpen={setOpen} open={open} image={image} />

        <Box sx={ProfileBox}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0.5rem",
            }}
            onClick={handleOpen}
          >
            <Avatar sx={{ width: "6rem", height: "6rem" }} src={image}></Avatar>
            <Typography sx={{ color: "#1776d6", fontSize: "0.8rem" }}>
              Edit
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: "0.5rem" }}>
          <UpdateProfile handleToggle={handleToggle} openIndex={openIndex} />
          <FavoriteMessages handleToggle={handleToggle} openIndex={openIndex} />
          <ChangePass handleToggle={handleToggle} openIndex={openIndex} />
          <ContactMe handleToggle={handleToggle} openIndex={openIndex} />
        </Box>
      </Box>

      <Box sx={logStyle}>
        <Button onClick={logout}>
          <LogoutRoundedIcon sx={{ fontSize: "1.5rem" }} />
          LOGOUT
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default Settings;
