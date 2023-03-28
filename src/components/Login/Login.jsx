import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { login, logout } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import {
  createField,
  Input,
} from "../common/Preloader/FormsControls/FormsControls";
import s from "../common/Preloader/FormsControls/FormsControls.module.css";
import style from "./Login.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* props.handleSubmit сидит в библиотеке */}
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, "password")}
      <div className={s.formCheckbox}>
        {createField(null, "rememberMe", [], Input, "checkbox", null, null)}
      </div>
      <div className={s.formRememberMe}>remember me</div>
      {/*         <Field
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          validate={[required]}
          component={Input}
        /> */}
      {/*       <div>
        <Field component={Input} name={"rememberMe"} type={"checkbox"} />{" "}
        remember me
      </div> */}
      {captchaUrl && <img src={captchaUrl} />}{" "}
      {/* Если captchaUrl есть то покажем картинку с каптчей */}
      {captchaUrl &&
        createField("Symbols from image", "captcha", [required], Input)}
      {/* Создали field для каптчи */}
      {error && <div className={s.formSummaryError}>{error}</div>}
      {/* Eсли  props.error есть покажи див с этой ошибкой*/}
      <div>
        <button className={s.formLogin}>Login</button>
      </div>
      <div className={s.loginFree}>
        <p>Для входа воспользуйтесь </p>
        <p>Email: free@samuraijs.com </p>
        <p> Password: free</p>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  /* Импортируем из библиотеки */ form: "login",
})(LoginForm); /* передаем LoginForm */

const Login = (props) => {
  const onSubmit = (formData) => {
    /* Сюда придут все значения из формы */
    props.login(
      /* Приходит логин из пропсов */
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    ); /* Придут данные из формы */
  };
  if (props.isAuth) {
    /* Если залогинены то отправляет на страницу профайл */
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={style.form}>
      <div className={style.formContainer}>
        <h1 className={style.formTitle}>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        {/* и рисуем LoginReduxForm тут */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  /* Засовываем isAuth */ isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(
  Login
); /* login приходит благодаря конекту */
