<script setup lang="ts">
import { useRouter } from 'vue-router'



// CollectionItemTeaserCard
// smaller Card for PackageCollectionsItems UI
// to do : review - can we use in browse/search for smaller card option also (toggle view card/list/small-card)

const props = defineProps<{
   item: CollectionsItem
}>()

const root_folder = '/collection'

// future : some examples using this please
// const emit = defineEmits<{
//   change: [id: number]
//   updade: [value: string]
// }>()

const router = useRouter()

// we push rather than RouterLink to allow close app_nav etc
const open_nav_link = (route:string) => {
   router.push(route)
}

</script>

<template>

    <section v-if="props.item" class="collection_item_teaser_card">

        <section class="img_container">
            <img :src="root_folder + props.item.folder_path + props.item.file_name"/>
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
    order:solid 1px blue;
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