import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRolePermissions } from "../../redux/actions/getRolePermissions";
import { CFormGroup, CInputRadio, CLabel, CButton } from "@coreui/react";

import { updateRolePermissions } from "../../redux/actions/updateRolePermissions";

const StyledTabs = styled.section`
  .bg {
    background: #ffffff;
    .user_account {
      height: 400px;
      margin-left: 10px;
    }
  }
`;

const Moderator = () => {
  const role = "moderator";
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getRolePermissions(role, (result) => {
      setPermissions(result.permissions);
    });
  }, [role]);
  
  const updatedPermissions = [...permissions];
  const updateModPermissions = (event) => {
    event.preventDefault();

    const data = {
      role: role,
      permissions: updatedPermissions,
    };

    updateRolePermissions(data, (data) => {
      if (data.status === 200) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    });
  };

  const changePermissions = (event) => {
    const id = event.target.value.slice(0, -1);

    updatedPermissions.map(
      (item) =>
        (item.check =
          item._id === id ? event.target.defaultChecked : item.check)
    );
    console.log("update:", updatedPermissions);
  };

  return (
    <StyledTabs>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>PERMISSIONS</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {permissions &&
            permissions.map((permission) => {
              return (
                <tr key={permission._id}>
                  <td>{permission.perName}</td>
                  <td>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id={permission._id + "y"}
                        name={permission._id + "name"}
                        value={permission._id + "y"}
                        defaultChecked={permission.check}
                        onChange={changePermissions}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={permission._id + "y"}
                      >
                        Yes
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id={permission._id + "n"}
                        name={permission._id + "name"}
                        value={permission._id + "n"}
                        defaultChecked={!permission.check}
                        onChange={changePermissions}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={permission._id + "n"}
                      >
                        No
                      </CLabel>
                    </CFormGroup>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <br></br>
        <CButton
          color="primary"
          className="mr-1 right-btn"
          onClick={updateModPermissions}
        >
          Save changes
        </CButton>
      </table>
    </StyledTabs>
  );
};

export default Moderator;
