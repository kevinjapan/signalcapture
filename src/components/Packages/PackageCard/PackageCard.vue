<script setup lang="ts">
import { useRouter } from 'vue-router'



// PackageCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

// to do : 
// - img resolution is currently case-sensite (from json dataset)
// - folder path currently must end with '\\' or fails (not flexible)

// Component Interface - props and emits
const props = defineProps<{
   item: Package
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

<!-- to do : rename all 'collection' references -->

    <section v-if="props.item" class="collection_item_card">

        <section class="img_container">
            <img :src="root_folder + props.item.folder_path + props.item.file_name"/>
        </section>

        <section class="text_container">
            <h3>
                <a @click.stop="open_nav_link(`/packages/${props.item.id}`)" >{{ props.item.title }}</a>
            </h3>
            <p>{{ props.item.file_type }}</p>
            <p>{{ props.item.file_name }}</p>
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
h3 {
    max-width:90%;
    overflow-wrap:anywhere;
}
p {
    max-width:90%;
    overflow-wrap:anywhere;
}
</style>