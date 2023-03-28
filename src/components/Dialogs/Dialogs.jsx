import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/Preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const maxLength10 = maxLengthCreator(30);

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  let dialogsElemenets = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  /*   let newMessageText = state.newMessageText;

  let addMessage = () => {
    props.sendMessage();
  };  не нужен больше*/

  /*   let onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageBody(text);
  };  больше не нужен*/

  let addNewMessage = (values) => {
    /* функция которая принимает value и его теперь надо отправить в бизнес
    и теперь в DialogsContainer будет принимать newMessageText
    */
    props.sendMessage(values.newMessageText);
  };

  if (props.isAuth === false)
    return (
      <Navigate to={"/login"} />
    ); /* Если не залогинены редирект на логин <Redirect to={"/login"} /> такая запись ыбла раньше */

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElemenets}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />{" "}
        {/* И отрисовываем AddMessageFormRedux  и когда он засамбитица вызывает функцию */}
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {" "}
      {/* тут собирается все данные из формы чтобы передать их */}
      <div>
        <Field
          component={Textarea}
          name="newMessageText"
          placeholder="Enter your message"
          validate={[
            required,
            maxLength10,
          ]} /* Из документации запись если валидцая то какие функции и параметры там нужны */
        />
      </div>
      <div>
        <button>Send message</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
); /* form: "dialogAddMessageForm" название даём сами и какую функцию надо обернуть AddMessageForm*/

export default Dialogs;
