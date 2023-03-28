import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

/* 3) action type  */
const SET_USER_DATE =
  "learn-react/auth/SET_USER_DATE"; /* Утсаноить пользоват данные */
const GET_CAPTCHA_URL_SUCCESS =
  "learn-react/auth/GET_CAPTCHA_URL_SUCCESS"; /* Утсаноить пользоват данные */

/* ==================================================================== */

/*1) Данные берем из API */

let initialState = {
  userId: null /* С API со старта null делаем */,
  email: null,
  login: null,
  isAuth: false /* 12) Залогинен или нет? */,
  captchaUrl: null /* Изначально нет каптчи */,
};

/* 2) Заполняю reducer */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATE:
    case GET_CAPTCHA_URL_SUCCESS /* берем наш стейт и перезатираем на новый */:
      return {
        ...state,
        ...action.payload /* в дате будет сидеть userId  email login*/,
      };
    default:
      return state;
  }
};

/* ==================================================================== */

/* 4) Создаем AC */
/* ACTION CREATOR */

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATE,
  payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

/* ==================================================================== */

/* THUNK */

/* Санка */
export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    /* если (response.data.resultCode === 0) то мы залогинены и только в этом случае должны задиспачить setAuthUserData*/
    dispatch(
      setAuthUserData(id, email, login, true)
    ); /* true если залогинены */
  }
};

/* Санка для login*/
export const login =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData()); /* диспачим информацию обо мне */
    } else {
      if (response.data.resultCode === 10) {
        /* response.data.resultCode === 10 если приходит то нужна каптча */
        dispatch(
          getCaptchaUrl()
        ); /* Каптча url запроситя url запишется в captchaUrl: null  */
      }
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error"; /* Если длина сообщения больше нуля то покажем первое сооющение в противном случае Some error */
      dispatch(
        stopSubmit("login", { _error: message })
      ); /* И покажем message тут в качестве общей ошибки 
      ("login", { _error: message }) login имя обьекта а в { _error: message } указываем проблемные свойства
      */
    }
  };

/* Санка для login*/
export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(
      setAuthUserData(null, null, null, false)
    ); /* всё зачищаем и false когда вылогиниваемся */
  }
};

/* Санка для Captcha*/
export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url; /* получаем с сервака url каптчи */
  dispatch(
    getCaptchaUrlSuccess(captchaUrl)
  ); /* создали AC и диспачим полученный результата */
};

export default authReducer;

/* data =  (userId, email, login) */

/* 5) Дальше наш reducer закидываю в наш redux-store */
