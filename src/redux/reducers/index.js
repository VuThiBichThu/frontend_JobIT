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

import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import apply from "./apply";
import getPostsComp from "./getPostsComp";
import getAppliers from "./getAppliers";
import addPost from "./addPost";
import getProfile from "./getProfile";
import updateProfile from "./updateProfile";
import getCV from "./getCV";
import getITerCV from "./getITerCV";
import setShowSidebar from "./setShowSidebar";
import createCV from "./createCV";
import getSignature from "./getSignature";
import uploadImage from "./uploadImage";
import updateCV from "./updateCV";
import createFeedback from "./createFeedback";
import deleteFeedback from "./deleteFeedback";
import getFeedback from "./getFeedback";
import getCompany from "./getCompany";
import getPostList from "./getPostList";
import setInfo from "./setInfo";


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
  updateUserPermissions,

  login,
  setShowSidebar,
  register,
  forgotPassword,
  apply,
  getPostsComp,
  getAppliers,
  addPost,
  getProfile,
  updateProfile,
  getCV,
  getITerCV,
  createCV,
  getSignature,
  uploadImage,
  updateCV,
  createFeedback,
  deleteFeedback,
  getFeedback,
  getCompany,
  getPostList,
  setInfo
});
