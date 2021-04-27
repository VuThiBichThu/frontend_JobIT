import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { getAppliers } from "../../redux/actions/getAppliers";

const ITer = ({ match }) => {
  const [appliers, setAppliers] = useState([]);
  const id = match.params.id;
  console.log(id);
  useEffect(() => {
    getAppliers(id, (result) => {
      setAppliers(result.applies);
    });
  }, [id]);

  console.log(appliers);
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <p>Post ID: {match.params.id}</p>

            <span>Post title: {match.params.name}</span>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>Email</th>
                  <th>CV</th>
                </tr>
              </thead>
              <tbody>
                {appliers &&
                  appliers.map((applier) => {
                    return (
                      <tr key={applier._id}>
                        <td>{applier.fullName}</td>
                        <td>{applier.email}</td>
                        <td>{applier.cvId}</td>
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

export default ITer;
