import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listCompany } from "../../../redux/actions/listCompany";
import { toast } from "react-toastify";
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
  CTooltip,
} from "@coreui/react";

import { deleteCompany } from "../../../redux/actions/deleteCompany";
import { getAuth } from "src/utils/helpers";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const storeListCompany = useSelector((store) => store.listCompany);
  const loadingList = storeListCompany.loading;
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  const role = "company";
  useEffect(() => {
    listCompany(page, (item) => {
      setCompanies(item.data.result);
      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page]);

  const pageChange = (newPage) => {
    listCompany(newPage, (data) => {
      setCompanies(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard className="card-content">
          {getAuth().role === "admin" ? (
            <>
              <CCardHeader>COMPANIES</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={companies}
                  fields={[
                    { key: "_id", _classes: "font-weight-bold" },
                    "name",
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
                        <CTooltip
                          content="delete this company"
                          placement="bottom-start"
                        >
                          <CButton
                            color="danger"
                            onClick={() => {
                              setCompanies(
                                companies.filter(
                                  (itemCom) => itemCom._id !== item._id
                                )
                              );
                              deleteCompany(item._id, (data) => {
                                if (data.status === 200) {
                                  toast.success(
                                    "Delete Company Successfully !",
                                    {
                                      position: toast.POSITION.BOTTOM_LEFT,
                                    }
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
                        <CTooltip
                          content="set permissions"
                          placement="bottom-start"
                        >
                          <CButton
                            color="success"
                            onClick={() =>
                              history.push(
                                `/usersmanagement/${role}/${item.accountId}/${item.name}`
                              )
                            }
                          >
                            <i className="cil-cog"></i>
                          </CButton>
                        </CTooltip>
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
  );
};

export default Companies;
