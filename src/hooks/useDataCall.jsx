import useAxios from "./useAxios";
import {
  getChatsSuccess,
  fetchStart,
  fetchFail,
  getMessagesSuccess,
  getUsersSuccess,
  noteSuccess,
  storySuccess,
  createStorySuccess,
  findChatSuccess,
  clearMessagesStateSuccess,
  favMessagesStateSuccess,
  getProfileSuccess,
} from "../features/appDataSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';
import { useEffect, useState } from "react";


const useDataCall = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  const { name, userId } = useSelector((state) => state?.auth);
  const [userData, setUserData] = useState({});
  const [socket, setSocket] = useState(null)
const [onlineUsers, setOnlineUsers] = useState([])

//   //! socket.io
//   useEffect(() => {
//     const newSocket = io("http://localhost:8080");
// setSocket(newSocket)
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [userId]);

//   useEffect(() => {
//  if(socket==null) return
//     socket.emit("addNewUser", userId)
//     socket.on("getOnlineUsers", (res)=>{
//       setOnlineUsers(res)
//     })
//   }, [socket])
  
  //! Users

  const getUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken("auth/users");
      dispatch(getUsersSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const getUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`auth/users/${userId}`);
      dispatch(getProfileSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  //! Notes

  const getNotes = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken("app/getnotes");
      dispatch(noteSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const createNote = async (content) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("app/createnote", content);
      dispatch(noteSuccess({ data }));
      getNotes();
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const deleteNote = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete("app/deletenote");
      dispatch(noteSuccess({ data }));
      getNotes();
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  //! Stories

  const getStories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken("app/getstories");
      dispatch(storySuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const createStory = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("app/createstory", info);
      dispatch(createStorySuccess({ data }));
      getStories();
      toast(
        `${
          name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        }, great story!!! 🚀`
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const deleteStory = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete("app/deletestory");
      dispatch(storySuccess({ data }));
      getStories();
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  //! Chats

  const getChats = async () => {
    dispatch(fetchStart());
    try {
      const  {data}  = await axiosWithToken("chats/findall");
      dispatch(getChatsSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const createChat = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`chats/${info}`);
      getChats();
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const findChat = async (secondId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`chats/find/${secondId}`);
      dispatch(findChatSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const readChatMessages = async (chatId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`chats/readchat`, chatId);
      getChats(chatId)
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const deleteChat = async (chatId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`chats/deletechat/${chatId}`);
      toast("Successfully deleted");
      getChats();
    } catch (error) {
      toast(error);
      dispatch(fetchFail());
    }
  };

  //! Messages

  const getMessages = async (chatId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`messages/find/${chatId}`);
      dispatch(getMessagesSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const clearMessagesState = async () => {
    dispatch(fetchStart());
    try {
      dispatch(clearMessagesStateSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const createMessages = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`messages/`, info);
      getMessages(info.chatId);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const addReaction = async (info, chatId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`messages/reaction`, info);
      getMessages(chatId);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const favMessage = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`messages/fav`, info);
      dispatch(favMessagesStateSuccess({ data }));
      toast(data.message);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  const deleteMessage = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`messages/delete/${info?.messageId}`);
      getMessages(info?.chatId);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toast(error);
    }
  };

  return {
    getChats,
    getMessages,
    deleteChat,
    getUsers,
    getUser,
    createNote,
    deleteNote,
    getNotes,
    createStory,
    getStories,
    deleteStory,
    findChat,
    createMessages,
    clearMessagesState,
    createChat,
    addReaction,
    favMessage,
    deleteMessage,
    onlineUsers,
    readChatMessages
  };
};

export default useDataCall;
