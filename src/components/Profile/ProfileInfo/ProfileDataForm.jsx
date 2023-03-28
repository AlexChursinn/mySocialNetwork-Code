import React from "react";
import { reduxForm } from "redux-form";
import s from "./ProfileInfo.module.css";
import {
  createField,
  Input,
  Textarea,
} from "../../common/Preloader/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      {/* Eсли  props.error есть покажи див с этой ошибкой*/}
      {/* Если не isOwner то есть кнопка чтобы можно было отредактировать */}
      <div>
        <b>Full name</b>: {createField("Full name", "fullName", [], Input)}{" "}
        {/*Отобразим Имя*/}
      </div>
      <div>
        <b>Looking for a job</b>:
        {createField("", "lookingForAJob", [], Input, "checkbox")}
        {/* Если у нас в profile.lookingForAJob true тогда yes если false тогда no */}
      </div>
      <div>
        <b>My professional skills</b>:
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
        {/* То что в lookingForAJobDescription написано*/}
      </div>
      <div>
        <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
        {/* Просто отображаем текст который приходит*/}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>
                {key}: {createField(key, "contacts." + key, [], Input)}
              </b>
            </div>
          );
        })}{" "}
      </div>
      {/* Берем контактов Object.keys так как объект засовываем ключи которые нужны
    .map(key => {}) на базе каждого ключа хотим отрисовать компоненту Contact*/}
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({
  form: "edit-profile",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
