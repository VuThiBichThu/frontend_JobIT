import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRolePermissions } from "../../redux/actions/getRolePermissions";
import { CFormGroup, CInputRadio, CLabel, CButton } from "@coreui/react";
import { toast } from "react-toastify";

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

const Company = () => {
  const role = "company";
  let apply = false;
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getRolePermissions(role, (result) => {
      setPermissions(result.permissions);
    });
  }, [role]);

  const updatedPermissions = JSON.parse(JSON.stringify(permissions));

  const updatePermissionsWithApply = (event) => {
    apply = true;
    updatePermissions(event);
  };
  const updatePermissions = (event) => {
    event.preventDefault();

    setPermissions(updatedPermissions);

    const data = {
      role: role,
      apply: apply,
      permissions: updatedPermissions,
    };

    updateRolePermissions(data, (data) => {
      const noti = (!apply ? "Save" : "Save and Apply").concat(
        "  updated permissions successfully"
      );
      if (data.status === 200) {
        toast.success(noti, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        apply = false;
      } else {
        toast.error("Fail to update ! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  const changePermissions = (event) => {
    const id = event.target.value.slice(0, -1);

    const value = event.target.value.slice(-1);
    const checkedValue = value === "n" ? false : true;

    updatedPermissions.map(
      (item) => (item.check = item._id === id ? checkedValue : item.check)
    );
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
      </table>
      <div className="flex flex-end">
        <CButton
          color="primary"
          className="mr-1 right-btn"
          onClick={updatePermissions}
        >
          Save
        </CButton>
        <CButton
          color="warning"
          className="mr-1 right-btn"
          onClick={updatePermissionsWithApply}
        >
          Save and Apply
        </CButton>
      </div>
    </StyledTabs>
  );
};

export default Company;
