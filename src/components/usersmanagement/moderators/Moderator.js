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
} from "@coreui/react";
import { useSelector } from "react-redux";
import { listModPermissions } from "../../../redux/actions/listModPermissions";

const Moderator = ({ match }) => {
  const [modPermissions, setModPermissions] = useState([]);
  // const [updatedPermissions,setUpdatedPermissions] = useState([]);

  const storeModPermissions = useSelector((store) => store.listModPermissions);
  // const storeUpdatedPermissions = useSelector((store) => store.updateModPermissions);

  useEffect(() => {
    listModPermissions(match.params.id);
  }, []);
  useEffect(() => {
    if (!storeModPermissions.data.permissions) {
      return;
    }
    setModPermissions(storeModPermissions.data.permissions);
  }, [storeModPermissions]);
  console.log(modPermissions);
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            User ID: {match.params.id}
            <br></br>
            Username: {match.params.name}
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
                {modPermissions.map((permission) => {
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
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Moderator;
