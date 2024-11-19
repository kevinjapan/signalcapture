<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../src/stores/AppStore'
import AppNav from './components/App/AppNav/AppNav.vue'
import AppStatus from './components/App/AppStatus/AppStatus.vue'


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
   
   <main>
      <RouterView />
   </main>

   <AppStatus />

</template>

<style scoped>

</style>
