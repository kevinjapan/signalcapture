<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/SearchStore'


const router = useRouter()
const SearchStore = useSearchStore()

const recent_searches_list = ref<string[] | null>(null)

watchEffect(() => {
   recent_searches_list.value = SearchStore.recent_searches
})

const search_for = (search_term: string) => {
   SearchStore.search(search_term)
   router.push(`/search/`)
}
</script>

<template>
    <section>
         <p>Recent Searches 2.0</p>
         <ul>
            <li class="recent_search" 
               v-for="search_term in recent_searches_list"
               @click="search_for(search_term)">
               {{ search_term }}
            </li>
         </ul>
      </section>
</template>

<style scoped>
.recent_search {
   width:fit-content;
   padding:.15rem .5rem;
   border-radius:.5rem;
   cursor:pointer;
}
</style>