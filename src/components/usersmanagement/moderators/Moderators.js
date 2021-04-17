import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listModerator } from "../../../redux/actions/listModerator";

import { useHistory } from "react-router-dom";
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
  CInputGroupPrepend,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { addMod } from "../../../redux/actions/addMod";
import { deleteMod } from "../../../redux/actions/deleteMod";

const Moderators = () => {
  const [moderators, setModerators] = useState([]);
  const storeListModerator = useSelector((store) => store.listModerator);
  const loadingList = storeListModerator.loading;
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  useEffect(() => {
    listModerator(page, (item) => {
      setModerators(item.data.result);
      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page]);

  const pageChange = (newPage) => {
     listModerator(newPage, (data) => {
      setModerators(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });

  };
  const [primary, setPrimary] = useState(false);

  const loading = useSelector((store) => store.addMod.loading);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const mod = {
      userName,
      password,
    };

    addMod(mod, (data) => {
      if (data.status === 200) {
        setPrimary(!primary);
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    });
    setUserName("");
    setPassword("");
    setPrimary(!primary);
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Moderators
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
                        id="username"
                        name="username"
                        placeholder="Username"
                        autoComplete="name"
                        onChange={(event) => setUserName(event.target.value)}
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
                        autoComplete="password"
                        onChange={(event) => setPassword(event.target.value)}
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
                <CButton
                  color="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
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
                { key: "_id", _classes: "font-weight-bold" },
                "userName",
                "createdAt",
                "Actions",
              ]}
              hover
              loading={loadingList}
              striped
              itemsPerPage={take}
              activePage={page}
              scopedSlots={{
                Actions: (item) => (
                  <td>
                    <CButton
                      color="danger"
                      // disabled={item.status}
                      onClick={() => {
                        setModerators(
                          moderators.filter(
                            (itemMod) => itemMod._id !== item._id
                          )
                        );
                        deleteMod(item._id, (data) => {
                          if (data.status === 200) {
                            alert("Delete succeed!");
                          } else {
                            alert("Delete failed, " + data.msg);
                          }
                        });
                      }}
                    >
                      Delete
                    </CButton>{" "}
                    <CButton
                      color="success"
                      onClick={() =>
                        history.push(
                          `/usersmanagement/users/${item._id}/${item.userName}`
                        )
                      }
                    >
                      Permissions{" "}
                    </CButton>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
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
