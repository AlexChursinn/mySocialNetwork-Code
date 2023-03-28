/* ==================================================================== */
/* IMPORT REDUCER*/

import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

/* ==================================================================== */
/* store and dispatch */

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?'", likesCount: "5" },
        { id: 2, message: "It's my first post", likesCount: "7" },
      ],
      newPostText: "Hi",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Churs" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Alexander" },
        { id: 4, name: "Victor" },
        { id: 5, name: "Valera" },
        { id: 6, name: "Sveta" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hello" },
        { id: 3, message: "Privet" },
        { id: 4, message: "Hi" },
        { id: 5, message: "Hello" },
        { id: 6, message: "Privet" },
      ],
      newMessageText: "Hi",
    },
    sidebar: {},
  },

  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

/* ==================================================================== */

export default store;
