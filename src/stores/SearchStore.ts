import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore' 
import { remove_stopwords } from '../utilities/utilities/utilities'



// SearchStore

export const useSearchStore = defineStore('search_store', () => {

   // access the CollectionsItemsList
   const CollectionsItemsListStore = useCollectionsItemsListStore()

   // the current search
   const curr_search_term = ref<string | null>('')

   // the full results set - we return paginated subsets
   const search_results = ref<CollectionsItem[] | null>(null)

   // the current results page
   const paginated_search_results = ref<CollectionsItem[] | null>(null)

   // recent searches
   const recent_searches = ref<string[]>([])

   // search worked but no matches (empty arr)
   const no_matches = ref<boolean>(false)

   // the total num of results
   const total_num_items = ref<number>(0)

   // the current page
   const page = ref<number>(1)

   // paginated items per page - future : in AppStore
   const items_per_page = ref<number>(20)

   // is loading flag
   const loading = ref<boolean>(false)

   // errors encountered
   const error = ref<string | null>(null)


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

         if(search_results.value?.length === 0) {
            no_matches.value = true
         }
         else {
            register_as_recent_search(search_term)  
         }
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

   const register_as_recent_search = (search_term: string) =>  {
      if(!search_term) return
      const no_duplicates_set = new Set(recent_searches.value)
      no_duplicates_set.add(search_term)
      recent_searches.value = [...no_duplicates_set]
   }

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
      
      // to do : remove duplicate CollectionsItemRecords from results
      
      let collated = <CollectionsItem[]>[]
      for(const results of my_results) {
         collated = collated.concat(results)
      }
      search_results.value = collated
      
      if(search_results.value) total_num_items.value = search_results.value?.length  
   }
   
   const build_paginated_list = () => {
      if(search_results.value) {
         let start_index = ((page.value - 1) * items_per_page.value)
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

   watchEffect(() => {
      // workaround - this does get the .value as a string correctly w/ casting:
      // issue - CollectionsItemsListStore.error.value returns 'undefined' while CollectionsItemsListStore.error 
      //         returns correct object, from which we can assign string.
      error.value = CollectionsItemsListStore.error ? CollectionsItemsListStore.error as unknown as string: null
   })

   return {

      preload_collection_items,
      search,
      search_results,
      paginated_search_results,
      page,
      recent_searches,
      total_num_items,
      items_per_page,
      no_matches,

      set_page,
      flush,
      loading,
      error
   }
 
})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}