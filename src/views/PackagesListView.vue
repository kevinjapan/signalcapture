<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { usePackagesListStore } from '@/stores/PackagesListStore'
import PackageListContainer from '@/components/Packages/PackageListContainer/PackageListContainer.vue'


// PackagesListView

const AppStore = useAppStore()
const PackageListStore = usePackagesListStore()
PackageListStore.load_packages()

// local ref to store's Packages list
const list = ref<Package[] | null>(null)

// display loading spinner
const is_loading = ref<boolean>(true)

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

onMounted(() => {
   window.scroll(0,0)
})
watchEffect(() => {
   is_loading.value = PackageListStore.loading.value
})

watchEffect(() => {
   list.value = <Package[]>PackageListStore.paginated_packages_list
})

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

const set_page = (page: number) => {
   PackageListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = PackageListStore.page + step
   // to do : return something on next line
   if(new_page < 1 || new_page > Math.ceil(PackageListStore.total_num_items / PackageListStore.items_per_page)) return
   PackageListStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   AppStore.switch_list_view_type()
}
</script>

<template>

   <div class="error_notification" v-if="PackageListStore?.error">
      <p>Oops! Error encountered: {{ PackageListStore?.error }}</p>
   </div>

   <section v-else>

      <PackageListContainer
         :list="list"
         :list_view_type="list_view_type"
         :page=PackageListStore.page
         :total_num_items=PackageListStore.total_num_items
         :items_per_page=PackageListStore.items_per_page
         @toggle-view="toggle_view"
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page"
      />

      <div v-if="is_loading" class="loading_spin"></div>

   </section>
      
</template>

