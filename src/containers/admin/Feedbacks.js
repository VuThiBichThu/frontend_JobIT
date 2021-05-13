import React, { useEffect, useState } from "react";

import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  // CPagination,
} from "@coreui/react";
import { getFeedback } from "src/redux/actions/getFeedback";
import { useSelector } from "react-redux";
import { deleteFeedback } from "src/redux/actions/deleteFeedback";
import { toast } from "react-toastify";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const storeGetFeedback = useSelector((store) => store.getFeedback);
  const loadingList = storeGetFeedback.loading;

  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);

  // const [numPages, setNumPages] = useState(1);
  const [take, setTake] = useState(10);
  // const take = 10; // rows in table

  useEffect(() => {
    getFeedback((result) => {
      setFeedbacks(result.feedbacks);
      setTake(result.feedbacks.length);
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
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard>
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
                        setFeedbacks(
                          feedbacks.filter(
                            (itemCom) => itemCom._id !== item._id
                          )
                        );
                        deleteFeedback(item._id, (data) => {
                          if (data.status === 200) {
                            toast.success("Delete feedback successfully !", {
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
            {/* <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
              doubleArrows={false}
              align="center"
            /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default Feedbacks;
