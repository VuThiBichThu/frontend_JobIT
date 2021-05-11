import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";
import { ApprovingPost, ApprovedPost } from "./index";

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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CInvalidFeedback,
} from "@coreui/react";
import { toast } from "react-toastify";
import { addPost } from "../../redux/actions/addPost";
// import ReactLoading from "react-loading";
const PostComp = () => {
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
    let date;
    if (event.target.name === "endTime") {
      date = new Date(event.target.value);
      setEndTime(
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    }
    if (event.target.name === "skill") {
      setSkill(event.target.value.split(","));
    }
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
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
    let isValid = true;
    for (var key in post) {
      if (post[key] === "") {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      addPost(post, (data) => {
        if (data.status === 200) {
          setOpen(!isOpen);
          toast.success("create post successfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.reload();
        } else {
          toast.error("fail to create post !", data.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
      setOpen(!isOpen);
    } else {
      toast.error("Please enter the empty input !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  return (
    <>
      <CRow>
        <CModal show={isOpen} onClose={() => setOpen(!isOpen)} color="primary">
          <CModalHeader closeButton>
            <CModalTitle>New post</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              id="post-form"
              action=""
              method="post"
              className="form-horizontal was-validated"
            >
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
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter a title
                  </CInvalidFeedback>
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
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter skills
                  </CInvalidFeedback>
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
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter a salary
                  </CInvalidFeedback>
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
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter an address
                  </CInvalidFeedback>
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
                    required
                  />
                </CCol>
                <CInvalidFeedback className="help-block">
                  Choose end time
                </CInvalidFeedback>
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
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter a description
                  </CInvalidFeedback>
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
                document.getElementById("post-form").reset();
                // window.location.reload();
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
            <CCardBody>
              <CTabs>
                <div style={{ display: "flex" }}>
                  {" "}
                  <CNav variant="tabs" style={{ width: "90%" }}>
                    <CNavItem>
                      <CNavLink>Approving Posts</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Approved Posts</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CButton
                    style={{ marginBottom: "5px" }}
                    color="primary"
                    className="mr-1 right-btn"
                    onClick={() => setOpen(!isOpen)}
                  >
                    <i className="cil-note-add"></i> New Post
                  </CButton>
                </div>

                <CTabContent>
                  <CTabPane>
                    <ApprovingPost />
                  </CTabPane>
                  <CTabPane>
                    <ApprovedPost />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default PostComp;
