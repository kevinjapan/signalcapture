import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({

   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         name: 'home',
         path: '/',
         component: () => import('../views/HomeView.vue')
      },
      {
         name: 'collections',
         path: '/collections',
         component: () => import('../views/FilesView.vue') 
      },
      // legacy : files -> collections
      {
         name: 'files',
         path: '/files',
         component: () => import('../views/FilesView.vue') 
      },
      {
         name: 'search',
         path: '/search',
         component: () => import('../views/SearchView.vue') 
      },
      {
         name: 'browse',
         path: '/browse',
         component: () => import('../views/BrowseView.vue') 
      },
      {
         name: 'packages',
         path: '/packages',
         component: () => import('../views/PackagesListView.vue') 
      },
      {
         name: 'package',
         path: '/packages/:id',
         component: () => import('../views/PackageView.vue') 
      },
      {
         name: 'package_print',
         path: '/packages/:id/print',
         component: () => import('../views/PackagePrintView.vue')
      },
      {
         name: 'collection-item',
         path: `/browse/collections-item/:id`,
         component: () => import('../views/CollectionsItemView.vue')
      },
      {
         name: 'tag',
         path: '/tags/:id',
         component: () => import('../views/TagsView.vue') 
      },
      {
         name: 'tags',
         path: '/tags',
         component: () => import('../views/TagsView.vue') 
      },
      
// to do : remove once safari fixed
      {
         name: 'safari-test',
         path: '/safari-test',
         component: () => import('../views/SafariTestView.vue') 
      }
   ]
})

export default router