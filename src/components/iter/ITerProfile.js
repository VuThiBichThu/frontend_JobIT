import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { getITerCV } from "src/redux/actions/getITerCV";
import { receiveEmail } from "src/redux/actions/receiveEmail";
import { getAuth } from "src/utils/helpers";
const ITerProfile = () => {
  const [isReceive, setIsReceive] = useState(null);

  useEffect(() => {
    getITerCV((result) => {
      if (getAuth().role === "iter" && result.cv) {
        setIsReceive(result.cv.receiveMail);
      }
    });
  }, []);

  useEffect(() => {
    if (isReceive === null || getAuth().role === "company") {
      return;
    }
    receiveEmail(
      {
        receive: isReceive,
      },
      (result) => {
        if (result.status === 200) {
          toast.success(result.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          document.getElementById("myCheck").checked = false;
          toast.error("Fail! " + result.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      }
    );
  }, [isReceive]);

  const handleReceiveEmail = () => {
    setIsReceive(!isReceive);
  };
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
                    {getAuth().role === "iter" && (
                      <CNavItem>
                        <CNavLink>My CV</CNavLink>
                      </CNavItem>
                    )}
                  </CNav>
                  {getAuth().role === "iter" && (
                    <>
                      <CLabel className="mr-2">Receive job email</CLabel>
                      <CSwitch
                        id={"myCheck"}
                        className={"mx-1"}
                        color={"danger"}
                        labelOn={"\u2713"}
                        labelOff={"\u2715"}
                        defaultChecked={isReceive}
                        onClick={
                          getAuth().role === "iter" && handleReceiveEmail
                        }
                      />
                    </>
                  )}
                </div>

                <CTabContent>
                  <CTabPane>
                    <Profile />
                  </CTabPane>
                  {getAuth().role === "iter" && (
                    <CTabPane>
                      <CV />
                    </CTabPane>
                  )}
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
