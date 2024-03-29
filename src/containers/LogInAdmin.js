import React from "react";
import { Form } from "../components/login";
import { loginAdmin } from "../redux/actions/loginAdmin";
import { useHistory } from "react-router-dom";
import { setAuth } from "../utils/helpers";
import { ROUTER_ADMIN_DASHBOARD } from "../utils/routes";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from "@coreui/react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const LogInAdmin = () => {
  const history = useHistory();
  const loading = useSelector((store) => store.loginAdmin.loading);

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

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <CHeader style={{ background: "#1c1d26" }}>
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>
              <img src={logo} alt="" width="50px"></img>
            </CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
      </CHeader>
      <Form handleSubmit={handleLogin} />
    </LoadingOverlay>
  );
};

export default LogInAdmin;
