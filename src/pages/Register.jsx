import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormGroup, Modal } from "@mui/material";
import Agreement from "../components/Agreement";
import useAuthCall from "../hooks/useAuthCall";
import PasswordStrengthBar from "react-password-strength-bar";
import Header from "../components/Header";


const Register = () => {
 
  const { register } = useAuthCall();
  const [openModal, setOpenModal] = useState(false);
  const [passwordError, setPasswordError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    label: "",
    username: "",
  });


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    if (
      info.email.length > 0 &&
      info.username.length > 0 &&
      info.name.length > 0 &&
      info.password.length >= 3
    ) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(info);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAgreementLinkClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (

    <Box  style={{
      position: "relative",
      height: "105vh",

    }}>




      <Header/>

      <Box sx={{ textAlign: "center", padding:"0.5rem"}}  >
        <Typography sx={{ color: "#265b54", fontSize: "1.5rem", mb: "1rem" }}>
          Register to the Connectify
        </Typography>
        <Box>
          <Box
            display={{ position: "relative" }}
            sx={{ width: "%100", display: "flex", justifyContent: "center" }}
          >
            {loading && (
              <img
                src="https://i.gifer.com/ZKZg.gif"
                alt="loading"
                style={{width: "5rem",
                position: "absolute",
                zIndex:"3",
                top: "50%"}}
              />
            )}
          </Box>
        </Box>
        <Typography>
          Connectify will send you an email to verify your email address. Please
          fill the required fields below correctly.{" "}
        </Typography>

        <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Box container spacing={2}>
            <Box sx={{ mb: "1rem"}}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(e) => handleChange(e)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                disabled={loading}
              />
            </Box>

            <Box sx={{ mb: "1rem" }}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e) => handleChange(e)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                disabled={loading}

              />
            </Box>

            <Box sx={{ mb: "1rem" }}>
              <TextField
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleChange(e)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                disabled={loading}

              />
            </Box>
            <Box sx={{ mb: "1rem" }}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                disabled={loading}

              />
              <Box sx={{ width: "100%" }}>
                <PasswordStrengthBar
                  password={info.password}
                  scoreWords={[]}
                  shortScoreWord={""}
                />
              </Box>
            </Box>
          </Box>

          <FormGroup>
            <FormControlLabel
              name="label"
              required
              control={<Checkbox />}
              onChange={handleChange}
              label={
                <span onClick={handleAgreementLinkClick}>
                  Please double click to agree to the{" "}
                  <Link href="#" onClick={handleAgreementLinkClick}
>
                    Connectify user agreement
                  </Link>
                  .
                </span>
              }
            />
          </FormGroup>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              pl: 4,
              pr: 4,
              backgroundColor: "#F2F2F2",
              color: "#242424",
              borderRadius: "1rem",
              width: "8rem",
              transition: "0.4s",
              "&:hover": {
                backgroundColor: "#537c87",
                color: "white",
              },
            }}
          >
            Sign up
          </Button>

          <Box container justifyContent="flex-end">
          <Box>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link href="/login" color="primary">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll", height:"90vh",m: "2rem 1rem" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "scroll",
            mt: "4rem",
            mb: "4rem",
          }}
        >
          <Agreement onClose={handleCloseModal} />
        </Box>
      </Modal>
    
    </Box>
  );
};

export default Register;
