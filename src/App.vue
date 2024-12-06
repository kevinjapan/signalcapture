<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../src/stores/AppStore'
import AppNav from './components/App/AppNav/AppNav.vue'
import Options from '@/components/Options/Options.vue'
import AppStatus from './components/App/AppStatus/AppStatus.vue'
import AppHelp from '@/components/App/AppHelp/AppHelp.vue'
import AppFooter from './components/App/AppFooter/AppFooter.vue'


// App Root Component

const route = useRoute()
const app_store = useAppStore()

// synch AppNav w/ current view on initial load
onMounted(() => {
   if(route.fullPath === '/') app_store.curr_view_route = '/'
})

// synch AppNav w/ current view on refresh page
watch(() => route.fullPath, () => {
   // app_store.curr_view_route = route.fullPath
})

</script>

<template>

   <AppNav />

   <Options />
   
   <main>
      
      <AppHelp />
      <!-- to do : Position affects - so there is somit else influencing - not just position? -->

      <RouterView />
      
   </main>

   <AppStatus />

   <AppFooter />

</template>

<style scoped>

</style>
