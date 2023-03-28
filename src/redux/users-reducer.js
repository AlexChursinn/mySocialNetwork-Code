import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/validators/objects-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS =
  "TOGGLE_IS_FOLLOWING_PROGRESS"; /* переключаем процесс following */

/* ==================================================================== */

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true /* Получается? для прелоадара */,
  followingInProgress:
    [] /* Дизейбл кнопки  и будем менять на противоположное значение будем помещать в массив айди конкретно того пользователя которого сейчас надо задизейблить*/,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      /* let stateCopy = { ...state, users: [...state.users] }; аналогично записи ниже */
      /* let stateCopy = { ...state, users: state.users.map((u) => u) }; */
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case TOGGLE_IS_FETCHING: {
      /* Принимает значение true false */
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      /* Принимает значение true false */
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [
              state.followingInProgress.filter((id) => id != action.userId),
            ] /* Пропускаем только то id которая пришла в action чтобы только её дизейблить при нажатии */,
      };
    }
    default:
      return state;
  }
};

/* ==================================================================== */
/* ACTION CREATOR */

export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({
  type: UNFOLLOW,
  userId,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

export const toggeleIsFetching = (isFetching) => ({
  /* Принимает значение true false */ type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggeleFollowingProgress = (isFetching, userId) => ({
  /* Принимает значение true false */ type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

/* Создаём thunk которая теперь диспатчит */
export const getUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    /* Мы скажем BLL getUsers а всё остальное произойдёт само по себе */
    dispatch(toggeleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    /* Теперь вызываю наш запрос в DAL уровне где он уже обращается к API и теперь так как response нам возвращает data её приминяем */
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggeleIsFetching(false));
    dispatch(setUsers(data.items)); /* массив наших юсеров */
    dispatch(setTotalUsersCount(data.totalCount)); /* массив наших юсеров */
  };
};

const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggeleFollowingProgress(true, userId));
  /* Когда мы хотим подписаться должны сначала отправить запрос на сервак */

  let response = await apiMethod(userId);
  if (response.data.resultCode == 0) {
    dispatch(
      actionCreator(userId)
    ); /* Если подписка произошла мы только тогда можем задиспачить этот редьюсер */
  }
  dispatch(toggeleFollowingProgress(false, userId));
};

/* Создаём thunk которая теперь диспатчит */
export const follow = (userId, pageSize) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  };
};

/* Создаём thunk которая теперь диспатчит */
export const unfollow = (userId, pageSize) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    );
  };
};

/* getUsersThunkCreator которая может что-то вызыывать (currentPage, pageSize) и вовзращает  thunk  return (dispatch)*/

export default usersReducer;
