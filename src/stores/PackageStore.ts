import { ref, watchEffect } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { usePackagesListStore } from '../stores/PackagesListStore' 



// PackageStore


export const usePackageStore = defineStore('package_store', () => {

   // we access the PackagesList
   const PackagesListStore = usePackagesListStore()

   const curr_target_id = ref<number | null>(null)   
   const single_package = ref<Package | null>(null)

   watchEffect(() => {
      single_package.value = <Package>PackagesListStore.packages_list?.find((elem) => {
         return elem.id === curr_target_id.value
      })
   })


   function load_single_package(target_id: number) {

      curr_target_id.value = target_id
      PackagesListStore.load_packages()
      if(PackagesListStore.packages_list) {
         single_package.value = <Package>PackagesListStore.packages_list?.find((elem) => {
            return elem.id === target_id
         })
      }
   }

   return {
      load_single_package,
      single_package
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(usePackageStore, import.meta.hot))
}