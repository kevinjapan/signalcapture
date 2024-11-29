import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '../utilities/utilities/validation'


// CollectionsItemsListStore
// generally, we always extract paginated list

export const useCollectionsItemsListStore = defineStore('collections_items_store', () => {

   // future : for demo, we use json dataset named here
   // full server-supported app will useData and useEndPoints to resolve queries
   const url = '/data/collection-items.json'

   const { payload, error, loading, fetchData } = useFetch<CollectionsItem[]>(url,{}) as UseFetchReturn<CollectionsItem[]>


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
   // loads list *if* list is empty
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
   }

   const build_paginated_list = () => {
      if(collections_items_list.value) {
         let start_index = ((page.value - 1) * items_per_page.value)
         paginated_collections_items_list.value = collections_items_list.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      if(!payload.value) return
      if(is_valid_payload(payload.value as Payload<CollectionsItem[]>)) {
         collections_items_list.value = payload.value?.data
         if(collections_items_list.value) total_num_items.value = collections_items_list.value?.length
         build_paginated_list()
      }
      else {
         console.log('Invalid payload received for ColllectionsItemsList')
      }
   })


   function load_collection_items_list() {
      if(!collections_items_list.value) load_collection_items()
      return collections_items_list
   }


   function get_collection_items_by_id(ids_list: number[]) {
      const list = <CollectionsItem[]>collections_items_list?.value?.filter((elem: CollectionsItem) => {
         return ids_list.includes(elem.id)
      })
      return list
   }

   function set_page(new_page: number) {
      page.value = new_page
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
      items_per_page,
      get_collection_items_by_id
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionsItemsListStore, import.meta.hot))
}
