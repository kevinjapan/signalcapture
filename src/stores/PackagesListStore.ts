import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import useFetch from '../composables/useFetch/useFetch'
import { is_valid_payload } from '../utilities/utilities/validation'



// PackagesListStore
// generally, we always extract paginated list

export const usePackagesListStore = defineStore('packages_store', () => {

   const AppStore = useAppStore()

   // future : for demo, we use json dataset named here
   // full server-supported app will useData and useEndPoints to resolve queries
   
   const url = '/data/packages.json'

   const { payload, error, loading, fetchData } = useFetch<Package[]>(url,{}) as UseFetchReturn<Package[]>


   // The PackagesList
   // in our no-server demo, we load all (limited no.) items into this array and paginate on client.
   const packages_list = ref<Package[] | null>(null)

   //
   const paginated_packages_list = ref<Package[] | null>(null)

   // The Package (current selected/viewed)
   const curr_package = ref<Package | null>(null)

   //
   const page = ref<number>(1)

   //
   const total_num_items = ref<number>(0)

   //
   const items_per_page = ref<number>(AppStore.items_per_page)


   function load_packages() {

      // ensure the list has been downloaded
      if(!packages_list.value) fetchData()
      
      if(payload) {
         packages_list.value = payload.value?.data
         if(packages_list.value) total_num_items.value = packages_list.value?.length
         build_paginated_list()
      }
      else {
         console.log('no payload')
      }
   }

   const build_paginated_list = () => {
      if(packages_list.value) {
         let start_index = ((page.value - 1) * items_per_page.value)
         paginated_packages_list.value = packages_list.value.slice(start_index,start_index + items_per_page.value)
      }
   }

   // we need to update state herein on changes in useFetch composable
   watchEffect(() => {
      if(!payload.value) return
      if(is_valid_payload(payload.value as Payload<Package[]>)) {
         packages_list.value = payload.value?.data
         if(packages_list.value) total_num_items.value = packages_list.value?.length
         build_paginated_list()
      }
   })

   function load_packages_list() {
      if(!packages_list.value) load_packages()
      return packages_list
   }

   function set_page(new_page: number) {
      page.value = new_page
   }

   return { 
      payload, 
      error, 
      loading,
      packages_list,
      paginated_packages_list,
      curr_package,
      page,
      total_num_items,
      items_per_page,

      load_packages,
      load_packages_list,
      set_page,
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(usePackagesListStore, import.meta.hot))
}
