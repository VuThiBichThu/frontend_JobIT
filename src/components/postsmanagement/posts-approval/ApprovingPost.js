import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
      setNumPages(item.data.numPages);
      setPage(item.data.currentPage);
    });
  }, [page]);

  const pageChange = (newPage) => {
    getUnacceptedPosts(newPage, (data) => {
      setPosts(data.posts);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.currentPage);
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
                            alert("Delete succeed!");
                          } else {
                            alert("Delete failed, " + data.msg);
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
                            alert("Approve succeed!");
                          } else {
                            alert("Approve failed, " + data.msg);
                          }
                        });
                      }}
                    >
                      Approve{" "}
                    </CButton>
                  </td>
                ),
              }}
            />
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
