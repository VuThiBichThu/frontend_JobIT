import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getPosts } from "../../../redux/actions/getPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from "@coreui/react";
const ApprovedPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  useEffect(() => {
    getPosts(page, (item) => {
      setPosts(item.data.posts);
      console.log(item.data.posts);
      setNumPages(item.data.numPages);
      setPage(item.data.currentPage);
    });
  }, [page]);

  const pageChange = (newPage) => {
    getPosts(newPage, (data) => {
      setPosts(data.data.posts);
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

export default ApprovedPost;