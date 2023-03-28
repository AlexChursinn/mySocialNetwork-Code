import React from "react";
import { addMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    /* Теперь не нужен */
    /*     updateNewMessageBody: (text) => {
      dispatch(updateNewMessageTextActionCreator(text));
    }, */
    sendMessage: (newMessageText) => {
      /* Принимает теперь newMessageText */
      dispatch(
        addMessageActionCreator(newMessageText)
      ); /* Дальше передаем в AC и в dialogs-reducer принимает теперь дальше */
    },
  };
};

/*  
let AuthRedirectComponent = (props) => {
  /* Создаем HOC */
/* можно так даже лучше */
/*     if (!this.props.isAuth 
  if (this.props.isAuth === false)
    return (
      <Navigate to={"/login"} />
    ); /* Если не залогинены редирект на логин <Redirect to={"/login"} /> такая запись ыбла раньше 

  return <Dialogs {...props} />;
};
 */

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(
  Dialogs
); /* Dialogs закидываем в  withAuthRedirect и потом этот реузльтата в connect*/
