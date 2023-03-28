import React from "react";
import s from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status:
      this.props
        .status /* Статус приходит из пропсов и отображает на странице */,
  };

  activateEditMode = () => {
    /* В него передаем объект который перезапишет свойства которые были в state  он меняет запрос потом а не сразу*/
    this.setState({
      editMode: true,
    });
    /*  this.state.editMode = true; Перерисует наш state но лучше избигать */
    /* this.forceUpdate(); */
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status); /* Колбек обнвоить статус 
    можно реф повесить на импут но так не хорошо this.state.status то что приходит из пропсов*/
  };

  onStatusChange = (e) => {
    /* С помощью e узнаем какое новое значение value  и засовываем в state*/
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    /* setState надо тут вызвать если есть условие иначе будет зацикленность и всё ляжет 
  Если старый пропс статсу не равен статусу новых пропсов 
  */
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode /* Если editMode true то это выражение */ && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "-----"}{" "}
              {/* Покажется статус или если нет его то ----- */}
            </span>
          </div>
        )}
        {this.state.editMode /* Если editMode false то это выражение */ && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status} /* из стейта показываем статус 
              если value зафиксированно надо обязхательно вешать onChange*/
            ></input>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;

/* Сейчас приходят одинаковые пропсы в статус и импут но мы должны при клике убирать в оном месте но осталять в другом 

Используем локальный стейт 
Для локальных вещей компонент которым только нужен этот локальный стейт так делать можно

onBlur срабатывает когда фокус из элемента выходит
autoFocus={true} фокус на эелемента становится атоматически
*/
