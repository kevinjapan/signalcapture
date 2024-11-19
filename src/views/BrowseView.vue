<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'
import CollectionsItemCard from '../components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import CollectionsItemListItem from '../components/CollectionsItems/CollectionsItemListItem/CollectionsItemListItem.vue'
import ListCtrls from '../components/ListCtrls/ListCtrls.vue'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'



// BrowseView

// CollectionsItemsStore
const CollectionsItemsListStore = useCollectionsItemsListStore()
CollectionsItemsListStore.load_collection_items()

// local ref to store's Collections Items list
const list = ref<CollectionsItem[] | null>(null)

// display loading spinner
const is_loading = ref<boolean>(true)

// toggle card / list view
const card_view = ref<boolean>(true)

watchEffect(() => {
   is_loading.value = CollectionsItemsListStore.loading.value
})

watchEffect(() => {
   list.value = <CollectionsItem[]>CollectionsItemsListStore.paginated_collections_items_list
})

const set_page = (page: number) => {
   CollectionsItemsListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = CollectionsItemsListStore.page + step
   if(new_page < 1 || new_page > Math.ceil(CollectionsItemsListStore.total_num_items / CollectionsItemsListStore.items_per_page)) return
   CollectionsItemsListStore.set_page(new_page)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   card_view.value = !card_view.value
}

</script>

<template>

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
         :page=CollectionsItemsListStore.page
         :total_num_items=CollectionsItemsListStore.total_num_items
         :items_per_page=CollectionsItemsListStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page" 
      />
   </ListCtrls>



   <img scr="../assets/imgs/list.svg"/>

   <div v-if="CollectionsItemsListStore.loading" class="loading_spin"></div>

   <!-- card / list view -->
   <section v-if="card_view" class="grid grid_cards_layout">
      <CollectionsItemCard v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
   </section>
   <section v-else="!card_view" class="flex flex_list_layout">
      <CollectionsItemListItem v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
   </section>

   <ListCtrls
      :card_view="card_view"
      @toggle-view="toggle_view"
   >
      <PaginationNav
         title="bottom_page_nav"
         :page=CollectionsItemsListStore.page
         :total_num_items=CollectionsItemsListStore.total_num_items
         :items_per_page=CollectionsItemsListStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page" 
      />
   </ListCtrls>
   
</template>

