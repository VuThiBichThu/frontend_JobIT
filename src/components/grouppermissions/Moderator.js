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

  // const storePermissions = useSelector((store) => store.getRolePermissions);

  useEffect(() => {
    getRolePermissions(role, (result) => {
      setPermissions(result.permissions);
    });
  }, [role]);

  const updateModPermissions = (event) => {
    event.preventDefault();

    const updatedPermissions = {
      role: role,
      permissions: [
        {
          check: true,
          _id: "6062ad1e5f74e6051434fc71",
        },
        {
          check: true,
          _id: "6062ad1e5f74e6051434fc72",
        },
        {
          check: true,
          _id: "6062ad1e5f74e6051434fc73",
        },
        {
          check: true,
          _id: "6062ad1e5f74e6051434fc74",
        },
        {
          check: true,
          _id: "6062ad1e5f74e6051434fc75",
        },
      ],
    };

    updateRolePermissions(updatedPermissions, (data) => {
      if (data.status === 200) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    });
  };

  const changePermission = (event) => {
    console.log(event.target.value);
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
                        onChange={changePermission}
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
                        onChange={changePermission}
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
