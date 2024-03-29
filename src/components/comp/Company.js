import React, { useState, useEffect } from "react";

import { CCard, CCol, CContainer, CRow } from "@coreui/react";

import styled from "styled-components";
import { getPostList } from "src/redux/actions/getPostList";
import Post from "../common/Post";
import { getAuth } from "src/utils/helpers";
import defaultImage from "../../assets/images/default_image.png";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const StyledCompany = styled.div`
  .company {
    padding: 20px;
    justify-content: center;
    border: 2px solid #eeeeee;
    margin: 10px;
  }
  .rating {
    font-size: 40px;
    color: #f25430;
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
    border: 1px solid #eeeeee;
  }
  .detail {
    display: flex;
    flex-direction: column;
    width: 360px;
  }
  .span {
    margin: 5px 20px 5px 0px;
  }
  .comp-info {
    flex-direction: column;
    width: 900px;
    margin-left: 40px;
  }
  .post-header {
    border-bottom: 4px solid;
    margin-bottom: 20px;
    margin-top: 40px;
  }
  .no-job {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Company = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [company, setCompany] = useState({});
  const storePostList = useSelector((store) => store.getPostList);
  const loading = storePostList.loading;

  const id = match.params.companyId;

  useEffect(() => {
    getPostList(id, (result) => {
      setPosts(result.posts);
      setCompany(result.company);
    });
  }, [id]);

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
      <StyledCompany>
        <CContainer>
          <CRow>
            <CCol>
              <CCard style={{ marginTop: "20px" }}>
                {" "}
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
                  <div className="flex comp-info">
                    <div className="flex space-between align-item">
                      <h2 className="h2 text--primary">{company.name}</h2>
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
                          {company.phone || "Phone number"}
                        </span>
                        <span className="span">
                          <i className="cil-location-pin mr-2"></i>
                          {company.address || "Address"}
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
                          {company.nation || "Germany"}
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
                          <a href="/" className="text--primary">
                            Website
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard className="flex center align">
                <div className="post-header">
                  <h2 className="h3">
                    <span>{company.name + "'s "}</span>Jobs
                  </h2>
                </div>
                {company.recruitingPost && company.recruitingPost > 0 ? (
                  <div className="flex flex-wrap center mb-4 space-between">
                    {posts &&
                      posts.map((item, index) => {
                        return (
                          <Post
                            key={index}
                            compName={company.name}
                            title={item.title}
                            address={item.address}
                            skill={item.skill.join(", ")}
                            endTime={item.endTime}
                            salary={item.salary}
                            image={company.image ? company.image : defaultImage}
                            auth={getAuth()}
                            postId={item._id}
                            compId={item.companyId}
                            description={item.description}
                            isApplied={item.apply.some(
                              (i) => i.iterId === getAuth().userId
                            )}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <div className="no-job">
                    <h4>Company doesn't have jobs!</h4>
                  </div>
                )}
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </StyledCompany>
    </LoadingOverlay>
  );
};

export default Company;
