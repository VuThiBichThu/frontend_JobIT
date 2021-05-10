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

const RegisterComp = () => {
  const role = "company";
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    compName: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
      name: form.compName,
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
                      name="compName"
                      type="text"
                      placeholder="Company name"
                      autoComplete="comp-name"
                      value={form.compName}
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
                  <CCol xs="12" style={{ textAlign: "center" }}>
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

export default RegisterComp;
