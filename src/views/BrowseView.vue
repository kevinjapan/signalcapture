<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'
import CollectionsItemCard from '../components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import CollectionsItemListItem from '../components/CollectionsItems/CollectionsItemListItem/CollectionsItemListItem.vue'
import ListCtrls from '../components/ListCtrls/ListCtrls.vue'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'
import CollectionsItemTeaserCard from '@/components/CollectionsItems/CollectionsItemTeaserCard/CollectionsItemTeaserCard.vue'



// BrowseView


const AppStore = useAppStore()

// CollectionsItemsStore
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

// to do : rename
const toggle_view = () => {
   AppStore.switch_list_view_type()
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
         :list_view_type="list_view_type"
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


      <div v-if="CollectionsItemsListStore.loading" class="loading_spin"></div>

      <section v-if="list_view_type === 'card'" class="grid grid_cards_layout">
         <CollectionsItemCard v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
      </section>
      <section v-if="list_view_type === 'teaser_card'" class="grid grid_cards_layout teaser_cards">
         <CollectionsItemTeaserCard v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
      </section>
      <section v-if="list_view_type === 'list'" class="flex flex_list_layout">
         <CollectionsItemListItem v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
      </section>

      <ListCtrls
         :list_view_type="list_view_type"
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
      
   </section>
      
</template>

