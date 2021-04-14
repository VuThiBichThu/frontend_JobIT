import Dashboard from "./components/dashboard/Dashboard";

import Moderators from "./components/usersmanagement/moderators/Moderators";
import Moderator from "./components/usersmanagement/moderators/Moderator";

import Companies from "./components/usersmanagement/companies/Companies";
import ITers from "./components/usersmanagement/ITers/ITers";

import Users from "./components/grouppermissions/Users";
import User from "./components/grouppermissions/User";

import PostsApproval from "./components/postsmanagement/posts-approval/PostsApproval";
import PostsStatistic from "./components/postsmanagement/posts-statistic/PostsStatistic";

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/usersmanagement', name: 'Users Management', component: Users, exact: true },
  { path: '/usersmanagement/moderators', name: 'Moderators', component: Moderators, exact: true},
  { path: '/usersmanagement/moderators/:id/:name', name: 'Moderator Permissions', component: Moderator, exact: true},
  { path: '/usersmanagement/companies', name: 'Companies', component: Companies  },
  { path: '/usersmanagement/ITers', name: 'ITers', component: ITers },

  { path: '/postsmanagement', name: 'Posts Management', component: Users, exact: true },
  { path: '/postsmanagement/posts-approval', name: 'Posts Approval', component: PostsApproval },
  { path: '/postsmanagement/posts-statistic', name: 'Posts Statistic', component: PostsStatistic },

  { path: '/grouppermissions', exact: true, name: 'Group permissions', component: Users },
  { path: '/grouppermissions/:id', exact: true, name: 'Group permissions details', component: User },

];

export default routes;
