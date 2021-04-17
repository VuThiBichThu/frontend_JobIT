import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listITer } from "../../../redux/actions/listITer";

import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from "@coreui/react";

import { deleteITer } from "../../../redux/actions/deleteITer";

const ITers = () => {
  const [iters, setITers] = useState([]);
  const storeListCompany = useSelector((store) => store.listCompany);
  const loadingList = storeListCompany.loading;
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  useEffect(() => {
    listITer(page, (item) => {
      setITers(item.data.result);
      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page]);

  const pageChange = (newPage) => {
    listITer(newPage, (data) => {
      setITers(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>iters</CCardHeader>
          <CCardBody>
            <CDataTable
              items={iters}
              fields={[
                { key: "_id", _classes: "font-weight-bold" },
                "fullName",
                "createdAt",
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
                        setITers(
                          iters.filter((itemCom) => itemCom._id !== item._id)
                        );
                        deleteITer(item._id, (data) => {
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
                      onClick={() =>
                        history.push(
                          `/usersmanagement/users/${item._id}/${item.fullName}`
                        )
                      }
                    >
                      Permissions{" "}
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

export default ITers;
