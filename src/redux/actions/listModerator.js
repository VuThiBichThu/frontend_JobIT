import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function listModerator(resolve = () => {}) {
  store.dispatch({
    type: types.ADMIN_GET_LIST_MOD,
  });
  return fetch(
    "https://job-it-cnpmp.herokuapp.com/api/v1/moderators",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
        // "Access-Control-Allow-Origin": "*"
      },
    //  body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      console.log(data);
      store.dispatch({
        payload: data,
        type: types.ADMIN_GET_LIST_MOD_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADMIN_GET_LIST_MOD_FAILED,
      });
    });
}
