<script setup lang="ts">
import { ref, watch, watchEffect, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useSearchStore }  from '../../../stores/SearchStore'
import CollectionsItemListContainer from '@/components/CollectionsItems/CollectionsItemListContainer/CollectionsItemListContainer.vue'



// SearchResults

const props = defineProps({
   search_term:String
})

const AppStore = useAppStore()
const SearchStore = useSearchStore()

const { loading, no_matches, error } = storeToRefs(SearchStore)


// The search term
const local_search_term = ref('')

// local ref to store's Collections Items list
const list = ref<CollectionsItem[] | null>(null)

//
const my_error = ref<string | null>(null)

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

onBeforeMount(() => {
   // pre-load the store if required (eg on page refresh)
   SearchStore.preload_collection_items()
})

watch(() => props.search_term, () => {
   if(props.search_term) local_search_term.value = props.search_term
   SearchStore.flush()
   get_search_results()
})

watchEffect(() => {
   list.value = <CollectionsItem[]>SearchStore.paginated_search_results
})

watchEffect(() => {
   my_error.value = error.value
})

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

const get_search_results = () => {
   try {
      if(SearchStore.search(local_search_term.value)) {
         // search was successful, SearchStore properties will be updated accordingly
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

const set_page = (page: number) => {
   SearchStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = SearchStore.page + step
   if(new_page < 1 || new_page > Math.ceil(SearchStore.total_num_items / SearchStore.items_per_page)) return
   SearchStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   AppStore.switch_list_view_type()
}
</script>


<template>

   <div class="error_notification" v-if="my_error">
      <p>Oops! Error encountered: {{ my_error }}</p>
   </div>

   <section v-else>

      <CollectionsItemListContainer 
         :list_view_type="list_view_type"
         @toggle-view="toggle_view"
         :page=SearchStore.page
         :total_num_items=SearchStore.total_num_items
         :items_per_page=SearchStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page"
         :list="list"
      />
   

      <div v-if="no_matches && !loading" class="no_results mt_1">no matches were found</div>
      
      <div v-if="loading" class="loading_spin mt_1"></div>


   </section>

</template>


