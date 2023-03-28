import React, { Component, Suspense } from "react";
import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
/* const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); */
/* Лениво загрузи эту компоненту когда понадобится */
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { initializedApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
/* import { BrowserRouter } from "react-router-dom"; */
import store from "./redux/redux-store";
import { Provider } from "react-redux";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class App extends Component {
  /* ПЕРЕНЕСЛИ ИЗ HEADERCONTAINER  */
  /* 9) Делаем метож жизненного цикла где делаем запрос на API */
  catchAllUnhandleErrors = (reason, promise) => {
    alert("Some error occured");
  };
  componentDidMount() {
    /* 11) */
    this.props.initializedApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandleErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      /* Если не проинициализировались верни прелоадер или всё остальное */
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />{" "}
        {/* 8) Отрисовываем вместо Header 9) потом идем обратно в HeaderContainer */}
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense
            fallback={
              <div>
                <Preloader />
              </div>
            } /* Теперь будет рабоать lazy загрузка fallback говорит что показывать пока не загрузился наш компонент */
          >
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              {/* ЧТОБЫ СТРАНИЦА СРАЗУ ЗАГУЖАЛАСЬ С ПРОФАЙЛ */}
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />{" "}
              {/* Если загрузим не сущ страницу */}
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializedApp })
)(
  App
); /* Делаем коннект и передаем getAuthUserData что передовалось в HeaderContainer 
withRouter чтобы роуты работали нормально
compose добавили ещё это HOC
*/

const MainApp = (props) => {
  return (
    <React.StrictMode>
      <HashRouter basename="/">
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
};

export default MainApp;
