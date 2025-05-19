<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'
import { img_size_filter } from '@/utilities/utilities/utilities'


// CollectionItemCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

const props = defineProps<{
   item: CollectionsItem
}>()

const router = useRouter()

const AppStore = useAppStore()
const { root_folder, use_img_widths, sm_img_width } = AppStore

const open_nav_link = (route:string) => {
   router.push(route)
}

// to do : handle if error return img file - some notification?

</script>

<template>

    <section class="collection_item_list_item">

        <a class="img_container" @click.stop="open_nav_link(`/browse/collections-item/${props.item.id}`)" >
            <!-- if WordPress, get img sizes depending on eg "?w=300" url query string -->
            <img :src="root_folder + props.item.folder_path + props.item.file_name + img_size_filter(use_img_widths,sm_img_width)"/>
        </a>
    
        <h3>
            <a @click.stop="open_nav_link(`/browse/collections-item/${props.item.id}`)" >{{ props.item.title }}</a>
        </h3>
        <p>{{ props.item.file_type }}</p>
        <p class="italic sm_text">{{ props.item.folder_path }}</p>
        <p class="sm_text">{{ props.item.file_name }}</p>
        <p>{{ props.item.item_Date }}</p>

    </section>

</template>

<style scoped>
.img_container {
    width:100px;
    max-width:100px;
    height:100%;
    grid-row: 1/4;
}
img {
    width:100%;
    height:100%;
}
h3 {
    font-size:1.05rem;
    font-weight:400;
    text-align:left;
    margin:0;
}
.collection_item_list_item {
    display:-ms-grid;
    display:grid;
    -ms-grid-columns:1fr;
    grid-template-columns:1fr;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    gap:0;
    background:white;
    border-radius:.5rem;
    overflow:hidden;
}
.collection_item_list_item > *  {
    margin:0;
}
@media screen and (min-width: 660px) {    
    img {
        -ms-grid-row: 1; 
        -ms-grid-row-span: 5;
        grid-row: 1 / 6;
    }
    .collection_item_list_item {
        -ms-grid-columns:100px 3fr;
        grid-template-columns:100px 3fr;
        gap:0;
    }
}
@media screen and (min-width: 910px) {
    .collection_item_list_item {
        -ms-grid-columns:100px 3fr 2fr;
        grid-template-columns:100px 3fr 2fr;
        gap:.35rem;
    }
}
</style>