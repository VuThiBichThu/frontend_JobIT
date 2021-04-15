import React from "react";
import styled from "styled-components";

const StyledTabs = styled.section`
  .bg {
    background: #ffffff;
    .user_account {
      height: 400px;
      margin-left: 10px;
    }
  }
`;

const Company = () => {
  return (
    <StyledTabs>
      <div className="bg">
        <div className="user_account">Coming soon ...</div>
      </div>
    </StyledTabs>
  );
};

export default Company;
