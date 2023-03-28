import { createSelector } from "reselect"; /* Подлючаем из библиотеки */

/* Делаем селектор это функция которая принимает state достает из него то что нужно и отдает UI*/

export const getUserss = (state) => {
  return state.usersPage.users;
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};

export const getUsersSuper = createSelector((users) => {
  /* Сюда передаем сложную функцию */
});
