<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import CollectionsItemViewer from '@/components/CollectionsItems/CollectionsItemViewer/CollectionsItemViewer.vue'
import { img_size_filter } from '@/utilities/utilities/utilities'


// CollectionItemCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

// future : 
// - img resolution is currently case-sensitive (from json dataset)
// - folder path currently must end with '\\' or fails (not flexible)
// - bring in imgs blurred (fixed height) then load w/ intersection obs.

const props = defineProps<{
   item: CollectionsItem
}>()

// const router = useRouter()

const AppStore = useAppStore()
const { root_folder, use_img_widths, sm_img_width } = AppStore

// flag to show CollectionsItemViewer dlg
const show_viewer = ref<boolean>(false)

// id of current item in Viewer
const current_collection_item_id = ref<number>(0)

const open_item_viewer = (item_id: number) => {
   show_viewer.value = true
   current_collection_item_id.value = item_id
}
const close_item_viewer = () => {
   show_viewer.value = false
}

// const open_nav_link = (route:string) => {
//    router.push(route)
// }
</script>

<template>
    <section v-if="props.item" class="default_item_card">
      <a @click.stop="open_item_viewer(props.item.id)" >
        <section class="img_container">
            <!-- if WordPress, get img sizes depending on eg "?w=300" url query string -->
            <img :src="root_folder + props.item.folder_path + props.item.file_name + img_size_filter(use_img_widths,sm_img_width)"/>
        </section>
        <section class="text_container">

            <!-- top text-->
            <div>
               <h3>{{ props.item.title }}</h3>
               <!-- <p>{{ props.item.file_type }}</p>d -->
            </div>

            <!-- bottom text -->
            <div>
               <p>{{ props.item.item_Date }}</p>
               <!-- 
               folder is not valid from files.json since it may be WordPress src
               Collections folder *is* valid in Collections.json as info only - not img resolution
               <p>{{ props.item.folder_path }}</p> 
               -->
            </div>

        </section>
      </a>
    </section>

   <section v-if="show_viewer">
      <CollectionsItemViewer
         :current_item_id = current_collection_item_id
         @close-collection-item-viewer="close_item_viewer"
      />
   </section>

</template>

<style scoped>
.img_container {
    width:100%;
    /* max-height:200px; */
    /* overflow-y:hidden; */
}
img {
    width:100%;
    object-fit:fill;
}
.text_container {
    padding:0 .75rem;
}
h3 {
    max-width:100%;
    overflow-wrap:anywhere;
    font-size:1.4rem;
    font-weight:400;
    line-height:1.65rem;
    margin:0;
    padding:.5rem .25rem;
}
p {
    max-width:90%;
    overflow-wrap:anywhere;
    padding:1rem .5rem !important;
}
</style>