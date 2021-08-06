import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function listUserPermissions(id, resolve = () => {}) {
  store.dispatch({
    type: types.ADMIN_GET_USER_PERMISSIONS,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${id}/permissions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
        // "Access-Control-Allow-Origin": "*"
      },
      // body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ADMIN_GET_USER_PERMISSIONS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADMIN_GET_USER_PERMISSIONS_FAILED,
      });
    });
}
