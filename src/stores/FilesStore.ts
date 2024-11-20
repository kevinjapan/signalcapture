import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '@/utilities/utilities/validation'


// FilesStore

export const useFilesStore = defineStore('files_store', () => {


   const url = '/data/files_tree.json'
   
   //
   const { payload, error, loading, fetchData } = useFetch<FilesTree>(url,{}) as UseFetchReturn<FilesTree>


   // The CollectionsItem (current selected/viewed)
   const files_tree = ref<FilesTree | null>(null)


   // The Tech (current selected/viewed)
   const file = ref({})

   // load_files_tree
   function load_files_tree() {

      // to do : remove 'payload.outcome' etc from json file - handle well here - i don't think so! :)

      // ensure the tree has been downloaded
      if(!files_tree.value) fetchData()
      
         if(payload) {
            files_tree.value = payload.value?.data
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
      if(!payload.value) return
      if(is_valid_payload(payload.value as Payload<FilesTree>)) {
         files_tree.value = payload.value?.data
      }
      else {
         console.log('to do : notify user invalid data rcvd')
      }
   })

   return { 
      files_tree,
      payload,
      error,
      loading,
      file,
      load_files_tree
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useFilesStore, import.meta.hot))
}