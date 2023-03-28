import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.autorizedUserId; /* Теперь берем из пропсов 
      Также делаем если у нас нет userId и мы не авторизованы то нам нечего показывать
      */
      /* 
      if (!userId) {
        this.props.history.push(
          "/login"
        );  Если всё таки не логин то редирект на логин но лучше отсюда это не делать никогда 
      }
*/
    }
    this.props.getUserProfile(userId); /* вызываем санку и отдаем ей userId  */
    /* Делаю запрос на статус пользователя */
    /*     setTimeout(() => {
      this.props.getStatus(userId); 
    }, 1000); */ /* Задержка прихода статуса на 1 секунду чтобы увидеть ничего в поле и это бага так как в локлаьном стейте пусто а нам нужен статус пользователя*/
    this.props.getStatus(userId);
  }

  componentDidMount() {
    /* Копируем из refreshProfile*/
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* Делаем тоже самое что и в  componentDidMount*/
    if (this.props.router.params.userId != prevProps.router.params.userId) {
      /* Также чтобы не было зациклинности тут обязательно надо ставить проверку если у нас айдишка не равна айдишки из предыдущих пропсов то меняем */
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={
          !this.props.router.params.userId
        } /* Я являюсь владельцем профиля если !this.props.router.params.userId то отобразим рядом input*/
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status /* Получаем статус */,
    autorizedUserId:
      state.auth
        .userId /* Фиксим так как было захардкодчино значение юзера при логине */,
    isAuth:
      state.auth.isAuth /* Также доабвили чтобы знать авторизованы или нет */,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile /* // */,
  }),
  withRouter,
  withAuthRedirect
)(
  ProfileContainer
); /* ProfileContainer обрабатываем withAuthRedirect потов передаст в withRouter он передаст connect(mapStateToProps, { getUserProfile })*/
