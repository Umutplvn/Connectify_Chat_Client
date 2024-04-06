import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Tooltip from "@mui/material/Tooltip";
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";

export default function AccountMenu({ item }) {
  const { deleteChat } = useDataCall();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { chats } = useSelector((state) => state.appData);
  const { userId } = useSelector((state) => state.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const chat = chats?.filter(
    (data) => data?.members.includes(userId) && data?.members.includes(item._id)
  );

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <MoreHorizIcon
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          ></MoreHorizIcon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            ml: 1,
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
        <MenuItem onClick={() => deleteChat(chat[0]?._id)}>
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          Delete Chat
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CancelRoundedIcon fontSize="small" />
          </ListItemIcon>
          Cancel{" "}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
