import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CInputRadio,
  CLabel,
  CButton,
} from "@coreui/react";
import { listModPermissions } from "../../../redux/actions/listModPermissions";
import { updateModPermissions } from "../../../redux/actions/updateModPermissions";

const Moderator = ({ match }) => {
  const [modPermissions, setModPermissions] = useState([]);

  useEffect(() => {
    listModPermissions(match.params.id, (result) => {
      setModPermissions(result.permissions);
    });
  }, [match.params.id]);

  const updatedPermissions = JSON.parse(JSON.stringify(modPermissions));
  const data = {
    permissions: updatedPermissions,
  };

  const updateModPermissionsHandler = (event) => {
    event.preventDefault();
    setModPermissions(updatedPermissions);
    updateModPermissions(match.params.id, data, (data) => {
      if (data.status === 200) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    });
  };

  const [isCancel,setCancelHandler] = useState([false]);

  const cancelUpdatedPermissionsHandler = () => {
    setCancelHandler(true);
    setModPermissions(modPermissions);
  }

  const changePermissions = (event) => {
    const id = event.target.value.slice(0, -1);

    const value = event.target.value.slice(-1);
    const checkedValue = value === "n" ? false : true;

    updatedPermissions.map(
      (item) => (item.check = item._id === id ? checkedValue : item.check)
    );
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <p>User ID: {match.params.id}</p>
            <p>Username: {match.params.name}</p>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>PERMISSIONS</th>
                  <th>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {isCancel && modPermissions &&
                  modPermissions.map((permission) => {
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
           
          </CCardBody>
          <div className="flex flex-end">
            <CButton
              color="primary"
              className="mr-1 right-btn"
              onClick={updateModPermissionsHandler}
            >
              Save
            </CButton>
            <CButton
              color="warning"
              className="mr-1 right-btn"
              onClick={cancelUpdatedPermissionsHandler}
            >
              Cancel
            </CButton>
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Moderator;
