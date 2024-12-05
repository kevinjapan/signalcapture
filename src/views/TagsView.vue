<script setup lang="ts">
import { ref, watch, watchEffect, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useTagsResultsListStore }  from '@/stores/TagsResultsListStore'
import TagsSelector from '@/components/Tags/TagsSelector/TagsSelector.vue'
import CollectionsItemListContainer from '@/components/CollectionsItems/CollectionsItemListContainer/CollectionsItemListContainer.vue'




// TagsView
// d if no_matches - notifies correctly but doesn't reset page to 0 (if page set to 1 prev.)

const AppStore = useAppStore()
const route = useRoute()
const TagsResultsListStore = useTagsResultsListStore()

const { curr_search_tag, search_results, loading, no_matches, error } = storeToRefs(TagsResultsListStore)

// The search term
const local_tag_search_id = ref<number>(curr_search_tag.value)

// local ref to store's Collections Items list
const list = ref<CollectionsItem[] | null>(null)

//
const my_error = ref<string | null>(null)

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

onBeforeMount(() => {
   // pre-load the store if required (eg on page refresh)
   TagsResultsListStore.preload_collection_items()

   if(route.params.id)  {
      TagsResultsListStore.search(parseInt(route.params.id as string))
      local_tag_search_id.value = parseInt(route.params.id as string)
   }
})

onMounted(() => {
   AppStore.curr_view_route = route.fullPath
   window.scroll(0,0)
})

watch(local_tag_search_id,() => {
   if(local_tag_search_id.value) TagsResultsListStore.search(local_tag_search_id.value)
})

watchEffect(() => {
   list.value = <CollectionsItem[]>TagsResultsListStore.paginated_search_results
})

watchEffect(() => {
   my_error.value = error.value
})

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

const set_page = (page: number) => {
   TagsResultsListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = TagsResultsListStore.page + step
   if(new_page < 1 || new_page > Math.ceil(TagsResultsListStore.total_num_items / TagsResultsListStore.items_per_page)) return
   TagsResultsListStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}

const toggle_view = () => {
   AppStore.switch_list_view_type()
}

const tag_selected = (tag: number) => {
   local_tag_search_id.value = tag
}
</script>


<template>

   <TagsSelector 
      :selected_tag_id="local_tag_search_id"
      @tag-selected="tag_selected" />

   <div class="error_notification" v-if="my_error">
      <p>Oops! Error encountered: {{ my_error }}</p>
   </div>

   <section v-else>

      <CollectionsItemListContainer 
         :list_view_type="list_view_type"
         @toggle-view="toggle_view"
         title="top_page_nav"
         :page=TagsResultsListStore.page
         :total_num_items=TagsResultsListStore.total_num_items
         :items_per_page=TagsResultsListStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page"
         :list="list"
      />

      <div v-if="no_matches && !loading" class="no_results mt_1">no matches were found</div>

      <div v-if="loading && !search_results" class="loading_spin mt_1"></div>

   </section>

</template>


