<script setup lang="ts">
import { ref, watch, watchEffect, onBeforeMount } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { useSearchStore }  from '../../../stores/SearchStore'
import CollectionsItemCard from '../../../components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import CollectionsItemListItem from '../../../components/CollectionsItems/CollectionsItemListItem/CollectionsItemListItem.vue'
import { storeToRefs } from 'pinia'
import ListCtrls from '../../../components/ListCtrls/ListCtrls.vue'
import PaginationNav from '../../../components/PaginationNav/PaginationNav.vue'



// SearchResults


const props = defineProps({
   search_term:String
})


const AppStore = useAppStore()

const SearchStore = useSearchStore()
const { search_results, loading, no_matches } = storeToRefs(SearchStore)

// The search term
const local_search_term = ref('')

// local ref to store's Collections Items list
const list = ref<CollectionsItem[] | null>(null)

// toggle card / list view
const card_view = ref<boolean>(AppStore.card_view)

onBeforeMount(() => {
   // pre-load the store if required (eg on page refresh)
   SearchStore.preload_collection_items()
})

watch(() => props.search_term, async(newValue) => {
   if(!newValue || newValue === '') return
   local_search_term.value = newValue
   SearchStore.flush()
   // perception - show the 'workings'
   setTimeout(() => {get_search_results()},500)
})

watchEffect(() => {
   list.value = <CollectionsItem[]>SearchStore.paginated_search_results
})

watchEffect(() => {
   card_view.value = AppStore.card_view
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
   AppStore.toggle_card_view()
}

</script>


<template>
   <ListCtrls
      :card_view="card_view"
      @toggle-view="toggle_view"
   >
      <PaginationNav
         title="top_page_nav"
         :page=SearchStore.page
         :total_num_items=SearchStore.total_num_items
         :items_per_page=SearchStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page" 
      />
   </ListCtrls>

   <!-- card / list view -->
   <section v-if="card_view && search_results" class="grid grid_cards_layout" style="margin-top:1rem;">
      <CollectionsItemCard v-for="item in list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
   </section>
   <section v-else="!card_view && search_results" class="flex flex_list_layout" style="margin-top:1rem;">
      <CollectionsItemListItem v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
   </section>

   <div v-if="no_matches && !loading" class="no_results mt_1">no matches were found</div>
   <div v-if="loading && !search_results" class="loading_spin mt_1"></div>

   <ListCtrls
      v-if="!loading && search_results && !no_matches"
      :card_view="card_view"
      @toggle-view="toggle_view"
   >
      <PaginationNav         
         title="bottom_page_nav"
         :page=SearchStore.page
         :total_num_items=SearchStore.total_num_items
         :items_per_page=SearchStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page" 
      />
   </ListCtrls>


</template>


