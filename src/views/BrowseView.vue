<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCollectionsItemsListStore } from '../stores/CollectionsItemsListStore'
import CollectionsItemCard from '../components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'


// BrowseView

// ------------------------------------------------------------------------------------------------------------
// to do : pagination 
// - provide page here
// - appStore provides page size (num records per page)
// ------------------------------------------------------------------------------------------------------------


const list = ref<CollectionsItem[] | null>(null)
const is_loading = ref<boolean>(true)


const CollectionsItemsListStore = useCollectionsItemsListStore()
CollectionsItemsListStore.load_collection_items()


// we can't directly use payload - some TS confusion -  but we can use an intermediate 'list'
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
   // to do : don't step from edges!
   const new_page = CollectionsItemsListStore.page + step
   CollectionsItemsListStore.set_page(new_page)
}
const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}
</script>

<template>
      <!-- to do : error comes from useFetch - how to pass to client here? <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
   </div> -->

   <PaginationNav    
      title="PageNav for SongsList" 
      :page=CollectionsItemsListStore.page
      :total_num_items=CollectionsItemsListStore.total_num_items
      :items_per_page=CollectionsItemsListStore.items_per_page
      @step-to-page="step_to_page" 
      @navigate-to-page="navigate_to_page" 
   />

   <div v-if="CollectionsItemsListStore.loading" class="loading_spin"></div>
   <section class="grid grid_cards_layout" style="margin-top:5rem;">
      <!-- to do : the current big hit on 4000+ records is from loading imgs for all herein - this will be removed once we paginate and handle c20 at a time here... -->
         <CollectionsItemCard v-for="item in list" :key="item.id"  :item="item as unknown as CollectionsItem" />
   </section>
</template>


<style scoped>
.songs_list {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;
   gap:2rem;
   max-width:100%;
   padding-right:2rem;
}
.grid_list_row {
   padding-top:2rem;
}
.song_title {
   font-size:1.75rem;
}
li.titles_row {
   visibility:hidden;
}
.col_title {
   color:hsl(0, 0%, 73%);
   font-style:italic;
}
.col {
   text-align:center;
}
.date_col {
   text-align:center;
}
img.list_teaser_img {
   width:160px;
   margin-top:.25rem;
   height:100px;
   border-radius:1rem;
}
div.no_img {
   width:160px;
}
@media (min-width: 768px) {
   li.titles_row {
      /* toggling display will interfere w/ grid display */
      visibility:visible;
   }
   .songs_list {
      gap:1rem;
   }
   .song_title {
      font-size:1.05rem;
      font-weight:500;
   }
   .col {
      text-align:left;
   }
   .date_col {
      text-align:right;
   }
   img.list_teaser_img {
      width:80px;
      height:50px;
   }
   div.no_img {
      width:80px;
   }
}
</style>