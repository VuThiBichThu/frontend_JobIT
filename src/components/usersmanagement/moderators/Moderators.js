import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listModerator } from "src/redux/actions/listModerator";

const Moderators = () => {
  const [moderators, setModerators] = useState([]);
  const storeListModerator = useSelector(
    (store) => store.listModerator
  );
  useEffect(() => {
    listModerator();
  }, []);
  useEffect(() => {
    if (!storeListModerator) {
      return;
    }
    setModerators(storeListModerator);
  }, [storeListModerator]);
  return <div>This is Moderators</div>;
};

export default Moderators;
