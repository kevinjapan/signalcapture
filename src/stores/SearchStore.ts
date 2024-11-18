import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'
import { remove_stopwords } from '../utilities/utilities/utilities'


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

   // the results dataset - SearchStore will return 'pages' from this dataset
   const search_results = ref<CollectionsItem[] | null>(null)

   // the results for current page
   const paginated_search_results = ref<CollectionsItem[] | null>(null)

   // the current page
   const page = ref<number>(1)

   const loading = ref<boolean>(false)

   // search worked but no matches were found (empty arr)
   const no_matches = ref<boolean>(false)

   const total_num_items = ref<number>(0)

   const items_per_page = ref<number>(20)
   
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

   
   // future : we could search for eg [search_term,...search_term.split(' ')] 
   // would allow us to give weight to complete matches, but for now we ignore complete search_term in favor of matching separate tokens 
   // if we duplicate whole search term eg ['Arbroath Harbour','Arbroath','Harbour'] we get duplicates eg on [0] and [1] 

   function filter_search_results(search_term: string) {

      if(!search_term || search_term === '') return false

      let search_terms: string[] = search_term.includes(' ') ? [...search_term.split(' ')] : [search_term]
      search_terms = remove_stopwords(search_terms)

      let my_results = <CollectionsItem[][]>[]

      for(const term of search_terms) {
         my_results.push(<CollectionsItem[]>CollectionsItemsListStore.collections_items_list?.filter((elem: CollectionsItem) => {
            // to do : review - too many iterations here - performance // console.log(typeof elem)
            const target = elem.title + elem.content_desc + elem.file_name + elem.author_creator + elem.people
            if(target.toUpperCase().includes(term.toUpperCase())) return elem            
         }))
      }
      
      let collated = <CollectionsItem[]>[]
      for(const results of my_results) {
         collated = collated.concat(results)
      }
      search_results.value = collated
      
      if(search_results.value) total_num_items.value = search_results.value?.length  
   }
   
   const build_paginated_list = () => {
      if(search_results.value) {
         // to do : edge cases
         const start_index = ((page.value - 1) * items_per_page.value)
         paginated_search_results.value = search_results.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   // watch store.collections_items_list
   watchEffect(() => {
      if(curr_search_term.value !== null && curr_search_term.value !== '') {
         filter_search_results(curr_search_term.value)
      }
      no_matches.value = search_results.value?.length === 0 ? true : false
      build_paginated_list()
   })
   
   function set_page(new_page: number) {
      page.value = new_page
   }

   function flush() {
      search_results.value = []
      total_num_items.value = 0
      page.value = 1
   }

   return {
      search,
      search_results,
      paginated_search_results,
      preload_collection_items,
      loading,
      no_matches,
      set_page,
      page,
      total_num_items,
      items_per_page,
      flush
   }
 
})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}