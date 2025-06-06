import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore' 
import { remove_stopwords } from '../utilities/utilities/utilities'



// SearchStore

export const useSearchStore = defineStore('search_store', () => {

   const AppStore = useAppStore()

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

   // limit num of recent searches
   const max_recent_searches = ref<number>(5)

   // search worked but no matches (empty arr)
   const no_matches = ref<boolean>(false)

   // the total num of results
   const total_num_items = ref<number>(0)

   // the current page
   const page = ref<number>(0)

   // paginated items per page - future : in AppStore
   const items_per_page = ref<number>(AppStore.items_per_page)

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
   
      setTimeout(() => loading.value = false,500) // perception - show the loading
      return true      
   }

   // future : we could search for eg [search_term,...search_term.split(' ')] 
   // would allow us to give weight to complete matches, but for now we ignore complete search_term in favor of matching separate tokens 
   // if we duplicate whole search term eg ['Arbroath Harbour','Arbroath','Harbour'] we get duplicates eg on [0] and [1] 
   const register_as_recent_search = (search_term: string) =>  {

      if(!search_term) return
      if(recent_searches.value.length > max_recent_searches.value) recent_searches.value.shift()

      const no_duplicates_set = new Set(recent_searches.value)
      no_duplicates_set.add(search_term)
      recent_searches.value = [...no_duplicates_set]
   }

   function filter_search_results(search_term: string) {

      if(!search_term || search_term === '') return false
      let search_terms: string[] = search_term.includes(' ') ? [...search_term.split(' ')] : [search_term]
      search_terms = remove_stopwords(search_terms)
      let my_results = <CollectionsItem[][]>[]

      // we build array of results for each search token
      for(const term of search_terms) {
         my_results.push(<CollectionsItem[]>CollectionsItemsListStore.collections_items_list?.filter((elem: CollectionsItem) => {
            // future : review - too many iterations here - performance // console.log(typeof elem)
            const target = elem.title + elem.content_desc + elem.file_name + elem.author_creator + elem.people
            if(target.toUpperCase().includes(term.toUpperCase())) return elem            
         }))
      }
      
      // collate into single results array
      let collated = <CollectionsItem[]>[]
      for(const results of my_results) {
         collated = collated.concat(results)
      }

      // remove duplicate CollectionsItemRecords from results eg search "streets buildings" - only include first occurence
      const no_duplicates_array = collated.filter((obj, index, arr) => index === arr.findIndex((t) => t.id === obj.id))

      search_results.value = no_duplicates_array      
      if(search_results.value) total_num_items.value = search_results.value?.length  
   }
   
   const build_paginated_list = () => {
      if(search_results.value) {
         let start_index = ((page.value - 1) * items_per_page.value)
         paginated_search_results.value = search_results.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   watchEffect(() => {
      if(curr_search_term.value !== null && curr_search_term.value !== '') {
         filter_search_results(curr_search_term.value)
      }
      no_matches.value = search_results.value?.length === 0 ? true : false
      build_paginated_list()
   })

   // set page to 0 if no results
   watchEffect(() => {
      if(paginated_search_results.value) {
         if(paginated_search_results.value.length < 1) page.value = 0
      }
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

      curr_search_term,
      search_results,
      paginated_search_results,
      page,
      recent_searches,
      total_num_items,
      items_per_page,
      no_matches,
      loading,
      error,

      preload_collection_items,
      search,
      set_page,
      flush,
   }
 
})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}