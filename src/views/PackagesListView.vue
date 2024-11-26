<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { usePackagesListStore } from '@/stores/PackagesListStore'
import PackageCard from '../components/Packages/PackageCard/PackageCard.vue'
import PackageListItem from '../components/Packages/PackageListItem/PackageListItem.vue'
import ListCtrls from '../components/ListCtrls/ListCtrls.vue'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'



// PackagesView


const AppStore = useAppStore()

// PackageStore
const PackageListStore = usePackagesListStore()
PackageListStore.load_packages()

// local ref to store's Packages list
const list = ref<Package[] | null>(null)

// display loading spinner
const is_loading = ref<boolean>(true)

// toggle card / list view
const card_view = ref<boolean>(AppStore.card_view)

watchEffect(() => {
   is_loading.value = PackageListStore.loading.value
})

watchEffect(() => {
   list.value = <Package[]>PackageListStore.paginated_packages_list
})

watchEffect(() => {
   card_view.value = AppStore.card_view
})

const set_page = (page: number) => {
   PackageListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = PackageListStore.page + step
   if(new_page < 1 || new_page > Math.ceil(PackageListStore.total_num_items / PackageListStore.items_per_page)) return
   PackageListStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   AppStore.toggle_card_view()
}

</script>

<template>

   <section class="mt_3">

      <!-- to do : error comes from useFetch - how to pass to client here? 
         <div v-if="error">
         <p>Oops! Error encountered: {{ error }}</p>
      </div>
      -->

      <ListCtrls
         :card_view="card_view"
         @toggle-view="toggle_view"
      >
         <PaginationNav
            title="top_page_nav"
            :page=PackageListStore.page
            :total_num_items=PackageListStore.total_num_items
            :items_per_page=PackageListStore.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
         />
      </ListCtrls>

      <div v-if="PackageListStore.loading" class="loading_spin"></div>

      <!-- card / list view -->
      <section v-if="card_view" class="grid grid_cards_layout">
         <PackageCard v-for="item in list" :key="item.id"  :item="item as unknown as Package" />
      </section>
      <section v-else="!card_view" class="flex flex_list_layout">
         <PackageListItem v-for="item in list" :key="item.id"  :item="item as unknown as Package" />
      </section>

      <ListCtrls
         :card_view="card_view"
         @toggle-view="toggle_view"
      >
         <PaginationNav
            title="bottom_page_nav"
            :page=PackageListStore.page
            :total_num_items=PackageListStore.total_num_items
            :items_per_page=PackageListStore.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
         />
      </ListCtrls>
      
   </section>
      
</template>

