import React, { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getProfile((result) => {
      console.log(result);
      setEmail(result.user.email);
      setName(result.user.name);
      setPhone(result.user.phone);
      setAddress(result.user.address);

      if (result.user.image) {
        console.log(result.user.image);
        setAvatar(result.user.image);
      }
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value);
    if (event.target.name === "phone") setPhone(event.target.value);
    if (event.target.name === "address") setAddress(event.target.value);
  };

  const saveChanges = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    let data = {};
    if (name !== "") {
      data = { ...data, name };
    }
    if (phone !== "") {
      data = { ...data, phone };
    }
    if (address !== "") {
      data = { ...data, address };
    }
    if (avatar !== "") {
      data = { ...data, avatar };
    }
    console.log(data);
    updateProfile(data, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        // setAuth(data.user);
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
                      id="name"
                      name="name"
                      placeholder=""
                      value={name}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Phone number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="phone"
                      name="phone"
                      placeholder=""
                      value={phone}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="address"
                      name="address"
                      placeholder=""
                      value={address}
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
