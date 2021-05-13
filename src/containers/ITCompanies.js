import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
// import ReactLoading from "react-loading";

import {
  CRow,
  CCol,
  CPagination,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getAuth } from "src/utils/helpers";
import { getCompany } from "src/redux/actions/getCompany";
import Comp from "src/components/common/Comp";

const ITCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const storeGetCompany = useSelector((store) => store.getCompany);
  const loadingList = storeGetCompany.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  // const take = 10; // rows in table

  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getCompany(page, (item) => {
      setCompanies(item.data.result);

      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
    // getCompany((result)=>{
    //   console.log(result);
    // })
  }, [page, query]);

  const pageChange = (newPage) => {
    getCompany(newPage, query, (data) => {
      setCompanies(data.data.posts);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    setQuery(searchInput);
  };
  return (
    <LoadingOverlay
      active={loadingList}
      spinner
      text="Loading..."
      style={{ position: "fixed", width: "100%", height: "100%" }}
    >
      <CContainer>
        <CRow style={{ justifyContent: "center" }}>
          <CCol md="6" className="mb-4">
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                size="16"
                type="text"
                placeholder="Company name"
                name="search"
                onChange={handleChange}
              />
              <CInputGroupAppend>
                <CButton color="info" onClick={search}>
                  Search
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CRow>
        {/* {loadingList && <ReactLoading type="spinningBubbles" color="#321fdb" />} */}
        <div className="flex flex-wrap space-between">
          {companies &&
            companies.map((item, index) => {
              return (
                <Comp
                  key={index}
                  compName={item.name}
                  address={item.address}
                  image={item.image}
                  auth={getAuth}
                  recruitingPost={item.recruitingPost}
                  compId={item.accountId}
                />
              );
            })}
        </div>

        <CPagination
          className="mb-2"
          activePage={currentPage}
          onActivePageChange={pageChange}
          pages={numPages}
          doubleArrows={false}
          align="center"
        />
      </CContainer>
    </LoadingOverlay>
  );
};

export default ITCompanies;
