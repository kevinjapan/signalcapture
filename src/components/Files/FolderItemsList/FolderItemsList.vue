<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import { useFolderItemsListStore } from '@/stores/FolderItemsListStore'
import CollectionsItemListContainer from '@/components/CollectionsItems/CollectionsItemListContainer/CollectionsItemListContainer.vue'



// FolderItemsList

const AppStore = useAppStore()
const FolderItemsListStore = useFolderItemsListStore()

const { paginated_list, new_files_list, loading, no_matches, error } = storeToRefs(FolderItemsListStore)

const my_error = ref<string | null>(null)

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

watchEffect(() => {
   my_error.value = error.value
})

const toggle_view = () => {
   AppStore.switch_list_view_type()
}

const set_page = (page: number) => {
    FolderItemsListStore.set_page(page)
}

const step_to_page = (step: number) => {
   const new_page = FolderItemsListStore.page + step
   if(new_page < 1 || new_page > Math.ceil(FolderItemsListStore.total_num_items / FolderItemsListStore.items_per_page)) return
   FolderItemsListStore.set_page(new_page)
   window.scroll(0,0)
}

const navigate_to_page = (target_page: number) => {
   set_page(target_page)
}
</script>

<template>

    <div class="error_notification" v-if="my_error">
      <p>Oops! Error encountered: {{ my_error }}</p>
   </div>
   
   <CollectionsItemListContainer 
         :list_view_type="list_view_type"
         @toggle-view="toggle_view"
         title="top_page_nav"
         :page=FolderItemsListStore.page
         :total_num_items=FolderItemsListStore.total_num_items
         :items_per_page=FolderItemsListStore.items_per_page
         @step-to-page="step_to_page" 
         @navigate-to-page="navigate_to_page"
         :list="paginated_list"
      />

   <div v-if="no_matches && !loading" class="no_results mt_1">no matches were found</div>

   <div v-if="loading && !paginated_list" class="loading_spin mt_1"></div>


    <!-- 
        new files display :
        future : separate components 
               : integrate cleanly w/ pagination (pagination only on matched items?)
    -->
    <section v-if="new_files_list.length > 0" class="new_files">
        <span class="italic grey_text">unmatched files</span>
        <ul>
            <li v-for="filename in new_files_list">
                <img src="../../../assets/icons/file.svg"/>{{ filename }}
            </li>
        </ul>
    </section>



</template>

<style scoped>
.grid_cards_layout > * {
    margin:0;
}
section.new_files {
    display:flex;
    flex-direction:column;
    background:white;
    margin:1rem 0;
    padding:1rem;
    border-radius:.5rem;
}
section.new_files li {
    display:flex;
    align-items:center;
    gap:.25rem;
    width:fit-content;
    cursor:pointer;
}
</style>