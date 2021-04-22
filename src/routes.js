import Dashboard from "./components/dashboard/Dashboard";

import Moderators from "./components/usersmanagement/moderators/Moderators";
import UserPermissions from "./components/usersmanagement/UserPermissions";

import Companies from "./components/usersmanagement/companies/Companies";
import ITers from "./components/usersmanagement/ITers/ITers";

import PostsStatistic from "./components/postsmanagement/posts-statistic/PostsStatistic";

import GroupPermissions from "./containers/admin/GroupPermissions";
import PostManagement from "./containers/admin/PostManagement";
import PostComp from "./components/comp/PostComp";


const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/usersmanagement', name: 'Users Management', component: GroupPermissions, exact: true },
  { path: '/usersmanagement/moderators', name: 'Moderators', component: Moderators, exact: true},
  { path: '/usersmanagement/users/:id/:name', name: 'Users Permissions', component: UserPermissions, exact: true},
  { path: '/usersmanagement/companies', name: 'Companies', component: Companies },
  { path: '/usersmanagement/users/:id/:name', name: 'Users Permissions', component: UserPermissions, exact: true},
  { path: '/usersmanagement/ITers', name: 'ITers', component: ITers },
  { path: '/usersmanagement/users/:id/:name', name: 'Users Permissions', component: UserPermissions, exact: true},

  { path: '/postsmanagement', name: 'Posts Management', component: PostManagement, exact: true },
  { path: '/postsmanagement/posts-approval', name: 'Posts Approval', component: PostManagement },
  { path: '/postsmanagement/posts-statistic', name: 'Posts Statistic', component: PostsStatistic },

  { path: '/grouppermissions', exact: true, name: 'Group permissions', component: GroupPermissions },

  // comp
  { path: '/post-management', component: PostComp, exact: true },
];

export default routes;
