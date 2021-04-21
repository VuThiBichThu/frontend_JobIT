import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { ROUTER_HOMEPAGE } from "../../../utils/routes";
import { register } from "../../../redux/actions/register";

const Register = () => {
  const role = "iter";
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    fullName: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    const formData = {
      email: form.email,
      password: form.password,
      fullName: form.fullName,
    };
    console.log(formData);
    register(formData, role, (data) => {
      if (data.status === 200) {
        history.push(ROUTER_HOMEPAGE);
      } else {
        alert(data.msg);
      }
    });
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 style={{ fontSize: "40px" }}>Register</h1>
                  <br />
                  <p className="text-muted mb-1">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="fullName"
                      type="text"
                      placeholder="Full name"
                      autoComplete="full-name"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="email"
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={form.password}
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
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <CButton color="success" block onClick={handleRegister}>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>Facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton
                      style={{ backgroundColor: "red", color: "white" }}
                      className="mb-1"
                      block
                    >
                      <span>Google</span>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol
                    xs="12"
                    className="mt-2"
                    style={{ textAlign: "center" }}
                  >
                    <p className="text-muted">
                      {" "}
                      Already have an account? <a href="/login">Login now!</a>
                    </p>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
