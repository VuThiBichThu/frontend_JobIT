import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPostsComp } from "../../../src/redux/actions/getPostsComp";
import { deletePost } from "../../../src/redux/actions/deletePost";
import styled from "styled-components";

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
  CInput,
  CTextarea,
  CModalFooter,
  CTooltip,
} from "@coreui/react";

const StyleLabel = styled.section`
  .label {
    font-weight: 800;
    color: #321fdb;
  }
`;

const ExpiredPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getPostsComp((item) => {
      setPosts(item.posts.filter((post) => post.status === "DONE"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  posts.map((item) => {
    const getTime = item.endTime.split("/");
    if (getTime[0] < 10) getTime[0] = "0" + getTime[0];
    if (getTime[1] < 10) getTime[1] = "0" + getTime[1];
    item.endTime = getTime.reverse().join("-");
  });

  const [currentPost, setCurrentPost] = useState({});

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={["_id", "title", "Actions", "ListApplications"]}
              hover
              loading={loadingList}
              striped
              itemsPerPage={posts.length}
              scopedSlots={{
                Actions: (item) => (
                  <td>
                    <CTooltip content="view details" placement="bottom-start">
                      <CButton
                        color="info"
                        onClick={() => {
                          const curPost = {
                            id: item._id,
                            title: item.title,
                            skill: item.skill,
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
                          setPosts(
                            posts.filter((itemCom) => itemCom._id !== item._id)
                          );
                          deletePost(item._id, (data) => {
                            if (data.status === 200) {
                              toast.success("Delete post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
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
                      className="text-primary"
                      to={`/post/appliers/${item._id}`}
                      target="_blank"
                      params={{ id: item._id }}
                    >
                      Details
                    </CLink>
                  </td>
                ),
              }}
            />

            <CModal
              show={isOpen}
              onClose={() => setOpen(!isOpen)}
              color="primary"
            >
              <CModalHeader closeButton>
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
                        <span> {currentPost.skill}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Salary</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span> {currentPost.salary}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Address</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        {currentPost.address}
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">End time</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span> {currentPost.endTime}</span>
                      </CCol>
                    </CFormGroup>
                    <hr></hr>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="label">Description</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <span> {currentPost.description}</span>
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

export default ExpiredPost;
