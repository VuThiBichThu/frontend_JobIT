import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TheLayout } from "./containers";
import LogInAdmin from "./containers/LogInAdmin";
import HomeITer from "./containers/iter/HomeITer";

import Login from "../src/components/login/Login";
import Register from "../src/components/register/Register";

import routes from "./routes";
import { getAuth } from "../src/utils/helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./scss/style.scss";
import "./styles/_main.scss";

import { ROUTER_ADMIN } from "./utils/routes";
// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// const LogInAdmin = React.lazy(() => import("./containers/LogInAdmin"));
// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  //   const storeLogin = useSelector((store) => store.login);
  // console.log(storeLogin);
  const auth = getAuth();
  console.log(auth.role);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TheLayout(HomeITer)} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

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
