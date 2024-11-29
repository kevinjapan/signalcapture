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

   <section class="mt_5">
      <h1>HomeView in here</h1>

      <p>Recent Searches</p>
      <ul>
         <li v-for="search_term in recent_searches_list">{{ search_term }}</li>
      </ul>
   </section>

</template>


<style scoped>
ul {list-style:none;
   user-select: none;}

</style>