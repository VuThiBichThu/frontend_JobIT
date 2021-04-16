import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function getPosts(resolve = () => {}) {
  store.dispatch({
    type: types.GET_POSTS,
  });
  return fetch(
    "https://job-it-cnpmp.herokuapp.com/api/v1/posts",
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
      store.dispatch({
        payload: data,
        type: types.GET_POSTS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_POSTS_FAILED,
      });
    });
}
