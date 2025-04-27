import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore' 
import { useFilesTreeStore } from '@/stores/FilesTreeStore'



// FolderItemsListStore
// intermediate to CollectionsItemsList for FolderItemsList.vue 

export const useFolderItemsListStore = defineStore('folder_items_list_store', () => {

    const AppStore = useAppStore()
    const CollectionsItemsListStore = useCollectionsItemsListStore()
    CollectionsItemsListStore.load_collection_items_list()
    const FilesTreeStore = useFilesTreeStore()

    // the current folder id
    // const curr_folder_id = ref<number | null>(0)

    // the full results set - we return paginated subsets
    const list = ref<CollectionsItem[] | null>(null)

    // the current results page
    const paginated_list = ref<CollectionsItem[] | null>(null)

    // the total num of items
    const total_num_items = ref<number>(0)

    // the current page
    const page = ref<number>(0)

    // paginated items per page
    const items_per_page = ref<number>(AppStore.items_per_page)
   
    // worked but no matches (empty arr - no file items in this folder)
    const no_matches = ref<boolean>(false)

    // is loading flag
    const loading = ref<boolean>(false)

    // errors encountered
    const error = ref<string | null>(null)

    //
    const branch = ref<FilesTree | null>(null)

    // the folder's files_list
    const files_list = ref<FilesTree[] | null>(null)

    //
    const ids_list = ref<number[]>([])

    // files with no matching record
    const new_files_list = ref<string[]>([])

    function preload_collection_items() {
        CollectionsItemsListStore.load_collection_items()
    }

    watchEffect(() => {
        if(FilesTreeStore.curr_folder_id > 0 && total_num_items.value > 0) {
            page.value = 1
        }
        else {
            page.value = 0
        }
    })

   const build_paginated_list = () => {
      if(list.value) {
      let start_index = ((page.value - 1) * items_per_page.value)
      paginated_list.value = list.value.slice(start_index,start_index + items_per_page.value)
      }
   }
  
   watchEffect(() => {

      if(FilesTreeStore.curr_folder_id !== null && FilesTreeStore.curr_folder_id > 0) {
         branch.value = FilesTreeStore.get_folder_files_list(FilesTreeStore.curr_folder_id) as FilesTree
         files_list.value = branch?.value?.children
         ids_list.value = branch?.value?.children.map((child) => child.teaser.id)
         list.value = CollectionsItemsListStore.get_collection_items_by_id(ids_list.value.flat())
      }
      
      const new_file_teasers = branch?.value?.children.filter((child) => child.teaser.id <= 0 && child.teaser.title)    
      if(new_file_teasers) {
         new_files_list.value = new_file_teasers.map((file) => {
               return file.teaser.title
         })
      }

      if(list.value && build_paginated_list) build_paginated_list()
      if(list.value) total_num_items.value = list.value ? list.value.length : 0
   })

   watchEffect(() => {
      // workaround - this does get the .value as a string correctly w/ casting:
      // issue - CollectionsItemsListStore.error.value returns 'undefined' while CollectionsItemsListStore.error 
      //         returns correct object, from which we can assign string.
      error.value = CollectionsItemsListStore.error ? CollectionsItemsListStore.error as unknown as string: null
   })

   function get_collection_items_by_id(id_list: number[]) {
      return CollectionsItemsListStore.get_collection_items_by_id(id_list)
   }

   function set_page(new_page: number) {
      page.value = new_page
   }

   function flush() {
      list.value = []
      total_num_items.value = 0
      page.value = 1
   }

   function get_prev_file(item_id: number) {
      // to do : from given file_id - return id for prev file : resolve from item_id

      // - get index for [item_id]
      // - if available, return item before it in 'list' - return -1 if unavailable

      return 'get_prev_file' + item_id
   }

   function get_next_file(item_id: number) {
      // to do : from given file_id - return id for next file : resolve from item_id

      // - get index for [item_id]
      // - if available, return item after it in 'list' - return -1 if unavailable

      return 'get_next_file' + item_id
   }
   return {

      list,
      paginated_list,
      new_files_list,
      page,
      total_num_items,
      items_per_page,
      no_matches,
      loading,
      error,

      preload_collection_items,
      set_page,
      flush,
      get_collection_items_by_id,
      get_prev_file,
      get_next_file
   }
})

// hot module replacement for pinia
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFolderItemsListStore, import.meta.hot))
}