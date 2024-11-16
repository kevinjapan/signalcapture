import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'


// SearchStore
// mindshift here, I've prev related reactivity between state and template.
// composables introduce sharing state btwn components and stores/composables/hooks
// whereby you don't rely on a return value from a func (as I prev would have done
// w/ search() herein, but rather, update the state and  have the client 'consume' 
// the reactive state and respond on it's updating

export const useSearchStore = defineStore('search_store', () => {

   // we access the CollectionsItemsList
   const CollectionsItemsListStore = useCollectionsItemsListStore()


   const curr_search_term = ref<string | null>('')

   const loading = ref<boolean>(false)

   // search worked but no matches were found (empty arr)
   const no_matches = ref<boolean>(false)

   // the results dataset - SearchStore will return 'pages' from this dataset
   const search_results = ref<CollectionsItem[] | null>(null)

   
   function preload_collection_items() {
      CollectionsItemsListStore.load_collection_items()
   }

   function search(search_term: string) {

      loading.value = true
      curr_search_term.value = search_term
      try {
         if(CollectionsItemsListStore.collections_items_list) {
            filter_search_results(search_term)
         }

         if(search_results.value?.length === 0) no_matches.value = true
      }
      catch(error) {
         return false
      }
      // perception - show the loading
      setTimeout(() => loading.value = false,1000)
      return true      
   }

   function filter_search_results(search_term: string) {
      search_results.value = <CollectionsItem[]>CollectionsItemsListStore.collections_items_list?.filter((elem: CollectionsItem) => {
         const target = elem.title + elem.content_desc + elem.file_name + elem.author_creator + elem.people
         if(target.toUpperCase().includes(search_term.toUpperCase())) return elem
      })
   }


   // watch store.collections_items_list
   watchEffect(() => {
      if(curr_search_term.value !== null && curr_search_term.value !== '') {
         filter_search_results(curr_search_term.value)
      }
      no_matches.value = search_results.value?.length === 0 ? true : false
   })

   return {
      search,
      search_results,
      preload_collection_items,
      loading,
      no_matches
   }
 
})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}