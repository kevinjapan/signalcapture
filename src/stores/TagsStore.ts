import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '../utilities/utilities/validation'



// TagsStore

export const useTagsStore = defineStore('tags_store', () => {

   const AppStore = useAppStore()

   // future : for demo, we use json dataset named here
   // full server-supported app will useData and useEndPoints to resolve queries
   
   const url = '/data/tags.json'

   const { payload, error, loading, fetchData } = useFetch<Tag[]>(url,{}) as UseFetchReturn<Tag[]>

   // The TagsList
   // in our no-server demo, we load all (limited no.) items into this array and paginate on client.
   const tags_list = ref<Tag[] | null>(null)

   const paginated_tags_list = ref<Tag[] | null>(null)

   // The Tag (current selected/viewed)
   // const curr_tag = ref<Tag | null>(null)

   //
   const page = ref<number>(0)

   //
   const total_num_items = ref<number>(0)

   //
   const items_per_page = ref<number>(AppStore.items_per_page)


   function load_tags() {

      // ensure the list has been downloaded
      if(!tags_list.value) fetchData()
      
      if(payload) {
         tags_list.value = payload.value?.data
         if(tags_list.value) total_num_items.value = tags_list.value?.length
         build_paginated_list()
      }
      else {
         console.log('no payload')
      }
   }

   const build_paginated_list = () => {
      if(tags_list.value) {
         let start_index = ((page.value - 1) * items_per_page.value)
         paginated_tags_list.value = tags_list.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      // to do : return something on next line
      if(!payload.value) return
      if(is_valid_payload(payload.value as Payload<Tag[]>)) {
         tags_list.value = payload.value?.data
         if(tags_list.value) total_num_items.value = tags_list.value?.length
         build_paginated_list()
      }
   })
   
   // set page to 0 if no results
   watchEffect(() => {
      if(paginated_tags_list.value) {
         if(paginated_tags_list.value.length < 1) page.value = 0
      }
   })

   function get_tags_by_id(ids_list: number[]) {
      const list = <Tag[]>tags_list?.value?.filter((elem: Tag) => {
         return ids_list.includes(elem.id)
      })
      return list
   }

   function load_tags_list() {
      if(!tags_list.value) load_tags()
      return tags_list
   }

   function set_page(new_page: number) {
      page.value = new_page
   }

   return { 
      
      tags_list,
      paginated_tags_list,
      payload, 
      error, 
      loading,
      page,
      total_num_items,
      items_per_page,

      load_tags_list,
      load_tags,
      set_page,
      get_tags_by_id
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot))
}
