<script setup lang="ts">
import ListCtrls from '@/components/ListCtrls/ListCtrls.vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'
import CollectionsItemCard from '../CollectionsItemCard/CollectionsItemCard.vue'
import CollectionsItemListItem from '../CollectionsItemListItem/CollectionsItemListItem.vue'
import CollectionsItemTeaserCard from '../CollectionsItemTeaserCard/CollectionsItemTeaserCard.vue'



// CollectionsItemListContainer

const props = defineProps<{
   list_view_type: ListViewType,
   page: number,
   total_num_items: number,
   items_per_page: number,
   list: CollectionsItem[] | null
}>()

const emit = defineEmits([
   'toggle-view',
   'step-to-page',
   'navigate-to-page',
   'sort-list-by'
])

const step_to_page = (step: number) => {
   emit('step-to-page',step)
}

const navigate_to_page = (target_page: number) => {
   emit('navigate-to-page',target_page)
}

const sort_list_by = (order_by: string) => {
   emit('sort-list-by',order_by)
}
</script>

<template>

   <section>
   
      <ListCtrls
         :list_view_type="list_view_type"
         @toggle-view="$emit('toggle-view')"
         @sort-list-by="sort_list_by"
         style="margin:0;margin-top:1rem;border:solid 1px lightgrey;margin-bottom:.5rem;"
      >
         <PaginationNav
            title="top_page_nav"
            :page=props.page
            :total_num_items=props.total_num_items
            :items_per_page=props.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
         />
      </ListCtrls>

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
         v-if="props.total_num_items && props.total_num_items > 0"
         :list_view_type="list_view_type"
         @toggle-view="$emit('toggle-view')"
      >
         <PaginationNav
            title="bottom_page_nav"
            :page=props.page
            :total_num_items=props.total_num_items
            :items_per_page=props.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
         />
      </ListCtrls>

   </section>
</template>

<style scoped>
section {
   width:100%;
}
</style>