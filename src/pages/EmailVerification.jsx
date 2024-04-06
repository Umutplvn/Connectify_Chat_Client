import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import useAuthCall from "../hooks/useAuthCall";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const EmailVerification = () => {
  const { passcode, userId } = useSelector((state) => state.auth);
  const { deleteUser, update } = useAuthCall();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [expired, setExpired] = useState(false); // Süre dolup dolmadığını belirten durum
  const [remainingTime, setRemainingTime] = useState(60); // Başlangıçta 60 saniye olarak ayarlandı

  useEffect(() => {

    let timer;
    if (!expired) {
      timer = setTimeout(() => {
        deleteUser(userId);
        setExpired(true);
        navigate("/register")
        toast("Time is up!")
      }, 60000);
    }

    return () => clearTimeout(timer);
  }, [deleteUser, expired, userId]);


  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode == pass) {
      update({ verified: true });
      navigate("/chats");
      toast("Welcome to Connectify");
    } else {
      toast("Passcode is wrong");
      setPass("");
    }
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div >
        <div style={{fontSize:"30px"}}>{remainingTime}</div>
      </div>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          right: "0",
          top: "0",
          padding: "2rem",
          mt: "1rem",
        }}
      >
        {/* //Timer */}

        <CountdownCircleTimer
          size={80}
          strokeWidth={5}
          isPlaying
          duration={remainingTime}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[60, 30, 10, 5]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>


      </Box>
      <Box sx={{ textAlign: "center", mt: "9rem", p:"0.5rem" }}>
        <Typography sx={{ color: "#3B9387", fontSize: "1.5rem", mb: "1rem" }}>
          Verify your email address
        </Typography>
        <Typography>
          Thank you for registering. We've sent a verification code to your
          email. Please enter this code in the designated box to complete the
          registration process.
        </Typography>

        <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Box container spacing={2}>
            <Box sx={{ mb: "1rem" }}>
              <TextField
                sx={{ mt: "3rem" }}
                required
                fullWidth
                name="pass"
                label="Passcode"
                type="pass"
                id="pass"
                value={pass}
                autoComplete="pass"
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              pl: 4,
              pr: 4,
              backgroundColor: "#41D463",
              "&:hover": { backgroundColor: "#2daa4a" },
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerification;
