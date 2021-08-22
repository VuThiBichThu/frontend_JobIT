// import * as types from "../constants";
// import store from "../store";
// export function setInfo(data) {
//   store.dispatch({
//     type: types.SET_NOTI,
//     payload: data,
//   });
// }

import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function setNoti( resolve = () => {}) {
  // store.dispatch({
  //   type: types.UPDATE_CV,
  // });
  return fetch(`${process.env.REACT_APP_API_URL}/notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getAuth().token,
      // "Access-Control-Allow-Origin": "*"
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {

      resolve(data);
      store.dispatch({
        payload: data,
        type: types.SET_NOTI,
      });
    });
}
