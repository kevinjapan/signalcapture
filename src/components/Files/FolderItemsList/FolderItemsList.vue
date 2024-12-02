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



// FolderItemsList

// to do : how do we handle files w/ no record (CollectionItem) in this UI ? (we need files w/ no record displayed too)

const AppStore = useAppStore()
const FilesStore = useFilesStore()
const CollectionsItemListStore = useCollectionsItemsListStore()

const branch = ref<FilesTree | null>(null)


// the folder's files_list
const files_list = ref<FilesTree[] | null>(null)

// files with no matching record
const new_files_list = ref<string[]>([])

// item records matched to files in the files_list
const items_list = ref<CollectionsItem[] | null>(null)

//
const ids_list = ref<number[]>([])

// toggle card / list view
const list_view_type = ref<ListViewType>(AppStore.list_view_type)

watchEffect(() => {

    branch.value = FilesStore.get_folder_files_list(FilesStore.curr_folder_id) as FilesTree
    files_list.value = branch?.value?.children
    ids_list.value = branch?.value?.children.map((child) => child.teaser.id)
    items_list.value = CollectionsItemListStore.get_collection_items_by_id(ids_list.value.flat())

   const new_file_teasers = branch?.value?.children.filter((child) => child.teaser.id <= 0 && child.teaser.title)

    new_files_list.value = new_file_teasers.map((file) => {
        return file.teaser.title
    })
})

watchEffect(() => {
   list_view_type.value = AppStore.list_view_type
})

watchEffect(() => {
    console.log('files_list',files_list.value)
})

const toggle_view = () => {
   AppStore.switch_list_view_type()
}

const step_to_page = () => {}

const navigate_to_page = () => {}

</script>

<template>
    <ListCtrls
        :list_view_type="list_view_type"
        @toggle-view="toggle_view"
    >   
    <!-- to do : currently configured for Browse ...  doesn't report correct figures.. -->
        <PaginationNav
            title="top_page_nav"
            :page=CollectionsItemListStore.page
            :total_num_items=CollectionsItemListStore.total_num_items
            :items_per_page=CollectionsItemListStore.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
        />
    </ListCtrls>   

    <!-- to do : we have non-record matching 'new' files in the folder - how to identify and display here? -->
 
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

    <ListCtrls
        :list_view_type="list_view_type"
        @toggle-view="toggle_view"
    >
        <PaginationNav
            title="top_page_nav"
            :page=CollectionsItemListStore.page
            :total_num_items=CollectionsItemListStore.total_num_items
            :items_per_page=CollectionsItemListStore.items_per_page
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
        />
    </ListCtrls>

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