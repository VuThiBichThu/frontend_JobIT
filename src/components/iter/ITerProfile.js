import React from "react";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";
// import ReactLoading from "react-loading";

import { Profile, CV } from "./index";

import {
  CRow,
  CCol,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CSwitch,
} from "@coreui/react";
const ITerProfile = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" className="mb-4">
          <CCard>
            <CCardBody>
              <CTabs>
                <div style={{ display: "flex" }}>
                  {" "}
                  <CNav variant="tabs" style={{ width: "86%" }}>
                    <CNavItem>
                      <CNavLink>My Profile</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>My CV</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CLabel className="mr-2">Receive job email</CLabel>
                  <CSwitch
                    className={"mx-1"}
                    color={"danger"}
                    labelOn={"\u2713"}
                    labelOff={"\u2715"}
                    defaultChecked
                    // onClick={}
                  />
                </div>

                <CTabContent>
                  <CTabPane>
                    <Profile />
                  </CTabPane>
                  <CTabPane>
                    <CV />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ITerProfile;
