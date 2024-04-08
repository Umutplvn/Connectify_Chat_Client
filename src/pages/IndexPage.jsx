import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import bgImage from "../assets/blueBg.png";
import { MessageBox } from "react-chat-elements";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setShowMessageBox(true);
    }, 1000);
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontFamily: "Bebas Neue sans-serif",
          fontWeight: "900",
          color: "#33897f",
          mt: "3rem",
        }}
      >
        <ReactTyped strings={["CONNECTIFY"]} typeSpeed={200} />
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "5rem",
          transform: showMessageBox ? "translateY(0rem)" : "translateY(4rem)",
          transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
          opacity: showMessageBox ? "1" : "0",
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mt: "4rem",
        }}
      >
        <MessageBox
          position={"left"}
          type={"text"}
          text={
            <Box>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontFamily: "halvetica",
                  mt: "0.3rem",
                  mb: "-1rem",
                }}
              >
                Good morning mom 🤗 🥰
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "-0.7rem",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  width: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  fontSize: "0.8rem",
                  border: "0.5px solid #edebeb",
                }}
              >
                ❤️
              </Typography>
            </Box>
          }
          date={new Date()}
          styles={{
            background: "white",
            maxWidth: "80%",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "5rem",
          transform: showMessageBox ? "translateY(0rem)" : "translateY(4rem)",
          transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
          transitionDelay: "0.5s",
          opacity: showMessageBox ? "1" : "0",
          paddingRight: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <MessageBox
          position={"right"}
          type={"text"}
          text={
            <Box>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontFamily: "halvetica",
                  mt: "0.3rem",
                  mb: "-1rem",
                }}
              >
                Morning baby 😘
              </Typography>
            </Box>
          }
          date={new Date()}
          styles={{
            background: "linear-gradient(to top right, #D9FDD3, #fff",
            maxWidth: "80%",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: "2rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "1.5s",

          opacity: showMessageBox ? "1" : "0",
        }}
      >
        <Typography
          sx={{
            ml: "2rem",
            fontFamily: "sans-serif",
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "#535353",
          }}
        >
          Message privately
        </Typography>
        <Typography
          sx={{
            m: "1rem 2rem",
            fontFamily: "sans-serif",
            fontSize: "1rem",
            color: "#363636",
          }}
        >
          Simple, reliable, private messaging, photo and note sharing, available
          all over the world.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "3rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "2s",
          opacity: showMessageBox ? "1" : "0",
          display:"flex",
          gap:2,
          justifyContent:'center'
        }}
      >
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.4s",
            "&:hover": {
              backgroundColor: "#537c87",
              color: "white",
            },
          }}
          onClick={()=>navigate('/login')}

        >
          Sign in
        </Button>
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.4s",
            "&:hover": {
              backgroundColor: "#537c87",
              color: "white",
            },
          }}
          onClick={()=>navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default IndexPage;
