import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUnacceptedPosts } from "../../../redux/actions/getUnacceptedPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import { approvePost } from "../../../redux/actions/approvePost";
import { approveMultiPosts } from "../../../redux/actions/approveMultiPosts";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CInputCheckbox,
  CTooltip,
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

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  const [items, setItems] = useState([]);
  useEffect(() => {
    getUnacceptedPosts(page, (item) => {
      setPosts(item.posts);
      setNumPages(item.numPages);
      setPage(item.currentPage);
    });
  }, [page]);

  const pageChange = (newPage) => {
    getUnacceptedPosts(newPage, (data) => {
      setPosts(data.posts);
      setNumPages(data.numPages);
      setCurrentPage(data.currentPage);
    });
  };

  const [currentPost, setCurrentPost] = useState([{}]);
  const handleViewDetail = (id) => {
    setCurrentPost(posts.filter((post) => post._id === id));
    setOpen(!isOpen);
  };

  const selectItem = (event) => {
    const id = event.target.value;
    const checkedValue = event.target.checked;

    if (checkedValue) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((i) => i !== id));
    }
  };

  const selectAll = () => {
    const status =
      posts.filter(
        (post) => document.getElementById(post._id).checked === false
      ).length !== 0;

    if (status) {
      setItems(posts.map((i) => i._id));
      posts.forEach(
        (item) => (document.getElementById(item._id).checked = true)
      );
    } else {
      setItems([]);
      posts.forEach(
        (item) => (document.getElementById(item._id).checked = false)
      );
    }
  };

  const approveAll = () => {
    const selectedPosts = { listId: items };

    approveMultiPosts(selectedPosts, (data) => {
      if (data.status === 200) {
        toast.success("Approve selected posts successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // window.location.reload();
      } else {
        toast.error("Fail to approve ! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={[
                { key: "_id", _classes: "font-weight-bold" },
                "companyName",
                "salary",
                "Actions",
                "More",
              ]}
              hover
              loading={loadingList}
              striped
              itemsPerPage={take}
              activePage={page}
              scopedSlots={{
                companyName: (item) => <td>{item.company[0].name}</td>,
                Actions: (item) => (
                  <td md="4" className="py-4" key={"bottom-start"}>
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
                    </CTooltip>{" "}
                    <CTooltip content="view details" placement="bottom-start">
                      <CButton
                        color="info"
                        onClick={() => handleViewDetail(item._id)}
                      >
                        <i className="cil-clipboard"></i>
                      </CButton>
                    </CTooltip>{" "}
                    <CTooltip
                      content="approve this post"
                      placement="bottom-start"
                    >
                      <CButton
                        color="success"
                        onClick={() => {
                          setPosts(
                            posts.filter((itemCom) => itemCom._id !== item._id)
                          );
                          approvePost(item._id, (data) => {
                            if (data.status === 200) {
                              toast.success("Approve post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                              window.location.reload();
                            } else {
                              toast.error("Fail to approve ! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                          });
                        }}
                      >
                        <i className="cil-check"></i>
                      </CButton>
                    </CTooltip>
                  </td>
                ),
                More: (item) => (
                  <td>
                    <span style={{ visibility: "hidden" }}>BOX</span>
                    <CInputCheckbox
                      id={item._id}
                      name={item._id}
                      value={item._id}
                      onClick={selectItem}
                      defaultChecked={false}
                    ></CInputCheckbox>
                  </td>
                ),
              }}
            />
            <div className="flex flex-end">
              <CTooltip content="select all post" placement="bottom-start">
                <CButton color="secondary" className="mr-1" onClick={selectAll}>
                  <CInputCheckbox
                    style={{ visibility: "hidden" }}
                    name="checkAll"
                    value="checkAll"
                    onClick={selectAll}
                    defaultChecked={false}
                  ></CInputCheckbox>
                  All <i className="cil-task"></i>
                </CButton>
              </CTooltip>
              <CTooltip content="approve all post" placement="bottom-start">
                <CButton color="success" onClick={approveAll}>
                  <i className="cil-check"></i>
                </CButton>
              </CTooltip>
            </div>
            <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
          <CModal
            show={isOpen}
            onClose={() => setOpen(!isOpen)}
            color="primary"
          >
            <CModalHeader closeButton>
              <CModalTitle>{currentPost[0]._id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="skill"
                      value={currentPost[0].title}
                      onChange={() => {}}

                      //disabled="true"
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
                      value={currentPost[0].skill}
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
                      name="salary"
                      value={currentPost[0].salary}
                      onChange={() => {}}

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
                      name="address"
                      value={currentPost[0].address}
                      onChange={() => {}}

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
                      name="endTime"
                      value={currentPost[0].endTime}
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
                      name="description"
                      value={currentPost[0].description}
                      onChange={() => {}}

                      //   disabled="true"
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
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
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovingPost;
