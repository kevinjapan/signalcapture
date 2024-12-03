<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'


const SearchStore = useSearchStore()

const recent_searches_list = ref<string[] | null>(null)

watchEffect(() => {
   recent_searches_list.value = SearchStore.recent_searches
})
</script>


<template>

   <section class="dashboard mt_5">
      
      <section>
         <h1>Dashboard</h1>
      </section>

      <section class="site_status_notification">
         <p>
            Hello, this is a static-site demo and not all features of the full application are available.
         </p>
         <p>
            This site is under development and not all design features are yet optimized for IOS platforms,
            nor is the site yet responsive on mobile and smaller platforms.
         </p>
      </section>

      <section>
         <p>Recent Searches</p>
         <ul>
            <li class="recent_search" v-for="search_term in recent_searches_list">{{ search_term }}</li>
         </ul>
      </section>
   
   </section>

</template>


<style scoped>
section.dashboard {
   display:grid;
   grid-template-columns:1fr;
}
section.dashboard section {
   margin:1rem;
   padding:1rem 2rem;
   border:solid 1px white;
   border-radius:.5rem;
}
@media (min-width: 768px) {
   section.dashboard {
      grid-template-columns:1fr 1fr 1fr;
   }
}
ul {
   list-style:none;
   user-select: none;
}
section.site_status_notification {
   border:solid 1px white;
   border-radius:.5rem;
}
.recent_search {
   width:fit-content;
   padding:.15rem .5rem;
   border-radius:.5rem;
   cursor:pointer;
}
</style>