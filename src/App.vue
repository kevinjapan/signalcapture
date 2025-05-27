<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../src/stores/AppStore'
import { useAppHelpStore } from './stores/AppHelpStore'
import AppNav from './components/App/AppNav/AppNav.vue'
import Options from '@/components/Options/Options.vue'
// import AppStatus from './components/App/AppStatus/AppStatus.vue'
import AppHelp from '@/components/App/AppHelp/AppHelp.vue'
import AppFooter from './components/App/AppFooter/AppFooter.vue'


// App Root Component

const route = useRoute()
const app_store = useAppStore()
const AppHelpStore = useAppHelpStore()

const is_dimmed_bg = ref<boolean>(false)

// synch AppNav w/ current view on initial load
onMounted(() => {
   if(route.fullPath === '/') app_store.curr_view_route = '/'
})

// synch AppNav w/ current view on refresh page
watch(() => route.fullPath, () => {
   // app_store.curr_view_route = route.fullPath
})

watchEffect(() => {
   is_dimmed_bg.value = AppHelpStore.is_open
})

const close_bg_dimmer = () => {
   is_dimmed_bg.value = false
   AppHelpStore.close()
}

</script>

<template>

   <AppNav />

   <Options />
   
   <main>
   
      <AppHelp/>

      <RouterView />
      
   </main>

   
   <section class="bg_dimmer" :class="{is_active : is_dimmed_bg}" @click="close_bg_dimmer"></section>

   <AppFooter />

</template>

<style scoped>
/* 
   bg_dimmer
   currently specific for AppHelp (see close_bg_dimmer() above)
   workaround : visibility:hidden seems to be working - keep an eye on it 
                display won't work as it doesn't show transition
*/
.bg_dimmer {
   visibility:hidden;
   position:fixed;
   top:0;
   left:0;
   z-index:var(--over_over_nav_layer);
   width:100%;
   height:100%;
   background:black;
   
   /* transitions */
   opacity:0;
   -webkit-transition:opacity .5s ease-in-out;
   -o-transition:opacity .5s ease-in-out;
   transition:opacity .5s ease-in-out;
}
.bg_dimmer.is_active {

   visibility:visible;

   /* transitions */
   opacity:.5;
   -webkit-transition:opacity .5s ease-in-out;
   -o-transition:opacity .5s ease-in-out;
   transition:opacity .5s ease-in-out;
}
</style>
