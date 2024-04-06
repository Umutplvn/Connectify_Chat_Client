export const btnRed = {
  backgroundColor: "#cb5b5b",
  color: "white",
  "&:hover": { backgroundColor: "#b71c1c" },
};

export const btnGreen = {
  backgroundColor: "#3ea17b",
  color: "white",
  "&:hover": { backgroundColor: "#2f8061" },
};

export const btnGreen1 = {
  backgroundColor: "#3ea17b",
  color: "white",
  "&:hover": { backgroundColor: "#2f8061" },
  mt:"1rem"
};

export const addRemoveStyle = {
  width: "3rem",
  color: "#4f9bbf",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const btnLead = {
  variant: "contained",
  m: "1rem 0.5rem",
  type: "submit",
  backgroundColor: "#3E97EF",
  color: "white",
  width: "8rem",
  display: "flex",
  "&:hover": {
    backgroundColor: "primary.dark",
    boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 3px",
  },
};

export const statusStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "0.1px solid #d7eedc",
  borderRadius: "0.5rem",
  width: "4rem",
  height: "2.5rem",
  fontWeight: "800",
  background: "linear-gradient(to bottom right, #ffffff, #66c4a0)",
  cursor: "pointer",
  mt: "4rem",
  color: "black",
};

export const logStyle = {
  position: "fixed",
  bottom: "7rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "0.1rem",
  cursor: "pointer",
  position: "absolute",
  zIndex: -1,
  alignItems: "center",
  fontWeight: "600",
  fontSize: "1.1rem",
  transition: "color 0.3s, transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

export const ProfileBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  margin: "0.5rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  boxShadow: " rgba(189, 189, 189, 0.35) 0px 5px 15px; ",
};
