<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchForm from '../components/Search/SearchForm/SearchForm.vue'
import SearchResults from '../components/Search/SearchResults/SearchResults.vue'


// SearchView

// building search_term w/ SearchForm
const search_term = ref('') // (search_store.last_search_term)

// assigning search_term to SearchResults and execute search
const real_search_term = ref('')

const submit_search_term = () => {
   real_search_term.value = search_term.value.trim()
}

onMounted(() => {
   // real_search_term.value = search_store.last_search_term
   window.scroll(0,0)
})

onUnmounted(() => {
   // search_store.set_last_search_term(real_search_term.value)
})

</script>

<template>
   <section class="mt_3">
      <SearchForm 
         v-model="search_term" 
         @submit-search-term="submit_search_term" 
      />   
      <SearchResults 
         :search_term="real_search_term"
      />
   </section>
</template>


