import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getPostsComp } from "../../../src/redux/actions/getPostsComp";
import { deletePost } from "../../../src/redux/actions/deletePost";
import { getAuth } from "src/utils/helpers";
import { updatePost } from "../../redux/actions/updatePost";

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
} from "@coreui/react";

const ApprovingPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getPostsComp((item) => {
      setPosts(item.posts.filter((post) => post.accept === false));
      console.log(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  posts.map((item) => {
    const getTime = item.endTime.split("/");
    if (getTime[0] < 10) getTime[0] = "0" + getTime[0];
    if (getTime[1] < 10) getTime[1] = "0" + getTime[1];
    item.endTime = getTime.reverse().join("-");
    console.log(item.endTime);
  });

  const [updatedPost, setUpdatedPost] = useState({});

  const handleChange = (event) => {
    if (event.target.name === "title") updatedPost.title = event.target.value;

    if (event.target.name === "skill")
      updatedPost.skill = event.target.value.split(",");

    if (event.target.name === "salary") updatedPost.salary = event.target.value;

    if (event.target.name === "address")
      updatedPost.address = event.target.value;

    if (event.target.name === "description")
      updatedPost.description = event.target.value;

    if (event.target.name === "endTime") {
      const date = new Date(event.target.value);
      updatedPost.endTime =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();
    }
    console.log(updatedPost);
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={["_id", "title", "Actions"]}
              hover
              loading={loadingList}
              striped
              itemsPerPage={posts.length}
              scopedSlots={{
                Actions: (item) => (
                  <td>
                    <CButton
                      color="success"
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

                        setUpdatedPost(currentPost);
                        setOpen(!isOpen);
                      }}
                    >
                      <i className="cil-pen"></i>
                    </CButton>{" "}
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
                    </CButton>{" "}
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
                <CModalTitle>{updatedPost.title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="title"
                        defaultValue={updatedPost.title}
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
                        name="skill"
                        defaultValue={updatedPost.skill}
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
                        name="salary"
                        defaultValue={updatedPost.salary}
                        onChange={handleChange}
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
                        name="address"
                        defaultValue={updatedPost.address}
                        //disabled="true"
                        onChange={handleChange}
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
                        name="endTime"
                        type="date"
                        defaultValue={updatedPost.endTime}
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
                        rows="5"
                        name="description"
                        defaultValue={updatedPost.description}
                        onChange={handleChange}
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
                      if (getAuth().role === "company") {
                        updatePost(updatedPost.id, updatedPost, (data) => {
                          if (data.status === 200) {
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
                  }}
                >
                  Update
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
      </CCol>
    </CRow>
  );
};

export default ApprovingPost;
