<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'


// CollectionItemCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

// future : 
// - img resolution is currently case-sensitive (from json dataset)
// - folder path currently must end with '\\' or fails (not flexible)
// - bring in imgs blurred (fixed height) then load w/ intersection obs.

const props = defineProps<{
   item: CollectionsItem
}>()

const router = useRouter()

const AppStore = useAppStore()

const open_nav_link = (route:string) => {
   router.push(route)
}
</script>

<template>
    <section v-if="props.item" class="default_item_card">
      <a @click.stop="open_nav_link(`/browse/collections-item/${props.item.id}`)" >
        <section class="img_container">
            <img :src="AppStore.root_folder + props.item.folder_path + props.item.file_name" />
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
               <p>{{ props.item.folder_path }}</p>
            </div>

        </section>
      </a>
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