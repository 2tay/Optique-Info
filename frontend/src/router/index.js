import { createRouter, createWebHistory } from 'vue-router'
import welcome from '../views/Welcome.vue'
import LoginView from '../views/LoginView.vue'
import Clients from '../views/Clients.vue'
import Dashboard from '../views/Dashboard.vue'
import AddUser from '../views/addClient.vue'
import ClientDetail from '@/components/clients/ClientDetail.vue';


const routes = [
  {
    path: '/welcome',
    name: 'welcome',
    component: welcome
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
  },
  {
    path: '/adduser',
    name: 'adduser',
    component: AddUser
  },
  { path: '/clients/:id', component: ClientDetail, name: 'clientdetail' }, // Use "name" to easily navigate to this route

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
