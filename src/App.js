import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TheLayout } from "./containers";
import LogInAdmin from "./containers/LogInAdmin";
import routes from "./routes";

import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./scss/style.scss";
import "./styles/_main.scss";
// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// const LogInAdmin = React.lazy(() => import("./containers/LogInAdmin"));
// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LogInAdmin} />
          {routes.map((route, idx) => {
            return route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={TheLayout(route.component)}
              />
            )
          })}
        </Switch>
        <ToastContainer/>
      </Router>
      
    );
  }
}

export default App;
