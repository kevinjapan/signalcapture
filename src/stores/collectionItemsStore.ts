import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
// import useData from '../utilities/useData/useData'

import useFetch from '../utilities/useFetch/useFetch'



// TechStore

export const useCollectionItemsStore = defineStore('collection_items_store', async() => {


   // state
      const baseUrl = '/data/collection-items.json'
      const { payload, error } = await useFetch<CollectionsItemList>(baseUrl,{})

   // The Tech Tree
   const collection_items = ref<CollectionsItemList | null>(null)

   // The Tech (current selected/viewed)
   const tech = ref<CollectionsItem | null>(null)

   interface LoadCollectionItemsReturn {
      outcome:string
      error:string | null
   }
   // methods

   // load_collection_items
   async function load_collection_items(): Promise<LoadCollectionItemsReturn> {

      let retrieved_collection_items: CollectionsItemList | null = null

      
      // const { data, error } = useFetch(baseUrl)

      if(payload) {
         collection_items.value = payload?.data
         console.log('payload',payload)
      }
      else {
         console.log('no payload')
      }

      console.log('error',error)

      return {
         outcome:"success",
         error:'to do : assign error here'
      }

      // to do : bring in generic version of useData - see Ongaku project version - on-going

      // loading?:boolean,
      // payload?:Payload<T | null> | null,
      // error?:string | null,
      // load?: () => Promise<void>,
      // updateDataUrl?:

      try {
         // const { loading, payload, error } = useData<CollectionsItemList>('load_collection_items',[],{})

         console.log('payload',payload)
         // console.log('loading',loading)
         console.log('error',error)

         // if(data && data.outcome === 'success') {
         //    retrieved_collection_items = payload as CollectionsItemList
         // }
         // else {
         //    throw error
         // }
      }
      catch(error) {
         // to do : augment return value to report any passed errors to UI
         //   currently, we don't return rvcd CollectionsItemList but load it into store and thus available via 'collection_items' store property
         return {
            outcome:"fail",
            error:'to do : assign error here'}
      }
      // synched.value = true
      collection_items.value = retrieved_collection_items
      return {
         outcome:"success",
         error:'to do : assign error here'}
   }

  



   return { 
      collection_items,
      tech,
      load_collection_items,
      // load_tech,
      // get_tech,
      payload:payload,
      error:error
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionItemsStore, import.meta.hot))
}