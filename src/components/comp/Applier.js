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
  CInput,
  CTextarea,
  CModalFooter,
} from "@coreui/react";

import { getAppliers } from "../../redux/actions/getAppliers";
import { getCV } from "../../redux/actions/getCV";

const ITer = ({ match }) => {
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
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {appliers &&
                    appliers.map((applier) => {
                      return (
                        <tr key={applier._id}>
                          <td>{applier.name}</td>
                          <td>{applier.email}</td>
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
                color="primary"
              >
                <CModalHeader closeButton>
                  <CModalTitle>{cv.iterId}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm action="" method="post" className="form-horizontal">
                    <CRow>
                      <CCol md="3">
                        <img
                          src={cv.image}
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
                              defaultValue={cv.name}
                              disabled={true}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Birthday</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              defaultValue={cv.birthday}
                              disabled={true}
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
                              defaultValue={cv.email}
                              disabled={true}
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    {/* <CFormGroup row>
                     
                    </CFormGroup> */}

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Experience</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput defaultValue={cv.experience} disabled={true} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Technical skills</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput defaultValue={cv.skill} disabled={true} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Soft skills</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTextarea
                          rows="5"
                          defaultValue={cv.personalSkill}
                          disabled={true}
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
                          placeholder={cv.description}
                          disabled={true}
                        />
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  {/* <CButton
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
                  </CButton>{" "} */}
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

export default ITer;
