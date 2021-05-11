import React from "react";
import { Form } from "../components/login";
import { loginAdmin } from "../redux/actions/loginAdmin";
import { useHistory } from "react-router-dom";
import { setAuth } from "../utils/helpers";
import { ROUTER_ADMIN_DASHBOARD } from "../utils/routes"
import { toast } from "react-toastify";
const LogInAdmin = () => {
  const history = useHistory();
  const handleLogin = (formData) => {
    loginAdmin(formData, (data) => {
      if (data.status === 200) {
        setAuth(data);
        history.push(ROUTER_ADMIN_DASHBOARD);
        toast.success("Login successfully! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Fail! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogInAdmin;
