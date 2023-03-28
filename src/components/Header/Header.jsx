import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import Logo from "./../../assets/images/Header.png";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div>
        <img className={s.logo} src={Logo} />
      </div>
      {/* 6) Делаем наш блок */}
      <div className={s.loginBlock}>
        {/* 14) Если авторизованы покажем логин если нет то ссылку на авторизацию*/}
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;

/* 7) Делаем контейнерную компоненту для Header */
