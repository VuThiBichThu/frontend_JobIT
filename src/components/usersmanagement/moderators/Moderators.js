import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listModerator } from "../../../redux/actions/listModerator";

import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupText,
  CInput,
  CInputGroupPrepend
} from '@coreui/react'
import CIcon from "@coreui/icons-react";

const Moderators = () => {
  const [moderators, setModerators] = useState([]);
  const storeListModerator = useSelector((store) => store.listModerator);

  useEffect(() => {
    listModerator();
  }, []);
  useEffect(() => {
    if (!storeListModerator.data.data) {
      return;
    }
     setModerators(storeListModerator.data.data.result);
     
  }, [storeListModerator]);

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/usersmanagement/moderators?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const [primary, setPrimary] = useState(false);
  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
            <CButton
              style={{ float: "right" }}
              color="primary"
              className="mr-1 right-btn"
              onClick={() => setPrimary(!primary)}
            >
              Create new moderator
            </CButton>
            <CModal
              show={primary}
              onClose={() => setPrimary(!primary)}
              color="primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>New moderator</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm action="" method="post">
                  <CFormGroup>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="username1"
                        name="username1"
                        placeholder="Username"
                        autoComplete="name"
                      />
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-asterisk" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-asterisk" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm password"
                        autoComplete="confirm-password"
                      />
                    </CInputGroup>
                  </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setPrimary(!primary)}>
                  Create
                </CButton>{" "}
                <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={moderators}
            fields={[
              { key: '_id', _classes: 'font-weight-bold' },
              'userName', 'createdAt','Actions'
            ]}

            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
           // onRowClick={(item) => history.push(`/users/${item._id}`)}
            scopedSlots = {{
              'Actions':
                (buttons)=>(
                  <td>
                   <CButton color="danger">Delete </CButton>
                   {" "}
                   <CButton color="success">Permissions </CButton>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Moderators;
