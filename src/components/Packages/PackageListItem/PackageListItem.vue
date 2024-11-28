<script setup lang="ts">
import { useRouter } from 'vue-router'



// CollectionItemCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

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
const open_nav_link = (route: string) => {
   router.push(route)
}

</script>

<template>

    <section class="package_list_item">

        <img :src="root_folder + props.item.folder_path + props.item.file_name"/>
    
        <h3>
            <a @click.stop="open_nav_link(`/packages/${props.item.id}`)" >{{ props.item.title }}</a>
        </h3>
        <p>{{ props.item.file_type }}</p>
        <p class="italic sm_text">{{ props.item.folder_path }}</p>
        <p class="sm_text">{{ props.item.file_name }}</p>

    </section>

</template>

<style scoped>
img {
    width:100px;
    max-width:100px;
    height:100%;
    grid-row: 1 / 4;
}
h3 {
    font-size:1.05rem;
    font-weight:400;
    text-align:left;
    margin:0;
}
.package_list_item > *  {
    margin:0;
}
.package_list_item {
    display:-ms-grid;
    display:grid;
    -ms-grid-columns:1fr;
    grid-template-columns:1fr;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    gap:0;
    background:white;
}
@media screen and (min-width: 660px) {    
    img {
        -ms-grid-row: 1; 
        -ms-grid-row-span: 5;
        grid-row: 1 / 6;
    }
    .package_list_item {
        -ms-grid-columns:100px 3fr;
        grid-template-columns:100px 3fr;
        gap:0;
    }
}
@media screen and (min-width: 910px) {
    .package_list_item {
        -ms-grid-columns:100px 3fr 2fr;
        grid-template-columns:100px 3fr 2fr;
        gap:.2rem;
    }
}
</style>