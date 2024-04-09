import React, { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Input, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import useAuthCall from "../hooks/useAuthCall";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BasicModal from "./DeleteAcoountModal";

const UpdateProfile = ({ handleToggle, openIndex }) => {
  const { name, username, bio } = useSelector((state) => state.auth);
  const { update } = useAuthCall();
  const [firstInput, setFirstInput] = useState(true);
  const [secondInput, setSecondInput] = useState(true);
  const [thirthInput, setThirthInput] = useState(true);
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [hoverState, setHoverState] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


  const updateName = () => {
    update({ name: newName });
    setFirstInput(true);
    setSecondInput(true);
    setThirthInput(true);
  };

  const updateUserName = () => {
    update({ username: newUserName });
    setFirstInput(true);
    setSecondInput(true);
    setThirthInput(true);
  };

  const updateBio = () => {
    update({ bio: newBio });
    setFirstInput(true);
    setSecondInput(true);
    setThirthInput(true);
  };

  const firstClick = () => {
    setFirstInput(false);
    setSecondInput(true);
    setThirthInput(true);
  };

  const secondClick = () => {
    setFirstInput(true);
    setSecondInput(false);
    setThirthInput(true);
  };

  const thirthClick = () => {
    setFirstInput(true);
    setSecondInput(true);
    setThirthInput(false);
  };

  const toggle = () => {
    handleToggle(1);
    setFirstInput(true);
    setSecondInput(true);
  };

  return (
    <Card
      sx={{
        minWidth: 300,
        border: "1px solid rgba(211,211,211,0.6)",
      }}
    >
      <CardHeader
        title={
          <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircleIcon
                sx={{ fontSize: "1.9rem", color: "#2A76D2" }}
              />
              <Typography sx={{ fontSize: "1rem" }}>Account </Typography>
            </Box>
          </React.Fragment>
        }
        action={
          <IconButton onClick={toggle} aria-label="expand" size="small">
            {openIndex === 1 ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowUpIcon />
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowDownIcon />
              </Box>
            )}
          </IconButton>
        }
      ></CardHeader>

      <Box
        sx={{
          backgroundColor: "rgba(211,211,211,0.4)",
        }}
      >
        <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
          <CardContent>
            <Container
              sx={{
                height: 130,
                lineHeight: 2,
              }}
            >
              {/* Name */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3rem",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2f84e5",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Name:
                </Typography>

                {firstInput ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={firstClick}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {name?.charAt(0).toUpperCase() +
                        name.slice(1).toLowerCase()}
                    </Typography>
                    <EditIcon sx={{ fontSize: "1.2rem", color: "#25839b" }} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      disableUnderline
                      autoFocus
                      placeholder={
                        name?.charAt(0).toUpperCase() +
                        name.slice(1).toLowerCase()
                      }
                      onChange={(e) => setNewName(e.target.value)}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <ThumbUpAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#29a544",
                            ml: "1rem",
                          }}
                          onClick={updateName}
                        />
                      </Box>

                      <Box sx={{ display: "flex", width: "100%" }}>
                        <ThumbDownAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#9b2525",
                            ml: "1rem",
                          }}
                          onClick={() => setFirstInput(true)}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              {/* Username */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3rem",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2f84e5",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Username:
                </Typography>

                {secondInput ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={secondClick}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      @{username}
                    </Typography>
                    <EditIcon sx={{ fontSize: "1.2rem", color: "#25839b" }} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      autoFocus
                      disableUnderline
                      placeholder={"@" + username}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <ThumbUpAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#29a544",
                            ml: "1rem",
                          }}
                          onClick={updateUserName}
                        />
                      </Box>

                      <Box sx={{ display: "flex", width: "100%" }}>
                        <ThumbDownAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#9b2525",
                            ml: "1rem",
                          }}
                          onClick={() => setSecondInput(true)}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Bio */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3rem",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2f84e5",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  About:
                </Typography>
                {thirthInput ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={thirthClick}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {bio}
                    </Typography>
                    <EditIcon sx={{ fontSize: "1.2rem", color: "#25839b" }} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      autoFocus
                      inputProps={{ maxLength: 30 }}
                      disableUnderline
                      placeholder={bio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <ThumbUpAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#29a544",
                            ml: "1rem",
                          }}
                          onClick={updateBio}
                        />
                      </Box>

                      <Box sx={{ display: "flex", width: "100%" }}>
                        <ThumbDownAltRoundedIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#9b2525",
                            ml: "1rem",
                          }}
                          onClick={() => setThirthInput(true)}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>


              <Box sx={{width:"100%", display:"flex", justifyContent:"center"}}
              >
                <BasicModal setOpen={setOpen} open={open}/>
              <Box
                sx={{
                  width:"11rem",
                  display: "flex",
                  alignItems: "center",
                  overflow:"hidden"
                }}
                onClick={handleOpen}
              >

                <DeleteSweepIcon
                 sx={{
                  fontSize: "1.3rem",
                  color: hoverState ? "red" : "#d12c2c",
                  transition: "transform 0.3s ease", // Transform için geçiş efekti
                  transform: hoverState ? "translateX(0.2rem)" : "translateX(12rem)",
                  transition:"0.5s ease-in-out",
                  mb:"0.1rem"
                }}
                />

                <Typography
                  sx={{
                    color: "#d12c2c",
                    m: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor:"pointer",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                  onMouseEnter={() => setHoverState(true)}
                  onMouseLeave={() => setHoverState(false)}
                >
                  Delete My Accout
                </Typography>
              </Box>
              </Box>
            </Container>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};

export default UpdateProfile;
