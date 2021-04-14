import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";
import addMod from "./addMod";

export default combineReducers({
  loginAdmin,
  listModerator,
  addMod
});
