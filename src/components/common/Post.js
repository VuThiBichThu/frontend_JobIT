import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
const StyledPost = styled.section`
  .post {
    width: 100%;
    height: 100%;
  }
`;
function Post({
  compName,
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
      <div className="post">
        <div>
          <div>
            <h2>{position}</h2>
          </div>

          <div>
            <img src={image} alt="avatar" />
          </div>
          <div>
            <h4>{compName}</h4>
          </div>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <p>{address}</p>
          </div>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <p>{salary}</p>
          </div>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <p>{skill}</p>
          </div>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <p>{endTime}</p>
          </div>

          <div>
            <div>
              <div>
                <Button
                  color="primary"
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
                            console.log(
                              data
                            );
                            toast.error("Fail to apply! " + data.msg, {
                              position: toast.POSITION.BOTTOM_LEFT,
                            });
                          }
                        });
                      }
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledPost>
  );
}

export default Post;
