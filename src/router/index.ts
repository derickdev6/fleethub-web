import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import('@/pages/VehiclesPage.vue'),
  },
  {
    path: '/rents',
    name: 'rents',
    component: () => import('@/pages/RentsPage.vue'),
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('@/pages/MaintenancePage.vue'),
  },

  {
    path: '/events',
    name: 'events',
    component: () => import('@/pages/EventsPage.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/pages/ClientsPage.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/AccountPage.vue'),
  },
  {
    path: '/vehicles/:plate',
    name: 'vehicle-details',
    component: () => import('@/pages/vehicles/VehicleDetailsPage.vue'),
  },
  {
    path: '/rents/:id',
    name: 'rent-details',
    component: () => import('@/pages/rents/RentDetailsPage.vue'),
}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
