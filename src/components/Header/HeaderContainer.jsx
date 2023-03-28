import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";

/* 7) Делаем контейнерную компоненту для Header */
class HeaderContainer extends React.Component {
  render() {
    return (
      <Header {...this.props} />
    ); /* Пробрасываем все пропсы  {...this.props}*/
  }
}

/* 13) Прокидываем потом они попадут в <Header {...this.props} /> */
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

/* Даем logout в  HeaderContainer */
export default connect(mapStateToProps, { logout })(
  HeaderContainer
); /* 10) оборачиваем  HeaderContainer connect*/

/* 8) Теперь HeaderContainer отрисовываем в APP */

/* {
        withCredentials: true,
      } метод чтобы сервер узнал что мы авторизованы */
