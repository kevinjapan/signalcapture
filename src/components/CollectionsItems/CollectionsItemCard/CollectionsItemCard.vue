<script setup lang="ts">
import { useRouter } from 'vue-router'



// Component Interface - props and emits
const props = defineProps<{
   item: CollectionsItem
}>()

const root_folder = '/collection'

// const emit = defineEmits<{
//   change: [id: number]
//   updade: [value: string]
// }>()

const router = useRouter()

// we push rather than RouterLink to allow close app_nav
const open_nav_link = (route:string) => {
   router.push(route)
}


</script>

<template>

    <section class="collection_item_card">

        <section class="img_container">
            <img :src="root_folder + props.item.folder_path + props.item.file_name"/>
        </section>

        <section class="text_container">
            <h3>
                <a @click.stop="open_nav_link(`/browse/collections-item/${props.item.slug}`)" >{{ props.item.title }}</a>
            </h3>
            <p>{{ props.item.file_type }}</p>
            <p>{{ props.item.file_name }}</p>
            <p>{{ props.item.item_Date }}</p>
            <p>{{ props.item.folder_path }}</p>
        </section>

    </section>

</template>

<style scoped>
.img_container {
    width:100%;
    max-height:200px;
    overflow-y:hidden;
}
img {
    width:100%;
    object-fit:fill;
}
.text_container {
    padding:0 .75rem;
}
</style>