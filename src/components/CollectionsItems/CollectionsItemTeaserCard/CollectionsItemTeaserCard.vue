<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'
import { img_size_filter } from '@/utilities/utilities/utilities'



// CollectionItemTeaserCard
// smaller Card for PackageCollectionsItems UI

const props = defineProps<{
   item: CollectionsItem
}>()

const router = useRouter()

const AppStore = useAppStore()
const { root_folder, use_img_widths, sm_img_width } = AppStore

const open_nav_link = (route:string) => {
   router.push(route)
}
</script>

<template>
    <section v-if="props.item" class="collection_item_teaser_card">
         <!-- 
         to do :
          we can force Wordpress to return smaller size image using ?w=xxxx query value
          obviously this will break our local server - so need a flag if we are using WP server
          -->
        <section class="img_container">
            <a @click.stop="open_nav_link(`/browse/collections-item/${props.item.id}`)" >
               <!-- if WordPress, get img sizes depending on eg "?w=300" url query string -->
               <img :src="root_folder + props.item.folder_path + props.item.file_name + img_size_filter(use_img_widths,sm_img_width)"/>
            </a>
        </section>
        <section class="text_container">
            <h3>
                <a @click.stop="open_nav_link(`/browse/collections-item/${props.item.id}`)" >{{ props.item.title }}</a>
            </h3>
            <p>{{ props.item.file_name }}</p>
            <p class="italic sm_text grey_text">{{ props.item.folder_path }}</p>
        </section>
    </section>
</template>

<style scoped>
.collection_item_teaser_card {
    border:solid 1px lightgrey;
    border-radius:.5rem;
    overflow:hidden;
    background:white;
}
.img_container {
    width:100%;
    height:100px;
    /* border:solid 1px blue; */
    overflow-y:hidden;
}
img {
    width:100%;
    height:fit-content;
    object-fit:fill;
}
.text_container {
    padding:0 .75rem;
}
h3 {
    max-width:90%;
    overflow-wrap:anywhere;
}
p {
    max-width:90%;
    overflow-wrap:anywhere;
}
</style>