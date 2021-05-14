import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { login } from "../../../redux/actions/login";
import { ROUTER_HOMEPAGE } from "../../../utils/routes";
import { getAuth, setAuth } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setInfo } from "src/redux/actions/setInfo";

const Login = () => {
  const history = useHistory();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };
  const info = useSelector((state) => state.setInfo);
  const handleLogin = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    const formData = {
      email: form.email,
      password: form.password,
    };
    console.log(formData);
    login(formData, (result) => {
      if (result.status === 200) {
        let image = getAuth().image;
        if (!result.image) {
          image =
            "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
        } else {
          image = result.image;
        }
        const data = {
          image: image,
          role: result.role,
          name: result.name,
          token: result.token,
          userId: result.userId
        };
        setInfo({ name: result.name, image: image });
        setAuth(data);
        history.push(ROUTER_HOMEPAGE);
        toast.success("Login successfully! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Fail! " + result.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 style={{ fontSize: "50px" }}>Login</h1>
                    <br />
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                          disabled={!form.email || !form.password}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center mt-4">
                  <div>
                    <p style={{ paddingBottom: "12px" }}>
                      Sign up now to access your account on ITJobs for applying
                      faster!
                    </p>
                    <Link to="/register">
                      <CButton
                        style={{ backgroundColor: "white", color: "#321fdb" }}
                        className="mt-2 mb-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                  <div>
                    <span>______________or______________</span>

                    <Link to="/register-company">
                      <p style={{ paddingBottom: "12px", color: "white" }}>
                        Sign up for recruitment!
                      </p>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
