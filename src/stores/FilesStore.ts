import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '@/utilities/utilities/validation'



// FilesStore

export const useFilesStore = defineStore('files_store', () => {

   // the Files Tree dataset url
   const url = '/data/files_tree.json'
   
   // fetched properties
   const { payload, error, loading, fetchData } = useFetch<FilesTree>(url,{}) as UseFetchReturn<FilesTree>

   // the loaded Files Tree (current selected/viewed)
   const files_tree = ref<FilesTree | null>(null)

   // the current closed level (peer-to-peer closing)
   const closed_at_level = ref<number>(3)

   // The Tech (current selected/viewed)
   const curr_file_id = ref(0-1)

   const set_closed_level = (level: number) => {
      closed_at_level.value = level
   }

   // load_files_tree
   function load_files_tree() {

      // ensure the tree has been downloaded
      if(!files_tree.value) fetchData()
      
      if(payload) {
         if(payload.value) {
            if(is_valid_payload(payload.value as Payload<FilesTree>)) {
               files_tree.value = payload.value.data
            }
         }
      }
      else {
         console.log('no payload')
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      if(!payload.value) return
      if(is_valid_payload(payload.value as Payload<FilesTree>)) {
         files_tree.value = payload.value?.data
      }
      else {
         console.log('Invalid payload received for FilesTree')
      }
   })

   return { 
      files_tree,
      payload,
      error,
      loading,
      curr_file_id,
      load_files_tree,
      closed_at_level,
      set_closed_level
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useFilesStore, import.meta.hot))
}