import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "src/redux/actions/getPosts";
// import { toast } from "react-toastify";
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
import Post from "src/components/common/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  // const take = 10; // rows in table

  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getPosts(page, query, (item) => {
      setPosts(item.data.posts);

      setNumPages(item.data.numPages);
      setPage(item.data.currentPage);
    });
  }, [page, query]);

  const pageChange = (newPage) => {
    getPosts(newPage, query, (data) => {
      setPosts(data.data.posts);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.currentPage);
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
                placeholder="Keyword ( Skill, Company, Position ...)"
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
          {posts &&
            posts.map((item, index) => {
              return (
                <Post
                  key={index}
                  compName={item.company[0].name}
                  title={item.title}
                  address={item.address}
                  skill={item.skill.join(" ,")}
                  endTime={item.endTime}
                  salary={item.salary}
                  image={item.company[0].image}
                  auth={getAuth}
                  postId={item._id}
                  compId={item.companyId}
                  description={item.description}
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

export default HomePage;
