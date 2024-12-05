<script setup lang="ts">
import ListCtrls from '@/components/ListCtrls/ListCtrls.vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'
import PackageCard from '@/components/Packages/PackageCard/PackageCard.vue'
import PackageListItem from '@/components/Packages/PackageListItem/PackageListItem.vue'
import PackageTeaserCard from '@/components/Packages/PackageTeaserCard/PackageTeaserCard.vue'



// CollectionsItemListContainer

const props = defineProps<{
   list_view_type: ListViewType,
   page: number,
   total_num_items: number,
   items_per_page: number,
   list: Package[] | null
}>()

const emit = defineEmits([
   'toggle-view',
   'step-to-page',
   'navigate-to-page'
])

const step_to_page = (step: number) => {
   emit('step-to-page',step)
}

const navigate_to_page = (target_page: number) => {
   emit('navigate-to-page',target_page)
}

// future : split off ListCtrls 
</script>

<template>

   <section>
   
      <ListCtrls
         :list_view_type="list_view_type"
         @toggle-view="$emit('toggle-view')"
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

      <section v-if="list_view_type === 'card'" class="grid grid_cards_layout mt_2">
         <PackageCard v-for="item in list" :key="item.id"  :item="item as unknown as Package" />
      </section>
      <section v-if="list_view_type === 'teaser_card'" class="grid grid_cards_layout teaser_cards mt_2">
         <PackageTeaserCard v-for="item in list" :key="item.id"  :item="item as unknown as Package" />
      </section>
      <section v-if="list_view_type === 'list'" class="flex flex_list_layout mt_2">
         <PackageListItem v-for="item in list" :key="item.id"  :item="item as unknown as Package" />
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

