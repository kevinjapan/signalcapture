<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'
import CollectionsItemListContainer from '@/components/CollectionsItems/CollectionsItemListContainer/CollectionsItemListContainer.vue'



// BrowseView

const AppStore = useAppStore()
const CollectionsItemsListStore = useCollectionsItemsListStore()
CollectionsItemsListStore.load_collection_items()

// local ref to store's Collections Items list
const list = ref<CollectionsItem[] | null>(null)

// display loading spinner
const is_loading = ref<boolean>(true)

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

watchEffect(() => {
   is_loading.value = CollectionsItemsListStore.loading.value
})

watchEffect(() => {
   list.value = <CollectionsItem[]>CollectionsItemsListStore.paginated_collections_items_list
})

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

const set_page = (page: number) => {
   CollectionsItemsListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = CollectionsItemsListStore.page + step
   if(new_page < 1 || new_page > Math.ceil(CollectionsItemsListStore.total_num_items / CollectionsItemsListStore.items_per_page)) return
   CollectionsItemsListStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   AppStore.switch_list_view_type()
}

const sort_list_by = (order_by: string) => {
   console.log('to do : sort list in store',order_by)
}
</script>

<template>

   <div class="error_notification" v-if="CollectionsItemsListStore?.error">
      <p>Oops! Error encountered: {{ CollectionsItemsListStore?.error }}</p>
   </div>

   <section v-else class="mb_2">

      <div v-if="CollectionsItemsListStore?.error">
         <p>Oops! Error encountered: {{ CollectionsItemsListStore?.error }}</p>
      </div>

      <CollectionsItemListContainer 
         :list_view_type="list_view_type"
         @toggle-view="toggle_view"
         :page=CollectionsItemsListStore.page
         :total_num_items=CollectionsItemsListStore.total_num_items
         :items_per_page=CollectionsItemsListStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page"
         @sort-list-by="sort_list_by"
         :list="list"
      />
   
      <div v-if="CollectionsItemsListStore.loading" class="loading_spin"></div>

   </section>
      
</template>

