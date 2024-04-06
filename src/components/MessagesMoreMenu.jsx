import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import Tooltip from "@mui/material/Tooltip";
import useDataCall from "../hooks/useDataCall";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import AddReaction from "./AddReactionModal";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AccountMenu({ item, setInfo }) {
  const { deleteMessage, favMessage } = useDataCall();
  const [emojiModal, setEmojiModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { userId } = useSelector((state) => state?.auth);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setEmojiModal(false);
  };

  const openFunc = () => {
    setOpenModal(true);
  };

  const addFavourite=()=>{
    favMessage({info:item})
    handleClose()
  }

  const deleteMessageFunc=()=>{
    deleteMessage({messageId:item?._id, chatId:item?.chatId});
    handleClose()
  }

  const replyMessage=()=>{
    setInfo(item)
    handleClose()

  }


  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Account settings">
        {item.sender &&  <MoreHorizIcon
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          ></MoreHorizIcon>}
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            ml: 0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={addFavourite}>
          <ListItemIcon>
            <StarsRoundedIcon sx={{ color: "#d8d52b" }} />
          </ListItemIcon>
          Fav
        </MenuItem>

        <MenuItem onClick={openFunc}>
          <ListItemIcon>
            <AddReactionRoundedIcon
              fontSize="small"
              sx={{ color: "#1961cd" }}
            />
          </ListItemIcon>
          Reaction
        </MenuItem>

        <AddReaction
          setOpenModal={setOpenModal}
          handleClose={handleClose}
          item={item}
          openModal={openModal}
        />

        {item?.sender?._id == userId && (
          <MenuItem onClick={deleteMessageFunc}>
            <ListItemIcon>
              <CancelRoundedIcon fontSize="small" sx={{ color: "#d82b2b" }} />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}

        <MenuItem onClick={replyMessage}>
          <ListItemIcon>
            <ReplyRoundedIcon fontSize="small" sx={{ color: "black" }} />
          </ListItemIcon>
          Reply
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
