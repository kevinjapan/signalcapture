import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useCollectionsItemsListStore } from './CollectionsItemsListStore' 




// TagsResultsListStore

export const useTagsResultsListStore = defineStore('tags_results_list_store', () => {
   
   const AppStore = useAppStore()

   // access the CollectionsItemsList
   const CollectionsItemsListStore = useCollectionsItemsListStore()

   // the current search
   const curr_search_tag = ref<string | null>('')

   // the full results set - we return paginated subsets
   const search_results = ref<CollectionsItem[] | null>(null)

   // the current results page
   const paginated_search_results = ref<CollectionsItem[] | null>(null)

   // search worked but no matches (empty arr)
   const no_matches = ref<boolean>(false)

   // the total num of results
   const total_num_items = ref<number>(0)

   // the current page
   const page = ref<number>(1)

   // paginated items per page - future : in AppStore
   const items_per_page = ref<number>(AppStore.items_per_page)

   // is loading flag
   const loading = ref<boolean>(false)

   // errors encountered
   const error = ref<string | null>(null)


   function preload_collection_items() {
      CollectionsItemsListStore.load_collection_items()
   }

   function search(selected_tag: string) {

      loading.value = true
      curr_search_tag.value = selected_tag
      try {
         if(CollectionsItemsListStore.collections_items_list) {
            filter_search_results(selected_tag)
         }

         if(search_results.value?.length === 0) {
            no_matches.value = true
         }
      }
      catch(error) {
         return false
      }
      // perception - show the loading
      setTimeout(() => loading.value = false,1000)
      return true      
   }

   function filter_search_results(curr_tag_id: string) {

      if(!curr_tag_id || parseInt(curr_tag_id) < 1) return false
      search_results.value =  <CollectionsItem[]>CollectionsItemsListStore.collections_items_list?.filter((elem: CollectionsItem) => {
            // to do : review - too many iterations here - performance // console.log(typeof elem)
            // const target = elem.title + elem.content_desc + elem.file_name + elem.author_creator + elem.people
            // if(target.toUpperCase().includes(term.toUpperCase())) return elem            
            const temp_set = new Set(elem.tags)
            return temp_set.has(curr_tag_id.toString())
         })   
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
      if(curr_search_tag.value !== null && curr_search_tag.value !== '') {
         filter_search_results(curr_search_tag.value)
      }
      no_matches.value = search_results.value?.length === 0 ? true : false
      build_paginated_list()
   })
   
   
   watchEffect(() => {
      if(curr_search_tag.value !== '') page.value = 1
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

      search_results,
      paginated_search_results,
      page,
      total_num_items,
      items_per_page,
      no_matches,
      curr_search_tag,
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
   import.meta.hot.accept(acceptHMRUpdate(useTagsResultsListStore, import.meta.hot))
}