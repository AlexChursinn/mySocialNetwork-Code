import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS"; /* Получение статуса */
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

/* ==================================================================== */

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?'", likesCount: "5" },
    { id: 2, message: "It's my first post", likesCount: "7" },
  ],
  profile: null,
  status: "" /* Статус равен пустой строке изначально */,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 7,
        message: action.newPostText,
        likesCount: "5",
      };
      return { ...state, posts: [...state.posts, newPost] };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }; /* Предет новый статус и я засетаю его в статус */
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      }; /* Возьмем копию профайл и заменем в фотос на новое фотос из action */
    default:
      return state;
  }
};

/* ==================================================================== */
/* ACTION CREATOR */

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
}); /* AC для статуса */

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
}); /* AC для статуса */

/* Создаю санку для Статуса так как есть Аякс запрос */
export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  /* Зарефактоли подключение к API */
  dispatch(setStatus(response.data));
};

/* Создаю санку для Статуса так как есть Аякс запрос */
export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    /* response.data.resultCode === 0 то всё хорошо из API */
    /* Зарефактоли подключение к API в этом случае статус который к нам пришёл мы его сетаем */
    dispatch(setStatus(status));
  }
};

/* Создаю санку для захвата аватарки так как есть Аякс запрос */
export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(
    file
  ); /* Говорим серваку сохранить фото */
  if (response.data.resultCode === 0) {
    /* response.data.resultCode === 0 то всё хорошо из API */
    /* Зарефактоли подключение к API в этом случае статус который к нам пришёл мы его сетаем */
    dispatch(
      savePhotoSuccess(response.data.data.photos)
    ); /* Передаем AC в API в data.photos */
  }
};

/* Создаю санку для захвата формы и передачи значений так как есть Аякс запрос */
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId; /* берем userId*/
  const response = await profileAPI.saveProfile(
    profile
  ); /* Говорим серваку сохранить фото */
  if (response.data.resultCode === 0) {
    /* response.data.resultCode === 0 то всё хорошо из API */
    /* Зарефактоли подключение к API в этом случае статус который к нам пришёл мы его сетаем */
    dispatch(
      getUserProfile(userId)
    ); /* Обращаемся к дургому редьюсеру и берем userId*/
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

/* Создаем санку */
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  /* Зарефактоли подключение к API */
  dispatch(setUserProfile(response.data));
};

export default profileReducer;
