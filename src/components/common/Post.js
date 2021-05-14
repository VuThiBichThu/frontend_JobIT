import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
import defaultImage from "../../assets/images/default_image.png";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CFormGroup,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CInput,
  CTextarea,
  CModalFooter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const StyledPost = styled.section`
  .card {
    width: 610px;
    margin: 10px;
  }
  .align {
    margin: 10px;
    margin-top: 5px;
  }
  .margin-top {
    margin-top: 1px;
  }
  .image {
    width: 110px;
    height: 110px;
  }
  .info {
    margin: 0px 10px;
    width: 100%;
  }
  .button {
    background-color: white;
    color: green;
  }
  .ellipsis-text {
    display: inline-block;
    max-width: 300px;
  }
  .notify {
    color: #59a0e6;
    font-weight: lighter;
    font-style: italic;
  }
  .job-title {
    font-size: 20px;
  }
`;

function Post({
  compName,
  title,
  address,
  skill,
  endTime,
  salary,
  image,
  description,
  auth,
  postId,
  compId,
  isApplied,
}) {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  return (
    <StyledPost>
      <CCard accentColor="primary" className="card">
        <CCardHeader>
          <span className="job-title ellipsis-text text-truncate">
            {" "}
            {title}
          </span>
          {isApplied && (
            <div className="card-header-actions">
              <span className=" notify float-right">
                {" "}
                <CIcon name="cil-check" className="mr-2" />
                You applied this job!
              </span>
            </div>
          )}
        </CCardHeader>
        <CCardBody className="flex space-between">
          <div className="image">
            {" "}
            <img
              src={image ? image : defaultImage}
              className="image"
              alt="avatar"
            />
          </div>

          <div className="info">
            <div className="flex space-between align-item">
              <h4 className="text-primary">{compName}</h4>
              <p>
                <i className="cil-location-pin"></i>
                {address}
              </p>
            </div>

            <p>
              <i className="cil-money"></i>
              {getAuth().token ? (
                " " + salary
              ) : (
                <a href="/login" style={{ color: "#9c9595" }}>
                  {" "}
                  Login to view
                </a>
              )}
            </p>
            <p className="ellipsis-text  text-truncate">
              <i className="cil-code"></i>
              {" " + skill}
            </p>

            <div className="flex space-between margin-top">
              <CLink className="text-success" onClick={() => setOpen(!isOpen)}>
                See More
              </CLink>
              <p>
                <i className="cil-history"></i>
                {" " + endTime}
              </p>
            </div>
          </div>
          <CModal
            show={isOpen}
            onClose={() => setOpen(!isOpen)}
            color="primary"
          >
            <CModalHeader closeButton>
              <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Company Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={compName}
                      onChange={() => {}}
                      // disabled="true"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Skills</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={skill}
                      onChange={() => {}}

                      //disabled="true"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Salary</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={salary}
                      onChange={() => {}}

                      // disabled="true"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={address}
                      onChange={() => {}}

                      //disabled="true"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">End time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      value={endTime}
                      onChange={() => {}}

                      //   disabled="true"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      rows="5"
                      value={description}
                      onChange={() => {}}

                      //   disabled="true"
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="success"
                onClick={() => {
                  if (!getAuth().token) {
                    history.push("/login");
                  } else {
                    if (getAuth().role === "iter") {
                      apply(postId, (data) => {
                        if (data.status === 200) {
                          toast.success("Apply successfully !", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        } else {
                          toast.error("Fail to apply! " + data.msg, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        }
                        setOpen(!isOpen);
                      });
                    } else {
                      toast.warn("Only ITer can apply job! ", {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                    }
                  }
                }}
              >
                Apply Now
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
        </CCardBody>
      </CCard>
    </StyledPost>
  );
}

export default Post;
