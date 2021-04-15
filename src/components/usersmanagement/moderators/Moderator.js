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
import { listModPermissions } from "../../../redux/actions/listModPermissions";

const Moderator = ({ match }) => {
  const [modPermissions, setModPermissions] = useState([]);
  // const [updatedPermissions,setUpdatedPermissions] = useState([]);

  useEffect(() => {
    listModPermissions(match.params.id, (result) => {
      setModPermissions(result.permissions);
   
    });
  }, [match.params.id]);

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
                
                {modPermissions && modPermissions.map((permission) => {
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
