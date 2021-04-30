import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";

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
import { addPost } from "../../redux/actions/addPost";
// import ReactLoading from "react-loading";
const CV = () => {
  const [isOpen, setOpen] = useState(false);
  const loading = useSelector((store) => store.addPost.loading);
  const [endTime, setEndTime] = useState("");
  const [skill, setSkill] = useState([]);
  const [form, setForm] = React.useState({
    title: "",
    salary: "",
    address: "",
    description: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value.trim());
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
    console.log(form);
  };

  const handleSubmit = (event) => {
    console.log("create post");
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const post = {
      ...form,
      endTime,
      skill,
    };
    console.log(post);

    addPost(post, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        toast.success("Create Post Successfully !", {
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
    <>
      <CRow>
        <CModal show={isOpen} onClose={() => setOpen(!isOpen)} color="primary">
          <CModalHeader closeButton>
            <CModalTitle>New post</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm action="" method="post" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="title"
                    name="title"
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="skill"
                    name="skill"
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Salary</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="salary"
                    name="salary"
                    placeholder=""
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
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">End time</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="date"
                    id="endTime"
                    name="endTime"
                    placeholder="date"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input" onChange={handleChange}>
                    Description
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="description"
                    id="description"
                    rows="5"
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" disabled={loading} onClick={handleSubmit}>
              Create
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => {
                setOpen(!isOpen);
                window.location.reload();
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
        {/*  */}
      </CRow>
      <CRow>
        <CCol xs="12" className="mb-4">
          <CCard>
            <CCardBody></CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CV;
