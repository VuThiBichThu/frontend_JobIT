import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listCompany } from "../../../redux/actions/listCompany";

import { useHistory, useLocation } from "react-router-dom";
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

import { deleteCompany } from "../../../redux/actions/deleteCompany";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const storeListCompany = useSelector((store) => store.listCompany);
  const loadingList = storeListCompany.loading;
  const history = useHistory();

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  useEffect(() => {
    console.log("Start");
    listCompany(page, (item) => {
      setCompanies(item.data.result);
      setNumPages(item.data.numPages);
      console.log("first mods", Companies);
    });
  }, []);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const pageChange = (newPage) => {
    listCompany(newPage, (data) => {
      console.log("data of current page", data);
      setCompanies(data.result);
      setNumPages(data.numPages);
    });
    console.log("current page");
    console.log(newPage);
    currentPage !== newPage &&
      history.push(`/usersmanagement/companies?page=${newPage}`);
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>COMPANIES</CCardHeader>
          <CCardBody>
            <CDataTable
              items={companies}
              fields={[
                { key: "_id", _classes: "font-weight-bold" },
                "companyName",
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
                        setCompanies(
                          companies.filter(
                            (itemCom) => itemCom._id !== item._id
                          )
                        );
                        deleteCompany(item._id, (data) => {
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
                          `/usersmanagement/users/${item._id}/${item.companyName}`
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
              activePage={page}
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

export default Companies;
