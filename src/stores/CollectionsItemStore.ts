import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore' 



// CollectionsItemStore


export const useCollectionsItemStore = defineStore('collections_item_store', () => {

   // we access the CollectionsItemsList
   const CollectionsItemsListStore = useCollectionsItemsListStore()

   const curr_target_id = ref<number | null>(null)
   const single_collection_item = ref<CollectionsItem | null>(null)

   watchEffect(() => {
      single_collection_item.value = <CollectionsItem>CollectionsItemsListStore.collections_items_list?.find((elem: CollectionsItem) => {
         return elem.id === curr_target_id.value
      })
   })


   function load_single_collection_item(target_id: number) {

      curr_target_id.value = target_id
      CollectionsItemsListStore.load_collection_items_list()
      if(CollectionsItemsListStore.collections_items_list) {
         single_collection_item.value = <CollectionsItem>CollectionsItemsListStore.collections_items_list?.find((elem: CollectionsItem) => {
            return elem.id === target_id
         })
      }
   }

   return {
      load_single_collection_item,
      single_collection_item
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCollectionsItemStore, import.meta.hot))
}