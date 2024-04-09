import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import useDataCall from "../hooks/useDataCall";
import { useNavigate } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";
import AccountMenu from "../components/ChatsMoreMenu";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import usernone from "../assets/nouser.png"

const Chats = () => {
  const { getChats, clearMessagesState, onlineUsers, readChatMessages } =
    useDataCall();
  const { getMyContacts } = useAuthCall();
  const { chats } = useSelector((state) => state?.appData);
  const { userId } = useSelector((state) => state?.auth);
  const [display, setDisplay] = useState([]);
  const [changed, setChanged] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    clearMessagesState();
    getChats();
    getMyContacts();
  }, []);

  useEffect(() => {
    const chatData = chats?.filter((item) => item?.chat?.show === true);
    setDisplay(chatData || []);
    setSearchData(chatData || []);
  }, [chats]);

  const setSearch = (e) => {
    const filterName = searchData?.filter((item) =>
      item?.user?.name?.toLowerCase()?.includes(e?.target?.value.toLowerCase())
    );
    setDisplay(filterName);
  };

  const forward = (data) => {

    const chatNumber = chats?.filter(
      (item) => item?.chat?.members?.includes(userId) && item?.chat?.members?.includes(data)
    );
    if(chatNumber){
    readChatMessages({chatId:chatNumber[0]?.chat?._id})
      }

    navigate(`/chat/${data}`);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const style = {
    width: "50px",
    height: "50px",
    overflow: "hidden",
  };

  const online = {
    position: "absolute",
    zIndex: "2",
    bottom: 0,
    right: "0rem",
    fontSize: "small",
    color: "#91c943",
  };

  const offline = {
    position: "absolute",
    zIndex: "2",
    bottom: "-0.1rem",
    right: "-0.1rem",
    fontSize: "1rem",
    color: "#c4c4c4",
  };

  const newMessage = {
    width: "1rem",
    height: "1rem",
    backgroundColor: "#0978F9",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.7rem",
    fontFamily: "sans-serif",
  };

  return (
    <Box>
      {/* Title */}
      <Typography
        sx={{
          padding: "1rem 0.5rem",
          fontSize: "24px",
          fontWeight: "700",
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px ",
          backgroundColor: "#fdffff",
          mb: "1rem",
        }}
      >
        Chats
      </Typography>

      {/* Search Box */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { p: "0 0.5rem", width: "100%" },
          mt: "0.5rem",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => {
            setSearch(e);
          }}
          placeholder="Search"
          id="outlined-password-input"
          type="search"
          size="small"
          autoComplete="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: "center" }}>
                <SearchOutlinedIcon
                  sx={{ display: changed ? "block" : "none" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Chats */}
      {display?.map((item) => (
        <Box
          sx={{
            display: "flex",
            p: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={item?.user?._id}
        >
          <Box style={style} position={"relative"}>
            <img
              src={item?.user?.image ? item?.user?.image : usernone}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              alt="PP"
            />
            <FiberManualRecordRoundedIcon
              sx={
                onlineUsers?.some((user) => user?.userId === item?.user?._id)
                  ? online
                  : offline
              }
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              p: "0.3rem",
              borderBottom: "0.5px solid #e0e4eb",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                onClick={() => forward(item?.user?._id)}
                sx={{ minWidth: "95%", fontWeight: "700" }}
              >
                {item?.user?.name.charAt(0).toUpperCase() +
                  item?.user?.name.slice(1).toLowerCase()}
              </Typography>

              <AccountMenu item={item} />
            </Box>

            <Box>
              <Box
                sx={{ width: "100%", color: "#4b4e55" }}
                display="flex"
                justifyContent={"space-between"}
                onClick={() => forward(item?.user?._id)}
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#323232dd",
                    width: "75%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item?.chat?.lastMessage?.text}
                </Typography>

                {(item?.chat?.messages.filter((item)=>item!==userId)).length == 0 ?
                (
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#323232dd",
                      width: "75%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    width={"25%"}
                    textAlign={"end"}
                  >
                    {formatDate(item.chat.lastMessage.createdAt)}
                  </Typography>
                ) : (
                  <Box sx={newMessage}>{item?.chat?.messages.filter((data)=>data!==userId).length}</Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      <Footer />
    </Box>
  );
};

export default Chats;
