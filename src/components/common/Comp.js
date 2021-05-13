import React, { useState } from "react";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { CCard, CCardBody, CLink } from "@coreui/react";

const StyledComp = styled.section`
  .card {
    width: 400px;
    margin: 10px;
    text-align: center;
    align-items: center;
  }
  .center {
    align-items: center;
  }
  .align {
    margin: 10px;
    margin-top: 5px;
  }
  .margin-top {
    margin-top: 1px;
  }
  .image {
    width: 110px;
    height: 110px;
  }
  .info {
    margin: 0px 10px;
    width: 100%;
  }
  .button {
    background-color: white;
    color: green;
  }
`;

function Comp({ compName, address, image, recruitingPost, auth, compId }) {
  return (
    <StyledComp>
      <CCard accentColor="primary" className="card">
        <CCardBody className="flex center" style={{ flexDirection: "column" }}>
          <div className="image">
            {" "}
            <img src={image} className="image" alt="avatar" />
          </div>
          <h4 className="text-primary mt-4">{compName}</h4>
          <div className="flex  margin-top">
            {getAuth().token ? (
              <CLink
                className="text-success mr-2"
                to={`/posts/company/${compId}`}
                target="_blank"
                params={{ companyId: compId }}
              >
                {recruitingPost + " jobs"}
              </CLink>
            ) : (
              <CLink className="text-success mr-2" to={`/login`}>
                {recruitingPost + " jobs"}
              </CLink>
            )}
            <p className="ml-2">
              <i className="cil-location-pin"></i>
              {" " + address}
            </p>
          </div>
        </CCardBody>
      </CCard>
    </StyledComp>
  );
}

export default Comp;
