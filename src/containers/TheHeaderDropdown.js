import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link, useHistory } from "react-router-dom";
import { ROUTER_ADMIN, ROUTER_HOMEPAGE } from "src/utils/routes";
import { getAuth } from "src/utils/helpers";
import { useSelector } from "react-redux";

const TheHeaderDropdown = () => {
  const history = useHistory();

  const storeSetInfo = useSelector((store) => store.setInfo);
  const defaultAvatar =
    "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={
              storeSetInfo.data.image ? storeSetInfo.data.image : defaultAvatar
            }
            className="c-avatar-img"
            alt="Admin"
            style={{ height: "100%", borderRadius: "50%" }}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <Link to="/profile" className="dropdown-item">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </Link>

        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        {getAuth().role === "admin" || getAuth().role === "moderator" ? (
          <CDropdownItem
            onClick={() => {
              localStorage.clear();
              history.push(ROUTER_ADMIN);
            }}
          >
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Log Out
          </CDropdownItem>
        ) : (
          <CDropdownItem
            onClick={() => {
              localStorage.clear();
              history.push(ROUTER_HOMEPAGE);
            }}
          >
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Log Out
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
