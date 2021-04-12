import * as types from "../constants";
import store from "../store";
export function loginAdmin(data, resolve = () => { }) {
  store.dispatch({
    type: types.LOGIN_API,
  });
  return fetch(
    "https://job-it-cnpmp.herokuapp.com/api/v1/admin/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.LOGIN_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.LOGIN_API_FAIL,
      });
    });
}
