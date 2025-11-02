import MainLayout from 'layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/news' },
      { path: '/news', component: () => import('pages/NewsPage.vue') },
      { path: '/links', component: () => import('src/pages/LinksPage.vue') },
      { path: '/search', component: () => import('pages/SearchPage.vue') },
      { path: '/saved', component: () => import('pages/SavedPage.vue') },
      { path: '/user', component: () => import('pages/UserPage.vue') },
    ],
  },
]

export default routes
