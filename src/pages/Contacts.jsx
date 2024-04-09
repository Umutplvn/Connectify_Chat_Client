import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDataCall from "../hooks/useDataCall";
import BasicModal from "../components/ContactModal";
import useAuthCall from "../hooks/useAuthCall";
import { useNavigate, useParams } from "react-router-dom";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { addRemoveStyle } from "../styles/globalStyle";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import usernone from "../assets/nouser.png"

const People = () => {
  const { contacts } = useSelector((state) => state?.auth);
  const { getMyContacts } = useAuthCall();
  const { getUsers, createChat, onlineUsers } = useDataCall();
  const [display, setDisplay] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contactId, setContactId] = useState("");
  const [check, setCheck] = useState(null);
  const [search, setSearch] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate()

  useEffect(() => {
    getUsers();
    getMyContacts();
  }, []);


  console.log("contacts", contacts);

  const handleSearch = (e) => {
    const searchKeyword = e.target.value.toLowerCase();
    let filteredData;
    if (searchKeyword.trim() === "") {
      filteredData = contacts;
    } else {
      filteredData = contacts?.filter((item) => {
        return (
          item?.username?.toLowerCase()?.includes(searchKeyword) ||
          item?.name?.toLowerCase()?.includes(searchKeyword)
        );
      });
    }
    setDisplay(filteredData);
    setSearch(e.target.value);
  };

  const removeContactState = (item) => {
    setCheck(true);
    handleOpen();
    setName(item?.name);
    setContactId(item?._id);
    setSearch("");
  };

  useEffect(() => {
    setDisplay(contacts);
  }, [contacts]);

  const forwardToChat=(item)=>{
    navigate(`/chat/${item}`)
    createChat(item)
  }
  const contactsData = contacts?.map((item) => item?._id);


  const style = {
    width: "50px",
    height: "50px",
    overflow: "hidden",
  };

  const online ={
    position:"absolute", 
    zIndex:"2", 
    bottom:0, 
    right:"0rem", 
    fontSize:"small",
    color:"#91c943"
  }

  const offline ={
    position:"absolute", 
    zIndex:"2", 
    bottom:"-0.1rem", 
    right:"-0.1rem", 
    fontSize:"1rem",
    color:"#c4c4c4"
  }


  return (
    <Box>
      {/* Title */}
      <Typography
         sx={{ padding: "1rem 0.5rem", fontSize: "24px", fontWeight: "700", boxShadow:" rgba(17, 17, 26, 0.1) 0px 1px 0px ", backgroundColor:"#fdffff", mb:"1rem"
        }}
      >
        Contacts
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
          onChange={(e) => handleSearch(e)}
          value={search}
          placeholder="Search"
          id="outlined-password-input"
          type="search"
          size="small"
          autoComplete="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: "center" }}>
                <SearchOutlinedIcon sx={{ display: true ? "block" : "none" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* People Data*/}
      {display?.map((item) => {
        const matchIndex = contactsData?.indexOf(item._id);
        const isMatched = matchIndex >= 0;

        return (
          <Box
            sx={{
              display: "flex",
              p: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={item?._id}
          >
         <Box style={style} position={"relative"}>
    <img src={item?.image ? item?.image : usernone} style={{width:"100%", height:"100%", borderRadius: "50%",
}} alt="PP" />
    <FiberManualRecordRoundedIcon sx={onlineUsers?.some((user)=>user?.userId===item._id) ? online : offline}/>
</Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                p: "0.3rem",
                borderBottom: "0.5px solid #e0e4eb",
                justifyContent: "space-between",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"85%"}
                justifyContent={"space-evenly"}
                onClick={() =>forwardToChat(item._id)}
              >
                <Typography sx={{ fontWeight: "700" }} 
                >
                  {item?.name.charAt(0).toUpperCase() +
                    item?.name.slice(1).toLowerCase()}
                </Typography>
                <Typography
                sx={{fontSize:"0.8rem", color:"#323232dd"}}
               >{item?.bio} </Typography>
              </Box>

              <BasicModal
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                name={name}
                contactId={contactId}
                check={check}
              />

              <Box
                onClick={() => removeContactState(item)}
                sx={addRemoveStyle}
              >
                <IoPersonRemoveSharp
                size={27}
                cursor={"pointer"}
                sx={{
                  cursor: "pointer",
                  transition: "1s",  
                  }}
                  
                />
              </Box>
            </Box>
          </Box>
        );
      })}

      <Footer />
    </Box>
  );
};

export default People;
