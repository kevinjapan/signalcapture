<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useSearchStore }  from '../../../stores/SearchStore'
import CollectionsItemCard from '../../../components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import { storeToRefs } from 'pinia';



// SearchResults

const props = defineProps({
   search_term:String
})

const search_store = useSearchStore()
const { search_results, loading, no_matches } = storeToRefs(search_store)

// The search term
const local_search_term = ref('')


onBeforeMount(() => {
   // pre-load the store if required (eg on page refresh)
   search_store.load_collection_items()
})

watch(() => props.search_term, async(newValue) => {
   if(!newValue || newValue === '') return
   local_search_term.value = newValue
   // perception - show the 'workings'
   setTimeout(() => {get_search_results()},500)
})

const get_search_results = () => {
   try {
      if(search_store.search(local_search_term.value)) {
         // search was successful, search_store properties will be updated accordingly
      }
      else throw 'The search failed.'
   }
   catch(error) {
      return {
         outcome: 'fail',
         message: error
      }
   }
   return {
      outcome: 'success',
      message: 'The search was completed successfully'
   }
}
</script>


<template>

   <section v-if="search_results" class="grid grid_cards_layout" style="margin-top:2rem;">
      <CollectionsItemCard v-for="item in search_results" :key="item.id"  :item="item as unknown as CollectionsItem" />
   </section>
   <div v-if="no_matches && !loading" class="no_results mt_1">no matches were found</div>
   <div v-if="loading" class="loading_spin mt_1"></div>

</template>


