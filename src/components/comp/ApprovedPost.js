import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPostsComp } from "../../../src/redux/actions/getPostsComp";
import { deletePost } from "../../../src/redux/actions/deletePost";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CLink,
} from "@coreui/react";
const ApprovedPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;

  useEffect(() => {
    getPostsComp((item) => {
      setPosts(item.posts.filter((post) => post.accept === true));
      console.log(posts);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    <CButton color="success" onClick={() => {}}>
                      <i className="cil-pen"></i>
                    </CButton>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovedPost;
