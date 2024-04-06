import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { useEffect, useState } from "react";

const Footer = () => {

  useEffect(() => {
    const storedSelected = localStorage.getItem("selected");
    if (storedSelected) {
      setSelected(parseInt(storedSelected));
    }
  }, []);

  const [selected, setSelected] = useState(3);


  const data=[
    {to:"/status",
    icon:<CameraOutlinedIcon />,
    name:"Status",
    index:1
    },
    {to:"/people",
    icon: <PersonAddOutlinedIcon />,
    name:"People",
    index:2
    },
    {to:"/chats",
    icon:<MapsUgcOutlinedIcon />,
    name:"Chats",
    index:3
    },
    {to:"/contacts",
    icon:  <Diversity2OutlinedIcon />,
    name:"Contacts",
    index:4
    },
    {to:"/settings",
    icon:<SettingsOutlinedIcon />,
    name:"Settings",
    index:5
    },
  ]

   const handleLinkClick = (index) => () => {
    setSelected(index);
    localStorage.setItem("selected", index);
  };



  return (
    <Box
      display="flex"
      position="fixed"
      bottom="0"
      width={"100%"}
      justifyContent="center"
      sx={{
        borderTop: "solid 0.5px #a6a9ab",
        borderRadius: "0.4rem",
        backgroundColor: "#F0F2F5",
        fontFamily: "sans-serif",
        fontSize: "12px",
      }}
    >
      {data.map((item)=>{
        return(
     <Link
     to={item.to}
     onClick={handleLinkClick(item.index)}
     style={{
       textDecoration: "none",
       color: "#54656F",
       width: "20%",
       textAlign: "center",
       padding: "0.5rem",
       borderRadius:"5rem",
       backgroundColor: selected == item.index ? "#d6dce3" : "#F0F2F5",
     }}
   >
     <Box
       display="flex"
       flexDirection="column"
       alignItems="center"
       justifyContent="center"
     >
       {item.icon}
       {item.name}
     </Box>
   </Link>)
      })}
    </Box>
  );
};

export default Footer;
