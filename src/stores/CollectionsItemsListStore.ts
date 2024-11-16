import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'



// CollectionsItemsListStore
// generally, we always extract paginated list

export const useCollectionsItemsListStore = defineStore('collections_items_store', () => {

   // dataset
   const baseUrl = '/data/collection-items - sm.json'

   const { payload, error, loading, fetchData } = useFetch<CollectionsItem[]>(baseUrl,{}) as UseFetchReturn<CollectionsItem[]>


   // The CollectionsItemsList
   // in our no-server demo, we load all (limited no.) items into this array and paginate on client.
   const collections_items_list = ref<CollectionsItem[] | null>(null)

   const paginated_collections_items_list = ref<CollectionsItem[] | null>(null)

   // The CollectionsItem (current selected/viewed)
   const collections_item = ref<CollectionsItem | null>(null)

   const page = ref<number>(1)

   const total_num_items = ref<number>(0)

   const items_per_page = ref<number>(20)


   // load_collection_items
   function load_collection_items() {

      // ensure the list has been downloaded
      if(!collections_items_list.value) fetchData()
      
      if(payload) {
         collections_items_list.value = payload.value?.data
         if(collections_items_list.value) total_num_items.value = collections_items_list.value?.length
         build_paginated_list()
      }
      else {
         console.log('no payload')
      }
      return {
         outcome:"success",
         error:'to do : assign error here'
      }
   }

   const build_paginated_list = () => {
      if(collections_items_list.value) {
         // to do : edge cases
         const start_index = ((page.value - 1) * items_per_page.value)
         console.log('page',page.value,'start_index',start_index)
         paginated_collections_items_list.value = collections_items_list.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      // to do : add error handling for invalid json - test w/ broken/invalid json files
      collections_items_list.value = payload.value?.data
      if(collections_items_list.value) total_num_items.value = collections_items_list.value?.length
      build_paginated_list()
   })


   function load_collection_items_list() {
      if(!collections_items_list.value) load_collection_items()
      return collections_items_list
   }

   function set_page(new_page: number) {
      page.value = new_page
      console.log('will filter by page',page.value)
   }

   return { 
      load_collection_items,
      payload, 
      error, 
      loading,
      collections_items_list,
      paginated_collections_items_list,
      collections_item,
      load_collection_items_list,
      set_page,
      page,
      total_num_items,
      items_per_page
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionsItemsListStore, import.meta.hot))
}
