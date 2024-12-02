<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'



// PackageCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

const props = defineProps<{
   item: Package
}>()

const router = useRouter()

const AppStore = useAppStore()

const open_nav_link = (route: string) => {
   router.push(route)
}
</script>

<template>
    <section v-if="props.item" class="package_teaser_card">
        <section class="img_container">
            <a @click.stop="open_nav_link(`/packages/${props.item.id}`)" >
                <img :src="AppStore.root_folder + props.item.folder_path + props.item.file_name"/>
            </a>
        </section>
        <section class="text_container">
            <h3>
                <a @click.stop="open_nav_link(`/packages/${props.item.id}`)" >{{ props.item.title }}</a>
            </h3>
        </section>
    </section>
</template>

<style scoped>
.package_teaser_card {
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