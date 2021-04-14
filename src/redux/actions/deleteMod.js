import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function deleteMod(id, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_MOD_API,
  });
  console.log(id);
  return fetch(
    `https://job-it-cnpmp.herokuapp.com/api/v1/moderators/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token
      },
      // body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.DELETE_MOD_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_MOD_API_FAILED,
      });
    });
}
