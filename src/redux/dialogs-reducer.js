const ADD_MESSAGE = "ADD-MESSAGE";
/* const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";  не нужна*/

/* ==================================================================== */

let initialState = {
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
  ] /* Убираем теперь здесь */,
  /*   newMessageText: "Hi", */
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 7,
        message:
          action.newMessageText /* newMessageText теперь берем не из state а из action */,
      };
      return {
        ...state,
        /*  newMessageText: "", затирать больше не будем */
        messages: [...state.messages, newMessage],
      };

    /*     case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newMessage,
      }; не нужно больше*/
    default:
      return state;
  }
};

/* ==================================================================== */
/* ACTION CREATOR */

export const addMessageActionCreator = (newMessageText) => ({
  type: ADD_MESSAGE,
  newMessageText,
}); /* Принимает newMessageText */

/* export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMessage: text,
}); не нужен больше*/

export default dialogsReducer;
