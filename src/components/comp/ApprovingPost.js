import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../../src/redux/actions/deletePost";
import { getAuth } from "src/utils/helpers";
import { updatePost } from "../../redux/actions/updatePost";
import { technicalSkill } from "../common/constants";
import MultiSelect from "react-multi-select-component";

import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CFormGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CInput,
  CTextarea,
  CModalFooter,
  CInvalidFeedback,
  CTooltip,
  CBadge,
} from "@coreui/react";
import { getPostsComp } from "src/redux/actions/getPostsComp";
import { setPost } from "src/redux/actions/setPost";

const ApprovingPost = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});
  const storePosts = useSelector((state) => state.setPost);
  const loadingDel = useSelector((store) => store.deletePost.loading);
  const loadingUpdate = useSelector((store) => store.updatePost.loading);
  useEffect(() => {
    if (!storePosts.data.length) return;
    setPosts(storePosts.data.filter((post) => post.status === "WAITING"));
  }, [storePosts]);

  const handleChange = (event) => {
    if (event.target.name === "endTime") {
      const date = new Date(event.target.value);
      setUpdatedPost({
        ...updatedPost,
        endTime:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
      });
    } else {
      setUpdatedPost({
        ...updatedPost,
        [event.target.name]: event.target.value,
      });
    }
  };
  const min =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  let count = 1;
  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={["No.", "title", "DueDate", "status", "Actions"]}
              hover
              loading={loadingDel || loadingUpdate}
              striped
              itemsPerPage={posts.length}
              scopedSlots={{
                "No.": (item) => <td>{count++}</td>,
                DueDate: (item) => <td>{item.endTime}</td>,
                status: (item) => (
                  <td>
                    <CBadge
                      style={{
                        padding: "6px 12px 4px",
                        letterSpacing: 2,
                        borderRadius: 16,
                      }}
                      color="info"
                    >
                      PENDING
                    </CBadge>
                  </td>
                ),
                Actions: (item) => (
                  <td>
                    <CTooltip
                      content="view and update"
                      placement="bottom-start"
                    >
                      <i
                        style={{
                          fontSize: 22,
                          padding: 4,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        className="cil-pen"
                        onClick={() => {
                          const currentPost = {
                            id: item._id,
                            title: item.title,
                            skill: item.skill,
                            salary: item.salary,
                            address: item.address,
                            endTime: item.endTime,
                            description: item.description,
                          };

                          const getTime = item.endTime.split("/");
                          if (getTime[0] < 10) getTime[0] = "0" + getTime[0];
                          if (getTime[1] < 10) getTime[1] = "0" + getTime[1];
                          setTime(getTime.reverse().join("-"));

                          const curSkill = [];
                          currentPost.skill.map((skill) =>
                            curSkill.push({
                              label: skill,
                              value: skill,
                            })
                          );
                          setSelected(curSkill);
                          setUpdatedPost(currentPost);
                          setOpen(!isOpen);
                        }}
                      ></i>
                    </CTooltip>{" "}
                    <CTooltip
                      content="delete this post"
                      placement="bottom-start"
                    >
                      <i
                        className="cil-trash"
                        style={{
                          fontSize: 22,
                          padding: 4,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deletePost(item._id, (data) => {
                            if (data.status === 200) {
                              toast.success("Delete post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                              setPosts(
                                posts.filter(
                                  (itemCom) => itemCom._id !== item._id
                                )
                              );
                            } else {
                              toast.error("Fail to delete! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                          });
                        }}
                      ></i>
                    </CTooltip>
                  </td>
                ),
              }}
            />
            <CModal
              show={isOpen}
              onClose={() => setOpen(!isOpen)}
              color="success"
            >
              <CModalHeader closeButton>
                <CModalTitle>{updatedPost.title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm
                  action=""
                  method="post"
                  className="form-horizontal was-validated"
                  id="updateForm"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="title"
                        value={updatedPost.title}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Select Skills</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <MultiSelect
                        options={technicalSkill}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Salary</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="salary"
                        value={updatedPost.salary}
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
                        name="address"
                        value={updatedPost.address}
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
                        name="endTime"
                        type="date"
                        value={time}
                        onChange={handleChange}
                        required
                        min={min}
                      />
                      <CInvalidFeedback className="help-block">
                        Choose end time
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Description</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        rows="5"
                        name="description"
                        value={updatedPost.description}
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
                <CButton
                  color="success"
                  onClick={() => {
                    let isValid = true;
                    for (var key in updatedPost) {
                      if (updatedPost[key] === "") {
                        isValid = false;
                        break;
                      }
                    }
                    if (isValid) {
                      if (!getAuth().token) {
                        history.push("/login");
                      } else {
                        if (getAuth().role === "company") {
                          if (selected) {
                            const selectSkill = [];
                            selected.map((item) =>
                              selectSkill.push(item.value)
                            );
                            updatedPost.skill = selectSkill;
                          }
                          updatePost(updatedPost.id, updatedPost, (data) => {
                            if (data.status === 200) {
                              getPostsComp((item) => {
                                setPost(item.posts);
                              });
                              toast.success("Update post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            } else {
                              toast.error("Fail to update post! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                            setOpen(!isOpen);
                          });
                        }
                      }
                    } else {
                      toast.error("Please enter the empty input !", {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                    }
                  }}
                  disabled={loadingUpdate}
                >
                  Update
                </CButton>{" "}
                <CButton
                  color="secondary"
                  onClick={() => {
                    document.getElementById("updateForm").reset();
                    setOpen(!isOpen);
                  }}
                >
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovingPost;
