import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";

import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CCard,
  CCardBody,
} from "@coreui/react";
import { toast } from "react-toastify";
import { getProfile } from "../../redux/actions/getProfile";
import { updateProfile } from "../../redux/actions/updateProfile";
// import ReactLoading from "react-loading";
const Profile = () => {
  const [isOpen, setOpen] = useState(false);
  // const loading = useSelector((store) => store.getProfile.loading);
  const [avatar, setAvatar] = useState("/avatars/avatar.png");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const role = "iters";
  useEffect(() => {
    getProfile(role, (result) => {
      console.log(result);
      setEmail(result.user.email);
      setFullName(result.user.fullName);
      if (result.user.image) {
        console.log(result.user.image);
        setAvatar(result.user.image);
        console.log(avatar);
      }
    });
  }, [role]);

  const handleChange = (event) => {
    setFullName(event.target.value);
  };

  const saveChanges = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const data = {
      fullName,
    };
    updateProfile(data, role, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        toast.success("Update successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        window.location.reload();
      } else {
        alert(data.msg);
      }
    });
  };
  return (
    <>
      <CRow className="mt-4">
        <CCol xs="12" className="mb-4" md="3">
          <CCard>
            <CCardBody style={{ display: "flex", flexDirection: "column" }}>
              <img src={avatar} className="image" alt="avatar" />
              <CButton
                style={{ marginBottom: "5px", marginTop: "10px" }}
                color="primary"
                onClick={() => setOpen(!isOpen)}
              >
                Upload avatar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" className="mb-4" md="9">
          <CCard>
            <CCardBody>
              <CForm
                action=""
                method="post"
                className="form-horizontal"
                style={{ width: "50%" }}
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Full name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="fullName"
                      name="fullName"
                      placeholder=""
                      value={fullName}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="email"
                      name="email"
                      placeholder=""
                      value={email}
                      disabled={true}
                    />
                  </CCol>
                </CFormGroup>
                <CButton color="success" onClick={saveChanges}>
                  Save changes
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
