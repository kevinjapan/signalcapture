<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'
import { useSearchStore }  from '@/stores/SearchStore'
import SearchForm from '../components/Search/SearchForm/SearchForm.vue'
import SearchResults from '../components/Search/SearchResults/SearchResults.vue'



// SearchView

const AppStore = useAppStore()
const SearchStore = useSearchStore()
const route = useRoute()

// building search_term w/ SearchForm
const search_term = ref('') // (search_store.last_search_term)

// assigning search_term to SearchResults and execute search
const real_search_term = ref('')

onMounted(() => {
   AppStore.curr_view_route = route.fullPath
   window.scroll(0,0)
})

watchEffect(() => {
   search_term.value = SearchStore.curr_search_term
})

const submit_search_term = () => {
   real_search_term.value = search_term.value.trim()
}


</script>

<template>
   <section>
      <SearchForm 
         v-model="search_term" 
         @submit-search-term="submit_search_term" 
      />   
      <SearchResults 
         :search_term="real_search_term"
      />
   </section>
</template>


