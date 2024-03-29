import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getPostsComp } from "../../../src/redux/actions/getPostsComp";
import { deletePost } from "../../../src/redux/actions/deletePost";
import { completePost } from "../../../src/redux/actions/completePost";
import { setPost } from "src/redux/actions/setPost";

import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CLink,
  CFormGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CModalFooter,
  CTooltip,
} from "@coreui/react";

const StyleLabel = styled.section`
  .label {
    font-weight: 800;
    color: #f25430;
  }
`;

const ApprovedPost = () => {
  const [isOpen, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const storePosts = useSelector((state) => state.setPost);
  const loadingDel = useSelector((store) => store.deletePost.loading);
  const loadingComplete = useSelector((store) => store.completePost.loading);
  const loadingPost = useSelector((store) => store.getPostsComp.loading);

  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    if (!storePosts.data.length) return;
    setPosts(storePosts.data.filter((post) => post.status === "ACCEPTED"));
  }, [storePosts]);

  posts.map((item) => {
    const getTime = item.endTime.split("/");
    if (getTime[0] < 10) getTime[0] = "0" + getTime[0];
    if (getTime[1] < 10) getTime[1] = "0" + getTime[1];
    return (item.endTime = getTime.reverse().join("-"));
  });

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={["_id", "title", "Actions", "ListApplications"]}
              hover
              loading={loadingPost || loadingDel || loadingComplete}
              striped
              itemsPerPage={posts.length}
              scopedSlots={{
                Actions: (item) => (
                  <td>
                    <CTooltip
                      content="complete this post"
                      placement="bottom-start"
                    >
                      <CButton
                        color="success"
                        onClick={() => {
                          completePost(item._id, (data) => {
                            if (data.status === 200) {
                              getPostsComp((item) => {
                                setPost(item.posts);
                              });
                              toast.success("Complete post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            } else {
                              toast.error("Fail to complete! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                          });
                        }}
                      >
                        <i className="cil-check-circle"></i>
                      </CButton>
                    </CTooltip>{" "}
                    <CTooltip content="view details" placement="bottom-start">
                      <CButton
                        color="info"
                        onClick={() => {
                          const curPost = {
                            id: item._id,
                            title: item.title,
                            skill: item.skill.join(", "),
                            salary: item.salary,
                            address: item.address,
                            endTime: item.endTime,
                            description: item.description,
                          };

                          setCurrentPost(curPost);
                          setOpen(!isOpen);
                        }}
                      >
                        <i className="cil-clipboard"></i>
                      </CButton>
                    </CTooltip>{" "}
                    <CTooltip
                      content="delete this post"
                      placement="bottom-start"
                    >
                      <CButton
                        color="danger"
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
                      >
                        <i className="cil-trash"></i>
                      </CButton>
                    </CTooltip>
                  </td>
                ),
                ListApplications: (item) => (
                  <td>
                    <CLink
                      to={`/post/appliers/${item._id}`}
                      target="_blank"
                      params={{ id: item._id }}
                    >
                      <span className="text--primary text--underline">
                        {" "}
                        Details{" "}
                      </span>
                    </CLink>
                  </td>
                ),
              }}
            />

            <CModal show={isOpen} onClose={() => setOpen(!isOpen)}>
              <CModalHeader closeButton className="btn--primary">
                <CModalTitle>{currentPost.title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <StyleLabel>
                  <CForm className="form-horizontal">
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Skills</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span>{currentPost.skill}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Salary</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span>{currentPost.salary}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Address</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span> {currentPost.address}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">End time</CLabel>
                      </CCol>
                      <CCol>
                        <span> {currentPost.endTime}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Description</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span>{currentPost.description}</span>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </StyleLabel>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovedPost;
