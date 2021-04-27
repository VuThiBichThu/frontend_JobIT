import React from "react";
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CButton,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { getAuth } from "src/utils/helpers";

// routes config

import { TheHeaderDropdown } from "./index";

const TheHeaderUser = () => {
  return getAuth().token && getAuth().role === "company" ? (
    <CHeader>
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/post-management">Post management</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/it-Companies">IT Companies</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
      {getAuth().role ? (
        <CHeaderNav className="px-3">
          <p>{getAuth().name}</p>
          <TheHeaderDropdown />
        </CHeaderNav>
      ) : (
        <CHeaderNav className="px-3">
          <Link to="/login">
            <CButton color="primary" className="px-4">
              Login
            </CButton>
          </Link>
        </CHeaderNav>
      )}
    </CHeader>
  ) : (
    <CHeader>
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/all-jobs">All jobs</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/it-Companies">IT Companies</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
      {getAuth().role ? (
        <CHeaderNav className="px-3">
           <p>{getAuth().name}</p>
          <TheHeaderDropdown />
        </CHeaderNav>
      ) : (
        <CHeaderNav className="px-3">
          <Link to="/login">
            <CButton color="primary" className="px-4">
              Login
            </CButton>
          </Link>
        </CHeaderNav>
      )}
    </CHeader>
  );
};

export default TheHeaderUser;
