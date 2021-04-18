import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUnacceptedPosts } from "../../../redux/actions/getUnacceptedPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import { approvePost } from "../../../redux/actions/approvePost";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CInputCheckbox,
} from "@coreui/react";
const ApprovingPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  useEffect(() => {
    getUnacceptedPosts(page, (item) => {
      setPosts(item.posts);
      console.log(item.posts);
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
                Actions: (item) => (
                  <td>
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
                      Delete
                    </CButton>{" "}
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
                      Approve{" "}
                    </CButton>
                  </td>
                ),
                More: (item) => (
                
                  <td>
                    <span style={{visibility:"hidden"}}>BOX</span>
                    <CInputCheckbox
                      id={item._id}
                      checked="true"
                    ></CInputCheckbox>
                  </td>
                ),
              }}
            />
            <div className="flex flex-end">
              <CButton color="secondary" className="mr-1">
                Select All
              </CButton>
              <CButton color="success">Approve</CButton>
            </div>
            <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovingPost;
