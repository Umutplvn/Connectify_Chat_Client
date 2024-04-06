import {
  Avatar,
  Box,
  Button,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Notes from "../components/Notes";
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";
import usernone from "../assets/upload.svg";
import clickIcon from "../assets/click.png";
import { statusStyle } from "../styles/globalStyle";
import CancelIcon from "@mui/icons-material/Cancel";

const Status = () => {
  const { userId, image } = useSelector((state) => state?.auth);
  const { stories, myStory } = useSelector((state) => state?.appData);
  const [check, setCheck] = useState(false)
  const { getNotes, createStory, getStories, deleteStory } = useDataCall();

  useEffect(() => {
    getNotes();
    getStories();
  }, []);

  const gradientBackground = {
    background: "linear-gradient(to bottom right, #ffffff, #d6e7e6)",
  };

  const [postImage, setPostImage] = useState({ content: "", userId: userId });

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setCheck(true)
      if (!file) {
        throw new Error("No file selected");
      }

      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, content: base64 });
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStory(postImage);
    
  };


  const deleteStoryFucn=(e)=>{
    e.preventDefault()
    deleteStory()
    setCheck(true)
  }

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

  return (
    <Box  >
      {/* Title */}
      <Typography
        sx={{
          padding: "1rem 0.5rem",
          fontSize: "24px",
          fontWeight: "700",
          backgroundColor: "#fdffff",
        }}
      >
        Status
      </Typography>
      <Notes />

      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          width: "100%",
          p: "1rem",
          gap:4,
          mb:"5rem",
          backgroundColor: "white",
          justifyContent: "flex-start", // Eğer myStory varsa sola yasla, yoksa ortala
        }}
      >
        {/* Photo */}
        {myStory ? (
          <Box
            sx={{
              flex: "0 0 45%", 
              height: "15rem",
              width:"100%",
              position: "relative",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
              borderRadius: "1rem",
            }}
          >
            <CancelIcon
              sx={{
                color: "red",
                position: "absolute",
                right: "-0.5rem",
                top: "-0.5rem",
                backgroundColor:"white",
                borderRadius:"50%",
                fontSize:"1.5rem",
                cursor:"pointer"
                
              }}
              onClick={deleteStoryFucn}
            />
            <img
              src={myStory?.content || usernone}
              alt="myStory"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "1rem" }}
            />

            <Avatar
              src={image}
              sx={{ position: "absolute", bottom: "0.5rem", left: "0.5rem" }}
              variant="contained"
              component="label"
            />
          </Box>
        ) : (
          <Box
            style={gradientBackground}
            sx={{
              flex: "0 0 45%", 
              height: "15rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",

            }}
          >
            {/* <Typography
              sx={{
                position: "absolute",
                zIndex: "2",
                fontSize: "4rem",
                mt: "-1rem",
                ml: "-8rem",
              }}
            >
              🤣
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                zIndex: "0",
                fontSize: "4rem",
                mt: "1rem",
                ml: "8rem",
              }}
            >
              😍
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                zIndex: "0",
                fontSize: "4rem",
                mt: "7rem",
                ml: "-5rem",
                rotate: "-30deg",
              }}
            >
              😜
            </Typography> */}
            <form flexDirection={"column"} onSubmit={handleSubmit}>
              <InputLabel htmlFor="file-upload" sx={{mt:"4rem"}} >
                {/* <Typography sx={{ fontSize: "4rem", mt: "3rem" }}>
                  📷
                </Typography> */}
                <img src={clickIcon} alt="click" width={"60px"} />
                  
              </InputLabel>

              <Input
                type="file"
                label="Image"
                name="myFile"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                sx={{ display: "none" }}
                onChange={(e) => handleFileUpload(e)}
              />
              <Button sx={statusStyle} disabled={!check} type="Submit">
                POST
              </Button>
            </form>
          </Box>
        )}

        {/* Friends */}

 {stories?.map((item)=>

        <Box
          sx={{
            flex: "0 0 45%",
            height: "15rem",
            position: "relative",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            borderRadius: "1rem",
          }}
        >
          <img
            src={item?.content || usernone}
            alt="friendStory"
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "1rem" }}
            boxShadow= "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"

          />

          <Avatar
            sx={{ position: "absolute", bottom: "0.5rem", left: "0.5rem" }}
            variant="contained"
            component="label"
            src={item?.userId?.image}
          />
        </Box>

      )  }
      </Box>

      <Footer />
    </Box>
  );
};

export default Status;
