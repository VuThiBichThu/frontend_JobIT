import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";
import addMod from "./addMod";
import deleteMod from "./deleteMod";
import listModPermissions from "./listModPermissions";
import getRolePermissions from "./getRolePermissions";

export default combineReducers({
  loginAdmin,
  listModerator,
  addMod,
  deleteMod,
  listModPermissions,
  getRolePermissions
});
