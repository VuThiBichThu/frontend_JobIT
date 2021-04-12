import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";

export default combineReducers({
  loginAdmin,
  listModerator
});
