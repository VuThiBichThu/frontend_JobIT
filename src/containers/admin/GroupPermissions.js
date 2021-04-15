import React from "react";
import {
  Moderator,
  Company,
  ITer

} from "../../components/grouppermissions";

import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
} from "@coreui/react";


const GroupPermissions = () => {
  return (
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard>
          <CCardHeader>Permissions</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Moderator</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Company</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>ITer</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <Moderator/>
                </CTabPane>
                <CTabPane>
                  <Company/>
                </CTabPane>
                <CTabPane>
                  <ITer/>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default GroupPermissions;
