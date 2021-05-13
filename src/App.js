import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TheLayout } from "./containers";
import LogInAdmin from "./containers/LogInAdmin";

import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./scss/style.scss";
import "./styles/_main.scss";

import { ROUTER_ADMIN } from "./utils/routes";
import ForgotPassword from "./components/pages/ForgotPassword";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import HomePage from "./containers/HomePage";
import RegisterComp from "./components/pages/register/RegisterComp";
import ITCompanies from "./containers/ITCompanies";
import AboutUs from "./containers/AboutUs";
// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// const LogInAdmin = React.lazy(() => import("./containers/LogInAdmin"));
// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TheLayout(HomePage)} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register-company" exact component={RegisterComp} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/it-companies" exact component={TheLayout(ITCompanies)} />
        <Route path="/about-us" exact component={TheLayout(AboutUs)} />


        <Route path={ROUTER_ADMIN} component={LogInAdmin} exact />
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={TheLayout(route.component)}
              />
            )
          );
        })}

        {/* <Route path="/" exact component={HomeComp} /> */}
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
