import { getAuthUserData } from "./auth-reducer";

/* 3) action type  */
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

/* ==================================================================== */

let initialState = {
  initialized: false /* сначала не проинициализированно  приложение */,
};

/* 2) Заполняю reducer */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true /* Если  INITIALIZED_SUCCESS то заменим на true*/,
      };
    default:
      return state;
  }
};

/* ==================================================================== */

/* 4) Создаем AC */
/* ACTION CREATOR */

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

/* Санка */
export const initializedApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData()); /* Перенесли из APP */
  Promise.all([promise]).then(() => {
    /* Только когда все диспатчи выше произойдут */
    dispatch(initializedSuccess()); /* Мы проинициализируем приложение */
  });
};

export default appReducer;
