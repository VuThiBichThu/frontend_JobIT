import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getNoti, getNewNoti, resetNewNoti } from "src/redux/actions/setNoti";
import * as _ from "lodash";
import moment from "moment";
import { getAuth } from "src/utils/helpers";
import Pusher from "pusher-js";

let pusher = new Pusher("8b94f31b5cb93338e859", {
  cluster: "ap1",
});

const TheHeaderDropdownNotif = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [noti, setNoti] = useState([]);
  const [newNoti, setNewNoti] = useState(0);

  const history = useHistory();

  useEffect(() => {
    getNewNoti((result) => {
      if (_.get(result, "status") === 200) {
        setNewNoti(result.numberOfNotifications);
      }
    });

    let channel = pusher.subscribe(`notification-${getAuth().userId}`);

    if (channel) {
      channel.bind("push-new-notification", function (data) {
        if (data.numberOfNotifications) {
          setNewNoti(data.numberOfNotifications);
        }
      });
    }
  }, []);

  const [isLoading, setLoading] = useState(false);

  const handleLoadMore = (page) => {
    setPage(page);
    getNoti(page, (result) => {
      if (_.get(result, "status") === 200) {
        setNoti((noti) => noti.concat(result.data.notifications));
        setNumPage(result.data.numPages);
      }
    });
  };

  const handleResetNewNoti = () => {
    setNewNoti(0);
    resetNewNoti();
    setPage(1);
    setLoading(true);
    getNoti(1, (result) => {
      if (_.get(result, "status") === 200) {
        setNoti(result.data.notifications);
        setNumPage(result.data.numPages);
        setLoading(false);
      }
    });
  };
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      style={{ marginRight: " 16px !important" }}
    >
      <CDropdownToggle
        className="c-header-nav-link"
        caret={false}
        style={{ marginRight: " 16px !important" }}
        onClick={handleResetNewNoti}
      >
        <CIcon name="cil-bell" style={{ color: "white" }} />
        {newNoti ? (
          <CBadge shape="pill" color="danger">
            {newNoti}
          </CBadge>
        ) : null}
      </CDropdownToggle>
      <CDropdownMenu
        placement="bottom-end"
        className="pt-0"
        style={{ width: "440px", maxHeight: 400, overflowY: "auto" }}
      >
        {_.size(noti) > 0 ? (
          noti.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #E0E0E0",
                padding: 8,
                display: "flex",
                alignItems: "center",
                cursor: item.title === "New job" ? "pointer" : "default",
                pointerEvents: item.title === "New job" ? "pointer" : "none",
              }}
              onClick={() => history.push(`/posts/${item.postId}`)}
            >
              <img
                src={item.image}
                alt=""
                style={{
                  width: 50,
                  borderRadius: "50%",
                  marginRight: 5,
                }}
              ></img>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#ABABAB",
                  }}
                >
                  <p style={{ color: "#F25430" }}>
                    {item.title.toUpperCase()} !
                  </p>
                  <p>{moment(item.createdAt).format("lll")}</p>
                </div>
                <p>{item.content}</p>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <CDropdownItem style={{ display: "flex", justifyContent: "center" }}>
            Loading ...
          </CDropdownItem>
        ) : (
          <CDropdownItem style={{ display: "flex", justifyContent: "center" }}>
            You have no notifications
          </CDropdownItem>
        )}
        {page === numPage ? (
          <div></div>
        ) : (
          <div
            onClick={() => handleLoadMore(page + 1)}
            style={{
              display: "flex",
              justifyContent: "center",
              background: "#d9d2c5",
              color: "#73706c",
              padding: 5,
              cursor: "pointer",
            }}
          >
            Load More
          </div>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
