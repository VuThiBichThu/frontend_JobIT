import React from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
import { CCard, CCardBody, CCardHeader, CLink } from "@coreui/react";

const StyledPost = styled.section`
  .card {
    width: 530px;
  }
  .align {
    margin: 10px;
  }
  .margin-top {
    margin-top: 1px;
  }
  .image {
    width: 30%;
  }
  .info {
    width: 100%;
  }
  .button {
    background-color: white;
    color: green;
  }
`;

function Post({
  compName,
  title,
  position,
  address,
  skill,
  endTime,
  salary,
  image,
  auth,
  postId,
  compId,
}) {
  const history = useHistory();

  return (
    <StyledPost>
      <CCard accentColor="primary" className="card align">
        <CCardHeader>{title}</CCardHeader>
        <CCardBody className="flex space-between">
          <img src={image} className="image" alt="avatar" />
          <div class="align info">
            <div className="flex space-between align-item">
              <h4 className="text-primary">{compName}</h4>
              <p>
                <i class="cil-location-pin"></i>
                {address}
              </p>
            </div>

            <p>
              <i class="cil-money"></i>
              {" " + salary}
            </p>
            <p>
              <i class="cil-code"></i>
              {" " + skill}
            </p>
            <p>
              <i class="cil-monitor"></i>
              {" " + position}
            </p>

            <div className="flex space-between">
              <CLink
                className="text-success"
                onClick={() => {
                  if (!getAuth().token) {
                    history.push("/login");
                  } else {
                    if (getAuth().role === "iter") {
                      apply(postId, (data) => {
                        console.log(data);
                        if (data.status === 200) {
                          toast.success("Apply successfully !", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        } else {
                          console.log(data);
                          toast.error("Fail to apply! " + data.msg, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        }
                      });
                    }
                  }
                }}
              >
                See More
              </CLink>
              <p>
                <i class="cil-history"></i>
                {" " + endTime}
              </p>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </StyledPost>
  );
}

export default Post;
