<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import { useFilesStore } from '@/stores/FilesStore'
import { useCollectionsItemsListStore } from '@/stores/CollectionsItemsListStore'
import CollectionsItemCard from '@/components/CollectionsItems/CollectionsItemCard/CollectionsItemCard.vue'
import CollectionsItemTeaserCard from '@/components/CollectionsItems/CollectionsItemTeaserCard/CollectionsItemTeaserCard.vue'
import CollectionsItemListItem from '@/components/CollectionsItems/CollectionsItemListItem/CollectionsItemListItem.vue'
import ListCtrls from '@/components/ListCtrls/ListCtrls.vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'


const AppStore = useAppStore()
const FilesStore = useFilesStore()
const CollectionsItemListStore = useCollectionsItemsListStore()

const branch = ref<FilesTree | null>(null)


// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)


const items_list = ref<CollectionsItem[] | null>(null)

const files_list = ref<FilesTree[] | null>(null)
const ids_list = ref<number[]>([])

const step_to_page = () => {}
const navigate_to_page = () => {}

watchEffect(() => {
    branch.value = FilesStore.get_folder_files_list(FilesStore.curr_folder_id) as FilesTree
    files_list.value = branch?.value?.children
    ids_list.value = branch?.value?.children.map((child) => child.teaser.id)
    items_list.value = CollectionsItemListStore.get_collection_items_by_id(ids_list.value.flat())
})

const toggle_view = () => {
   AppStore.switch_list_view_type()
}


watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

</script>

<template>
    <ListCtrls
        :list_view_type="list_view_type"
        @toggle-view="toggle_view"
    >   
    <!-- to do : currently configured for Browse ...  -->
        <PaginationNav
            title="top_page_nav"
            :page=CollectionsItemListStore.page
            :total_num_items=CollectionsItemListStore.total_num_items
            :items_per_page=CollectionsItemListStore.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
        />
    </ListCtrls>   


    <!-- card / list view -->
    <section v-if="list_view_type === 'card'"  class="grid grid_cards_layout" style="margin-top:1rem;">
        <CollectionsItemCard v-for="item in items_list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
    </section>
    <section v-if="list_view_type === 'teaser_card'"  class="grid grid_cards_layout teaser_cards" style="margin-top:1rem;">
        <CollectionsItemTeaserCard v-for="item in items_list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
    </section>
    <section v-if="list_view_type === 'list'"  class="flex flex_list_layout " style="margin-top:1rem;">
        <CollectionsItemListItem v-for="item in items_list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
    </section>



    

</template>

<style scoped>
.grid_cards_layout > * {
    margin:0;
}
</style>