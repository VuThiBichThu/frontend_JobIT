import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import LoadingOverlay from "react-loading-overlay";
// import ReactLoading from "react-loading";

import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
  CCard,
  CCardBody,
} from "@coreui/react";

import { toast } from "react-toastify";
import { getITerCV } from "src/redux/actions/getITerCV";
import { createCV } from "src/redux/actions/createCV";
import { getAuth } from "src/utils/helpers";

const StyledCV = styled.section``;
const CV = () => {
  const [isOpen, setOpen] = useState(false);
  const [isCV, setIsCV] = useState(false);
  const loading = useSelector((store) => store.getITerCV.loading);
  const [form, setForm] = React.useState({
    name: "",
    birthday: "",
    email: "",
    experience: "",
    skill: "",
    softSkill: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    getITerCV((result) => {
      console.log(result);
      if (result.cv) {
        setIsCV(true);
      }
    });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value.trim());
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
    console.log(form);
  };

  const handleSubmit = (event) => {
    console.log("create cv");
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const cv = {
      ...form,
    };
    console.log(cv);

    createCV(cv, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        toast.success("Create CV Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        window.location.reload();
      } else {
        alert(data.msg);
      }
    });
    setOpen(!isOpen);
  };
  return (
    <StyledCV>
      {isCV ? (
        <CRow>
          <CCol xs="12" className="mb-4">
            <CCard>
              <CCardBody>
                <div>CV here</div>
                <CButton
                  color="primary"
                  disabled={loading}
                  onClick={() => setOpen(!isOpen)}
                >
                  Update CV
                </CButton>{" "}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <CRow>
          <CCol xs="12" className="mb-4">
            <CCard>
              <CCardBody>
                <div>No CV</div>
                <CButton
                  color="primary"
                  disabled={loading}
                  onClick={() => setOpen(!isOpen)}
                >
                  Create CV
                </CButton>{" "}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      <CModal show={isOpen} onClose={() => setOpen(!isOpen)} color="primary">
        <CModalHeader closeButton>
          <CModalTitle>Your CV</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="cv" className="form-horizontal">
            <CRow>
              <CCol md="3">
                <img
                  src={getAuth().image}
                  alt="this is avatar"
                  width=" 100px"
                ></img>
              </CCol>
              <CCol>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      defaultValue={getAuth().name}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Birthday</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      defaultValue=""
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      defaultValue=""
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Experience</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput defaultValue="" onChange={handleChange} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Technical skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput defaultValue="" onChange={handleChange} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Soft skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea rows="5" defaultValue="" onChange={handleChange} />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea rows="5" placeholder="" onChange={handleChange} />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleSubmit}>
            Create
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </StyledCV>
  );
};

export default CV;
