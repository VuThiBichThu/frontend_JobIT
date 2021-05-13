import React, { useState, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CFormGroup,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CModalFooter,
} from "@coreui/react";

import { getAppliers } from "../../redux/actions/getAppliers";
import { getCV } from "../../redux/actions/getCV";
import styled from "styled-components";

const StyledCV = styled.div`
  .layout-cv {
    .cv-header {
      align-items: center;
      background: #5b9cd6;
      padding: 20px 150px;
      padding-right: 0px;
      color: white;
      line-height: 30px;
    }

    .label {
      font-weight: bold;
      font-size: 30px;
      margin-top: 10px;
    }
    .ul-list {
      list-style-type: circle;
      padding-left: 30px;
    }
  }
`;
const Applier = ({ match }) => {
  const [appliers, setAppliers] = useState([]);
  const [cv, setCV] = useState({});
  const [title, setTitle] = useState("");
  const [isOpen, setOpen] = useState(false);

  const id = match.params.id;

  useEffect(() => {
    getAppliers(id, (result) => {
      setAppliers(result.applies);
      setTitle(result.title);
    });
  }, [id]);

  const techSkill = cv.skill ? cv.skill.split(",") : [];

  const softSkill = cv.softSkill ? cv.softSkill.split(",") : [];

  const handleGetCV = (cvId) => {
    console.log("get CV");
    //event.preventDefault();

    getCV(cvId, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);

        setCV(data.cv);
        cv.skill.join(" ,");
      } else {
        alert(data.msg);
      }
    });
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <p>Post ID: {match.params.id}</p>

            <span>Post title: {title}</span>
          </CCardHeader>
          <CCardBody>
            <div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Applied Date</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {appliers &&
                    appliers.map((applier) => {
                      let temp= new Date(applier.timeApply);
                      applier.timeApply= 
                      ("0" + temp.getDate()).slice(-2) +
                      "/" +
                      ("0" + (temp.getMonth() + 1)).slice(-2) +
                      "/" +
                      temp.getFullYear();
                      return (
                        <tr key={applier._id}>
                          <td>{applier.name}</td>
                          <td>{applier.email}</td>
                          <td>{applier.timeApply}</td>
                          <td>
                            <CButton
                              color="success"
                              onClick={() => {
                                handleGetCV(applier.cvId);
                              }}
                            >
                              <i className="cil-description"></i>
                            </CButton>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <CModal
                show={isOpen}
                onClose={() => setOpen(!isOpen)}
                color="info"
              >
                <CModalHeader closeButton>
                  <CModalTitle>{cv.iterId}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <StyledCV>
                    <div className="layout-cv">
                      <CForm action="" method="cv" className="form-horizontal">
                        <CRow xs="1" md="1" className="cv-header">
                          <img
                            src={cv.image}
                            alt="avatar"
                            width=" 200px"
                            height="200px"
                            style={{ borderRadius: "50%" }}
                          ></img>
                        </CRow>

                        <CRow xs="4" md="1" className="cv-header">
                          <div>
                            <div style={{ fontSize: "30px" }}>{cv.name}</div>
                            <div>Birthday: {cv.birthday}</div>

                            <div>Email: {cv.email}</div>
                          </div>
                        </CRow>

                        <CFormGroup row>
                          <CCol>
                            <CLabel className="label">Experiences</CLabel>
                          </CCol>
                        </CFormGroup>
                        <hr></hr>
                        <CFormGroup row>
                          <CCol>
                            <span>{cv.experience}</span>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CLabel className="label">Technical Skills</CLabel>
                          </CCol>
                        </CFormGroup>
                        <hr></hr>
                        <CFormGroup row>
                          <CCol>
                            <ul className="ul-list">
                              {techSkill.map((item) => (
                                <li>{item}</li>
                              ))}
                            </ul>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CLabel className="label">Soft Skills</CLabel>
                          </CCol>
                        </CFormGroup>
                        <hr></hr>
                        <CFormGroup row>
                          <CCol>
                            <ul className="ul-list">
                              {softSkill.map((item) => (
                                <li>{item}</li>
                              ))}
                            </ul>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CLabel className="label">Descriptions</CLabel>
                          </CCol>
                          <hr></hr>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <span>{cv.description}</span>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup
                          row
                          style={{
                            background: "#5B9CD6",
                            height: "30px",
                          }}
                        ></CFormGroup>
                      </CForm>
                    </div>
                  </StyledCV>
                </CModalBody>
                <CModalFooter>
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
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Applier;
