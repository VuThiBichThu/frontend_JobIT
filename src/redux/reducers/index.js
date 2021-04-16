import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";
import addMod from "./addMod";
import deleteMod from "./deleteMod";
import listModPermissions from "./listModPermissions";
import getRolePermissions from "./getRolePermissions";
import updateRolePermissions from "./updateRolePermissions";
import getPosts from "./getPosts";
import getUnacceptedPosts from "./getUnacceptedPosts";
import deletePost from "./deletePost";
import approvePost from "./approvePost";

export default combineReducers({
  loginAdmin,
  listModerator,
  addMod,
  deleteMod,
  listModPermissions,
  getRolePermissions,
  updateRolePermissions,
  getPosts,
  getUnacceptedPosts,
  deletePost,
  approvePost
});
