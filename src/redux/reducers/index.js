import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";
import listCompany from "./listCompany";
import listITer from "./listITer";
import addMod from "./addMod";
import deleteMod from "./deleteMod";
import deleteCompany from "./deleteCompany";
import deleteITer from "./deleteITer";
import listUserPermissions from "./listUserPermissions";
import getRolePermissions from "./getRolePermissions";
import updateRolePermissions from "./updateRolePermissions";
import getPosts from "./getPosts";
import getUnacceptedPosts from "./getUnacceptedPosts";
import deletePost from "./deletePost";
import approvePost from "./approvePost";
import updateUserPermissions from "./updateUserPermissions";


export default combineReducers({
  loginAdmin,
  listModerator,
  listCompany,
  listITer,
  addMod,
  deleteMod,
  deleteCompany,
  deleteITer,
  listUserPermissions,
  getRolePermissions,
  updateRolePermissions,
  getPosts,
  getUnacceptedPosts,
  deletePost,
  approvePost,
  updateUserPermissions
});
