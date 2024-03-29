import React, { useEffect, useState } from "react";

import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CTooltip,
  // CPagination,
} from "@coreui/react";
import { getFeedback } from "src/redux/actions/getFeedback";
import { useSelector } from "react-redux";
import { deleteFeedback } from "src/redux/actions/deleteFeedback";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const storeGetFeedback = useSelector((store) => store.getFeedback);
  const loading = storeGetFeedback.loading;
  const storeDelFeedback = useSelector((store) => store.deleteFeedback);
  const loadingDel = storeDelFeedback.loading;
  // const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);

  // const [numPages, setNumPages] = useState(1);
  const [take, setTake] = useState(10);
  // const take = 10; // rows in table

  const [isRole, setIsRole] = useState(null);
  useEffect(() => {
    getFeedback((result) => {
      if (result.status === 401) {
        setIsRole(false);
      } else {
        setIsRole(true);
        setFeedbacks(result.feedbacks);
        setTake(result.feedbacks.length);
      }
    });
  }, []);

  // const pageChange = (newPage) => {
  //   getFeedback(newPage, (data) => {
  //     setFeedbacks(data.data.posts);
  //     setNumPages(data.data.numPages);
  //     setCurrentPage(data.data.currentPage);
  //   });
  // };

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <CRow>
        <CCol xs="12" className="mb-4">
          <CCard className="card-content">
            {isRole ? (
              <>
                {" "}
                <CCardHeader>All feedbacks from users</CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={feedbacks}
                    fields={[
                      { key: "_id", _classes: "font-weight-bold" },
                      "userId",
                      "content",
                      "Actions",
                    ]}
                    hover
                    loading={loading || loadingDel}
                    striped
                    itemsPerPage={take}
                    // activePage={page}
                    scopedSlots={{
                      Actions: (item) => (
                        <td>
                          <CTooltip
                            content="delete this company"
                            placement="bottom-start"
                          >
                            <CButton
                              color="danger"
                              onClick={() => {
                                deleteFeedback(item._id, (data) => {
                                  if (data.status === 200) {
                                    toast.success(
                                      "Delete feedback successfully !",
                                      {
                                        position: toast.POSITION.BOTTOM_LEFT,
                                      }
                                    );
                                    setFeedbacks(
                                      feedbacks.filter(
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
                          </CTooltip>{" "}
                        </td>
                      ),
                    }}
                  />
                  {/* <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
              doubleArrows={false}
              align="center"
            /> */}
                </CCardBody>
              </>
            ) : (
              <CCardBody className="center-admin">
                <div style={{ fontSize: "x-large" }}>
                  You don't have permission to control this management!{" "}
                </div>
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </LoadingOverlay>
  );
};
export default Feedbacks;
