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
    border-radius: 5px;
    margin: 50px 20px;
    box-shadow: 0px 10px 10px 5px #321fdb;
  }
  .rating {
    font-size: 40px;
    color: #f6ad29;
  }
  .paddingRight {
    padding-right: 100px;
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
    border-bottom: 3px solid #321fdb;
    margin-bottom: 20px;
  }
`;
const Company = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [company, setCompany] = useState({});

  const id = match.params.companyId;

  useEffect(() => {
    getPostList(id, (result) => {
      setPosts(result.posts);
      setCompany(result.company);
    });
  }, [id]);

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
                <div className="flex space-between align-item">
                  <h2 className="h2">
                    <span style={{ color: "#f6ad29" }}>{company.name}</span>
                  </h2>
                  <p className="paddingRight">
                    <i className="cil-star rating"></i>
                    <i className="cil-star rating"></i>
                    <i className="cil-star rating"></i>
                    <i className="cil-star rating"></i>
                    <i className="cil-star-half rating"></i>
                  </p>
                </div>
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
                      <i className="cil-globe-alt mr-2"></i>
                      Germany
                    </span>
                  </p>

                  <p className="detail">
                    <span className="span">
                      {" "}
                      <i className="cil-calendar mr-2"></i>
                      Mon - Fri
                    </span>
                    <span className="span">
                      <i className="cil-settings mr-2"></i>
                      Products
                    </span>
                  </p>

                  <p className="detail">
                    <span className="span">
                      {" "}
                      <i className="cil-clock mr-2"></i>
                      No OT
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
                <span>{company.name + "'s "}</span>Jobs
              </h2>
            </div>
            {company.recruitingPost && company.recruitingPost > 0 ? (
              <div className="flex flex-wrap center mb-4">
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
                        image={company.image ? company.image : defaultImage}
                        auth={getAuth()}
                        postId={item._id}
                        compId={item.companyId}
                        description={item.description}
                      />
                    );
                  })}
              </div>
            ) : (
              <CCard className="no-result">
                {" "}
                <div>Company doesn't have jobs!</div>
              </CCard>
            )}
          </CCard>
        </CCol>
      </CRow>
    </StyledCompany>
  );
};

export default Company;
