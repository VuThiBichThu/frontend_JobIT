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
export function getNoti(page, resolve = () => {}) {
  // store.dispatch({
  //   type: types.UPDATE_CV,
  // });
  return fetch(
    `${process.env.REACT_APP_API_URL}/notifications?page=${page}&take=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.SET_NOTI,
      });
    });
}

export function resetNewNoti(resolve = () => {}) {
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getAuth().token,
    },
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

export function getNewNoti(resolve = () => {}) {
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/number`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getAuth().token,
    },
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
