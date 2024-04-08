import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useAuthCall from "../hooks/useAuthCall";
import Header from "../components/Header";

const Login = () => {
  const { login } = useAuthCall();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(info);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        position: "relative",
        height: "105vh",
      }}
    >
      <Header />
      <Box sx={{ textAlign: "center", mt: "2rem", p: "0.5rem" }}>
        <Typography sx={{ color: "#265b54", fontSize: "1.5rem", mb: "1rem" }}>
          Login to the Connectify
        </Typography>
        <Typography>
          Welcome to Connectify! Please enter your credentials to access your
          account.
        </Typography>

        <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Box container spacing={2}>
            <Box sx={{ mb: "1rem" }}>
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
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
            </Box>
          </Box>
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
            Sign in
          </Button>
          <Box>
            <Box
              display={{ position: "relative" }}
              sx={{ width: "%100", display: "flex", justifyContent: "center" }}
            >
              {loading && (
                <img
                  src="https://i.gifer.com/ZKZg.gif"
                  alt="loading"
                  style={{
                    width: "5rem",
                    position: "absolute",
                    zIndex: "3",
                    top: "50%",
                  }}
                />
              )}
            </Box>
          </Box>

          <Box container justifyContent="flex-end">
            <Box>
              <Typography variant="body2">
                Don't you have an account?{" "}
                <Link href="/register" color="primary">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
