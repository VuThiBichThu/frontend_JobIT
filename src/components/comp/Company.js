import React, { useState, useEffect } from "react";

import { CCard, CCol, CRow } from "@coreui/react";

import styled from "styled-components";
import { getPostList } from "src/redux/actions/getPostList";
import Post from "../common/Post";
import { getAuth } from "src/utils/helpers";
import defaultImage from "../../assets/images/default_image.png";

const StyledCompany = styled.div`
  .company {
    padding: 20px;
    justify-content: center;
    width: 1080px;
    border: 2px solid #321fdb;
    margin: 50px 20px;
  }
  .align {
    align-items: center;
  }
  .photo {
    width: 150px;
    height: 150px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    width: 360px;
  }
  .span {
    margin: 5px 20px 5px 0px;
  }
  .info {
    flex-direction: column;
    width: 900px;
    margin-left: 20px;
  }
  .post-header {
    width: 1080px;
    border-bottom: 2px solid #321fdb;
    margin-bottom: 20px;
  }
  .post-list {
    width: 1100px;
  }
`;
const Company = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [company, setCompany] = useState({});

  const id = match.params.companyId;

  useEffect(() => {
    getPostList(id, (result) => {
      console.log("here");
      setPosts(result.posts);
      setCompany(result.company);
    });
  }, [id]);
  console.log(posts);
  console.log(company);

  return (
    <StyledCompany>
      <CRow>
        <CCol>
          <CCard className="flex center align">
            <div className="flex company space-between">
              {" "}
              <div className="photo">
                {" "}
                <img
                  src={company.image ? company.image : defaultImage}
                  className="photo"
                  alt="avatar"
                />
              </div>
              <div className="flex info">
                <h2 className="h2">
                  <span className="primary">{company.name}</span>
                </h2>
                <div className="flex mt-2">
                  <p className="detail">
                    <span className="span">
                      {" "}
                      <i className="cil-phone mr-2"></i>
                      {company.phone}
                    </span>
                    <span className="span">
                      <i className="cil-location-pin mr-2"></i>
                      {company.address}
                    </span>
                  </p>

                  <p className="detail">
                    <span className="span">
                      {" "}
                      <i className="cil-envelope-closed mr-2"></i>
                      {company.email}
                    </span>
                    <span className="span">
                      <i className="cil-external-link mr-2"></i>
                      <a href="/">Website</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="post-header">
              <h2 className="h3">
                <span>{company.name + " "}</span>Jobs
              </h2>
            </div>
            {company.recruitingPost && company.recruitingPost > 0 ? (
              <div className="flex flex-wrap center post-list mb-4">
                {posts &&
                  posts.map((item, index) => {
                    return (
                      <Post
                        key={index}
                        compName={company.name}
                        title={item.title}
                        address={item.address}
                        skill={item.skill.join(" ,")}
                        endTime={item.endTime}
                        salary={item.salary}
                        image={company.image ? company.name : defaultImage}
                        auth={getAuth()}
                        postId={item._id}
                        compId={item.companyId}
                        description={item.description}
                      />
                    );
                  })}
              </div>
            ) : (
              <div>Company doesn't have jobs!</div>
            )}
          </CCard>
        </CCol>
      </CRow>
    </StyledCompany>
  );
};

export default Company;
