import { createWebHistory, createRouter} from 'vue-router';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/repositories/:repository+",
    name: "Repository",
    component: Repository,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;