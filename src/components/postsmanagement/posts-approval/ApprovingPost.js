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

  const [items, setItems] = useState([]);
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
    setItems(posts.map((i) => i._id));
    items.forEach(
      (item) => (document.getElementById(item).defaultChecked = "true")
    );
  };

  const approveAll = () => {
    console.log(items);
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
              <CButton color="secondary" className="mr-1" onClick={selectAll}>
                <CInputCheckbox
                  style={{ visibility: "hidden" }}
                  name="checkAll"
                  value="checkAll"
                  onClick={selectAll}
                  defaultChecked={false}
                ></CInputCheckbox>
                Select All
              </CButton>
              <CButton color="success" onClick={approveAll}>
                Approve
              </CButton>
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
