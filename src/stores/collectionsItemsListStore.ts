import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'



// CollectionsItemsListStore

export const useCollectionsItemsListStore = defineStore('collections_items_store', () => {

   // dataset
   const baseUrl = '/data/collection-items - sm.json'

   const { payload, error, loading, fetchData } = useFetch<CollectionsItem[]>(baseUrl,{}) as UseFetchReturn<CollectionsItem[]>


   // The CollectionsItemsList
   // in our no-server demo, we load all (limited no.) items into this array and paginate on client.
   const collections_items_list = ref<CollectionsItem[] | null>(null)

   // The CollectionsItem (current selected/viewed)
   const collections_item = ref<CollectionsItem | null>(null)


   // load_collection_items
   function load_collection_items() {

      // ensure the list has been downloaded
      if(!collections_items_list.value) fetchData()
      
      if(payload) {
         collections_items_list.value = payload.value?.data
      }
      else {
         console.log('no payload')
      }
      return {
         outcome:"success",
         error:'to do : assign error here'
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      // to do : add error handling for invalid json - test w/ broken/invalid json files
      collections_items_list.value = payload.value?.data
   })


   function load_collection_items_list() {
      if(!collections_items_list.value) load_collection_items()
      return collections_items_list
   }

   return { 
      load_collection_items,
      payload, 
      error, 
      loading,
      collections_items_list,
      collections_item,
      load_collection_items_list
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionsItemsListStore, import.meta.hot))
}