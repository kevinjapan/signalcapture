import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '@/utilities/utilities/validation'



// FilesTreeStore
// future : we break on uppercase "xxx.JPG" filenames - can we test, if file "xxx.jpg" not found/error, then try "xxx.JPG" ?

export const useFilesTreeStore = defineStore('files_tree_store', () => {

   // the Files Tree dataset url
   const url = '/data/files_tree.json'
   
   // fetched properties
   const { payload, error, loading, fetchData } = useFetch<FilesTree>(url,{}) as UseFetchReturn<FilesTree>

   // the loaded Files Tree (current selected/viewed)
   const files_tree = ref<FilesTree | null>(null)

   // the current closed level (peer-to-peer closing)
   const closed_at_level = ref<number>(3)


   // current selected folder
   const curr_folder_id = ref(0)

   // current selected file
   const curr_file_id = ref(0)

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

   function get_folder_files_list(target_folder_id: number) {
      if(files_tree.value) return get_branch_files_list(target_folder_id,files_tree.value)
   }
   
   const get_branch_files_list = (target_folder_id: number,branch: FilesTree): FilesTree | null => {
      
      if(branch.id === target_folder_id) {
         return branch
      }
      let result = null
      if(branch.children) {
         for(const sub_branch of branch.children as FilesTree[]) {
            result = get_branch_files_list(target_folder_id, sub_branch)
            if(result !== null) break
         }
      }
      return result
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
      curr_folder_id,
      closed_at_level,

      load_files_tree,
      set_closed_level,
      get_folder_files_list
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useFilesTreeStore, import.meta.hot))
}