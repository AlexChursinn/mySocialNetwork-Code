import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/icon-256x256.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] =
    useState(false); /* editMode изначально false  */

  /* if(props.profile == null || props.profile) */
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    /* Тут ухватываем этот файл из инпута */
    if (e.target.files.length) {
      /* если длина у файлов есть то передаю во внешний мир это фото */
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    /* Упаковывает данные из формы и отправляет на сервак*/
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
    /* При клике вернем false  и отобразится наши данные */
  };

  return (
    <div>
      {/*       <div className={s.profileImage}>
        <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      </div> */}
      <div className={s.descriptionBlock}>
        <div>
          <img
            src={profile.photos.large || userPhoto}
            className={s.mainPhoto}
          />{" "}
          {/* Если нет фото из API то наше фото (фото API или наше фото) */}
          {isOwner && (
            <div className={s.choosePhoto}>
              <input
                type={"file"}
                onChange={
                  onMainPhotoSelected
                } /* Когда будет выбран файл сработает onChange */
              />
            </div>
          )}
        </div>
        <div className={s.edit}>
          {editMode ? (
            <ProfileDataForm
              initialValues={
                profile
              } /* теперь в edit будут подгружаться наши строки */
              onSubmit={onSubmit}
              profile={profile}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }} /* setEditMode превратить в true */
            />
          )}{" "}
          {/* Если режим редоктирования покажи ProfileDataForm а если нет то ProfileData */}
          {/* Вынесли в отдельную компоненту наш профиль */}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button className={s.contactBtn} onClick={goToEditMode}>
            Edit profile
          </button>
        </div>
      )}{" "}
      {/* Если не isOwner то есть кнопка чтобы можно было отредактировать */}
      <div>
        <b>Full name</b>: {profile.fullName} {/*Отобразим Имя*/}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}{" "}
        {/* Если у нас в profile.lookingForAJob true тогда yes если false тогда no */}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}{" "}
          {/* То что в lookingForAJobDescription написано*/}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}{" "}
        {/* Просто отображаем текст который приходит*/}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}{" "}
        {/* Берем контактов Object.keys так как объект засовываем ключи которые нужны
    .map(key => {}) на базе каждого ключа хотим отрисовать компоненту Contact*/}
      </div>
    </div>
  );
};

/* Создали отдельную компоненту так как значения повторяются */
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
