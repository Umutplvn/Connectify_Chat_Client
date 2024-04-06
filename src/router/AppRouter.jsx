import { Route, Routes } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import PrivateRouter from "../pages/PrivateRouter";
import EmailVerification from "../pages/EmailVerification";
import MainPage from "../pages/MainPage";
import IndexPage from "../pages/IndexPage";
import Chats from "../pages/Chats"
import Contacts from "../pages/Contacts"
import Settings from "../pages/Settings"
import Status from "../pages/Status"
import People from "../pages/People"
import Chat from "../pages/Chat"
import { useState } from "react";

const AppRouter = () => {
  const [contacts, setContacts] = useState([])
  const [secondId, setSecondId] = useState("");
  
  return (
    <>
      <Routes>
        <Route path="/" index element={<IndexPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/verification" element={<EmailVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/chats" element={<Chats setSecondId={setSecondId}/>} />
          <Route path="/chat/:_id" element={<Chat secondId={secondId}/>} />
          <Route path="/contacts" element={<Contacts setContacts={setContacts}  contacts={contacts}/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/status" element={<Status contacts={contacts}/>} />
          <Route path="/people" element={<People setContacts={setContacts} contacts={contacts} />} />


        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
