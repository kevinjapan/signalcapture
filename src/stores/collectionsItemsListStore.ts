import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
// import useData from '../utilities/useData/useData'

import useFetch from '../composables/useFetch/useFetch'



// TechStore

export const useCollectionsItemsListStore = defineStore('collections_items_store', () => {


   // to do : 1. call load_collection_items() (if collection_items !== null)in BrowseView.vue and access store.collection_items as required


   // state

   const baseUrl = '/data/collection-items - sm.json'

   const { payload, error, loading, fetchData } = useFetch<CollectionsItemsList>(baseUrl,{}) as UseFetchReturn<CollectionsItemsList>

   // The CollectionsItemsList
   // in our no-server demo, we load all (limited no.) items into this array and paginate on client,
   // future, we will pagination server-side and handle most (& complex) operations server-side.
   const collections_items_list = ref<CollectionsItemsList | null>(null)

   // The CollectionsItem (current selected/viewed)
   const collections_item = ref<CollectionsItem | null>(null)

  
   // methods

   // load_collection_items
   function load_collection_items() {

      // if collections_items_list is null, 
      if(!collections_items_list.value) fetchData()
      
      if(payload) {
         collections_items_list.value = payload.value?.data
         console.log('payload',payload?.value?.data)
      }
      else {
         console.log('no payload')
      }

      // console.log('error',error)

      return {
         outcome:"success",
         error:'to do : assign error here'
      }



   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      collections_items_list.value = payload.value?.data
   })


   
   function refresh() {
      // to do : call fetchData / reload into collections_items_list
   }
  



   return { 
      load_collection_items,
      payload, 
      error, 
      loading,
      refresh,
      collections_items_list,
      collections_item
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionsItemsListStore, import.meta.hot))
}