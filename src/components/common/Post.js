import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
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

const StyledPost = styled.section`
  .card {
    width: 530px;
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
}) {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);

  return (
    <StyledPost>
      <CCard accentColor="primary" className="card">
        <CCardHeader>{title}</CCardHeader>
        <CCardBody className="flex space-between">
          <div className="image">
            {" "}
            <img src={image} className="image" alt="avatar" />
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
              {" " + salary}
            </p>
            <p>
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
                      defaultValue={compName}
                      // disabled="true"
                    />
                    {/* <CFormText></CFormText> */}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Skills</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      defaultValue={skill}
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
                      defaultValue={salary}
                      // disabled="true"
                    />
                    {/* <CFormText></CFormText> */}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      defaultValue={address}
                      //disabled="true"
                    />
                    {/* <CFormText></CFormText> */}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">End time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      defaultValue={endTime}
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
                      placeholder={description}
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
