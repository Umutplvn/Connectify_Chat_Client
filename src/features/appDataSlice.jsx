import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
  name: "app",
  initialState: {
    loading:false,
    error:false,
    chats: [],
    messages:[],
    favMessages:[],
    users: [],
    error: false,
    notes:[],
    stories:[],
    myStory:"",

  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    getChatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.chats = payload?.data?.result;
    },

    getMessagesSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.messages = payload?.data;
    },

    clearMessagesStateSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.messages = [];

    },

    favMessagesStateSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.favMessages = payload.data.response;

    },

    getUsersSuccess: (state, {payload }) => {
      state.loading = false;
      state.error = false;
      state.users = payload;
    },

    getProfileSuccess: (state, {payload }) => {
      state.loading = false;
      state.error = false;
      state.favMessages = payload?.data?.result?.favMessages;
    },


    noteSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.notes = payload?.data?.result;
    },

    createStorySuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.myStory = payload?.data?.response
    },

    storySuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.stories = payload?.data?.response
      state.myStory = payload?.data?.myStory
    },

    findChatSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.chatNo = payload?.data?.result?.chat?._id
    },

    logoutDataSuccess: (state) => {
      state.loading= false;
      state.error= false;
      state.chats= [];
      state.messages=[];
      state.users= [];
      state.error= false;
      state.notes=[];
      state.stories=[];
      state.myStory=""
      state.chatNo=""
      state.favMessages=[]
    },
  },
});

export const {
  getChatsSuccess,
  fetchStart,
  fetchFail,
  getMessagesSuccess,
  getUsersSuccess,
  noteSuccess,
  logoutDataSuccess,
  storySuccess,
  createStorySuccess,
  findChatSuccess,
  clearMessagesStateSuccess,
  favMessagesStateSuccess,
  getProfileSuccess
} = appDataSlice.actions;

export default appDataSlice.reducer;
