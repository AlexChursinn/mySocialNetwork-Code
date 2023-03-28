import React, { useEffect, useState } from "react";
import s from "./ProfileStatus.module.css";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] =
    useState(
      false
    ); /* тоже самое в одну строчку useState создаёт массив в которую переходят editMode и  setEditMode*/

  let [status, setStatus] = useState(
    props.status
  ); /* тоже самое в одну строчку useState создаёт массив в которую переходят editMode и  setEditMode
  До этого всё было записано в один локльный state но хуки говорят нам делить все эти методы
  */

  useEffect(() => {
    /* useEffect говорит засуньте в меня функцию которую я выполню когда произодёт отрисовка */
    setStatus(
      props.status
    ); /* Засихранизирует те данные которые пришли к нам из пропсов */
  }, [
    props.status,
  ]); /* Говорим useEffect чтобы он отрсовывал только когда у нас компонента вмонтировалась и useEffect выполнится всего один раз 
  но казидывать пустой массив не правильно 
  props.status мы используемся всегда когда меняется props.status
  Получается если пропс статус будет не таким как был раньше пожалуйста запусти эффкет ( некая синхронизация состояния)
  */

  const activateEditMode = () => {
    setEditMode(
      true
    ); /* функция которая меняет это значения на противоположное добл клик и меняет на импут*/
  };

  const deactivateEditMode = () => {
    setEditMode(
      false
    ); /* функция которая меняет это значения на противоположное при уходе из интупа и меняет на текст*/

    /* Колбек обнвоить статус  */
    props.updateStatus(status); /*
    можно реф повесить на импут но так не хорошо status то что приходит из пропсов*/
  };

  const onStatusChange = (e) => {
    /* С помощью e узнаем какое новое значение value  и засовываем в state*/
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode /* Если editMode true то это выражение */ && (
        <div>
          {" "}
          <b>Status: </b>
          <span onDoubleClick={activateEditMode}>
            {props.status || "-----"}{" "}
            {/* Покажется статус или если нет его то ----- */}
          </span>
        </div>
      )}
      {editMode /* Если editMode false то это выражение */ && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            /* из стейта показываем статус 
            если value зафиксированно надо обязхательно вешать onChange*/
          ></input>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;

/* Сейчас приходят одинаковые пропсы в статус и импут но мы должны при клике убирать в оном месте но осталять в другом 

Используем локальный стейт 
Для локальных вещей компонент которым только нужен этот локальный стейт так делать можно

onBlur срабатывает когда фокус из элемента выходит
autoFocus={true} фокус на эелемента становится атоматически
*/
