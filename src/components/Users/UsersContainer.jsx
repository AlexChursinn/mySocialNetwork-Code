import React from "react";
import { connect } from "react-redux";
import {
  follow,
  getUsers,
  setCurrentPage,
  toggeleFollowingProgress,
  unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUserss,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize); /* Вызываем санку */
  }

  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, pageSize); /* вызываем thunk */
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}{" "}
        {/* ЕСли isFetching true то показываем картинку если нет то null */}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

/* Старый коментирую */
/* let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
}; */

let mapStateToProps = (state) => {
  return {
    /* users: getUserssЫгзук(state),  вызываем ту функцию reselector */
    users: getUserss(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  /* withAuthRedirect, */ /* Теперь просто добовляя или убирая строчку делаем редирект */
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggeleFollowingProgress,
    getUsers /* Добавил thunk и он теперь попадает в пропсы компоненты*/,
  })
)(UsersContainer);
