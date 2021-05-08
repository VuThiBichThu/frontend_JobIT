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
import axios from "axios";
import { getSignature } from "src/redux/actions/getSignature";
import { updateCV } from "src/redux/actions/updateCV";

const StyledCV = styled.div`
  .layout-cv {
    .cv-header {
      align-items: center;
      background: #5b9cd6;
      padding: 20px 0px;
      margin-bottom: 20px;
    }
    .cv-header-info {
      padding: 10px 100px;
      line-height: 30px;
      color: white;
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

const CV = () => {
  const [isOpen, setOpen] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isCV, setIsCV] = useState(false);
  const loading = useSelector((store) => store.getITerCV.loading);
  const [cv, setCV] = useState({});
  const [image, setImage] = useState("");

  const [form, setForm] = React.useState({
    name: "",
    birthday: "",
    email: "",
    experience: "",
    skill: "",
    softSkill: "",
    description: "",
  });

  useEffect(() => {
    getITerCV((result) => {
      if (result.cv) {
        setIsCV(true);
        setCV(result.cv);
        setForm({
          ...form,
          name: result.cv.name,
          birthday: result.cv.birthday,
          email: result.cv.email,
          experience: result.cv.experience,
          skill: result.cv.skill,
          softSkill: result.cv.softSkill,
          description: result.cv.description,
        });
        setImage(result.cv.image);
        setAvatar(result.cv.image);
      }
    });
    // getProfile((result) => {
    //   setForm({ ...form, email: result.user.email, name: result.user.name });
    // });
  }, []);

  const techSkill = cv.skill ? cv.skill.split(",") : [];

  const softSkill = cv.softSkill ? cv.softSkill.split(",") : [];

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
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
      image,
    };
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

  // upload image

  const [avatar, setAvatar] = useState("/avatars/avatar.png");

  const [file, setFile] = useState(null);

  const [object, setObject] = useState({ signature: "", timestamp: "" });

  useEffect(() => {
    if (object.signature === "" && object.timestamp === "") return;
    if (!file) return;
    const formData = new FormData();
    // Update the formData object
    formData.append("file", file, file.name);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/do-an-cnpm/image/upload?api_key=484176915684615&timestamp=${object.timestamp}&signature=${object.signature}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setImage(response.data.url);
      });
  }, [object, file]);

  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
    getSignature((data) => {
      if (data.status === 200) {
        setObject({
          ...object,
          signature: data.payload.signature,
          timestamp: data.payload.timestamp,
        });
      } else {
        alert(data.msg);
      }
    });
  };

  const handleFile = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  // update
  const handleUpdate = (event) => {
    console.log("update cv");
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const cv = {
      ...form,
      image,
    };
    updateCV(cv, (data) => {
      if (data.status === 200) {
        toast.success("Update CV Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        window.location.reload();
      } else {
        alert(data.msg);
      }
    });
    setUpdate(!isUpdate);
  };
  return (
    <StyledCV>
      {isCV ? (
        <CRow className="mt-4" style={{ alignItems: "center" }}>
          <CCol md="2"></CCol>
          <CCol xs="12" className="mb-4" md="8">
            <CCard>
              <CCardBody>
                <div className="layout-cv">
                  <CForm action="" method="cv" className="form-horizontal">
                    <CRow xs="12" md="12" className="cv-header">
                      <CCol md="3">
                        <img
                          src={cv.image}
                          alt="avatar"
                          width=" 200px"
                          height="200px"
                          style={{ borderRadius: "50%" }}
                        ></img>
                      </CCol>
                      <CCol md="9" className="cv-header-info">
                        <div style={{ fontSize: "50px" }}>{cv.name}</div>
                        <br></br>
                        Birthday:
                        <div>{cv.birthday}</div>
                        <CLabel htmlFor="date-input">Email:</CLabel>
                        <div>{cv.email}</div>
                      </CCol>
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
                      style={{ background: "#5B9CD6", height: "30px" }}
                    ></CFormGroup>
                  </CForm>
                </div>
              </CCardBody>
            </CCard>
            <div style={{ textAlign: "center" }}>
              <CButton
                color="primary"
                disabled={loading}
                onClick={() => setUpdate(!isUpdate)}
              >
                Update CV
              </CButton>{" "}
            </div>
          </CCol>
          <CCol md="2"></CCol>
        </CRow>
      ) : (
        <CRow style={{ alignItems: "center" }}>
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
            <CRow xs="12" md="12">
              <CCol md="4">
                <img
                  src={avatar}
                  alt="avatar"
                  width=" 150px"
                  height="150px"
                  style={{ border: "1px solid black" }}
                ></img>
                <input
                  className="file-upload"
                  type="file"
                  onChange={handleFile}
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                />
              </CCol>
              <CCol md="8">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="name"
                      defaultValue={form.name}
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
                      name="birthday"
                      type="date"
                      defaultValue={form.birthday}
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
                      name="email"
                      type="text"
                      defaultValue={form.email}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow xs="12" md="12" className="mb-2">
              <CCol md="4" style={{ textAlign: "center" }}>
                <CButton
                  style={{ textAlign: "center", marginLeft: "15px" }}
                  color="primary"
                  onClick={handleClick}
                >
                  Choose avatar
                </CButton>
              </CCol>
              <CCol md="8"></CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Experiences</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  rows="5"
                  name="experience"
                  defaultValue={form.experience}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Technical skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  name="skill"
                  defaultValue={form.skill}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Soft skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="softSkill"
                  rows="5"
                  defaultValue={form.softSkill}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="description"
                  rows="5"
                  placeholder=""
                  defaultValue={form.description}
                  onChange={handleChange}
                />
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

      <CModal
        show={isUpdate}
        onClose={() => setUpdate(!isUpdate)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>Your CV</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="cv" className="form-horizontal">
            <CRow xs="12" md="12">
              <CCol md="4">
                <img
                  src={avatar}
                  alt="avatar"
                  width=" 150px"
                  height="150px"
                  style={{ border: "1px solid black" }}
                ></img>
                <input
                  className="file-upload"
                  type="file"
                  onChange={handleFile}
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                />
              </CCol>
              <CCol md="8">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="name"
                      defaultValue={cv.iterName}
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
                      name="birthday"
                      type="date"
                      defaultValue={cv.birthday}
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
                      name="email"
                      type="text"
                      defaultValue={cv.email}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow xs="12" md="12" className="mb-2">
              <CCol md="4" style={{ textAlign: "center" }}>
                <CButton
                  style={{ textAlign: "center", marginLeft: "15px" }}
                  color="primary"
                  onClick={handleClick}
                >
                  Choose image
                </CButton>
              </CCol>
              <CCol md="8"></CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Experiences</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  rows="5"
                  name="experience"
                  defaultValue={cv.experience}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Technical skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  name="skill"
                  defaultValue={cv.skill}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Soft skills</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="softSkill"
                  rows="5"
                  defaultValue={cv.softSkill}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="description"
                  rows="5"
                  placeholder=""
                  defaultValue={cv.description}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleUpdate}>
            Update
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => {
              setUpdate(!isUpdate);
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
