<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router'


// CollectionItemCard
// we use id as url param since 'slug' is not ideal, duplicates in dffrnt locations are valid

// future : 
// - img resolution is currently case-sensitive (from json dataset)
// - folder path currently must end with '\\' or fails (not flexible)

// Component Interface - props and emits
const props = defineProps<{
   item: CollectionsItem
}>()

const root_folder = '/collection'

const item = ref<CollectionsItem | null>(null)  // to do : return to props.item and remove watchEffect if not required

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

watchEffect(() => {
    console.log('changed')
    item.value = props.item
})

</script>

<template>

    <section v-if="item" class="default_item_card">

        <section class="img_container">
            <img :src="root_folder + item.folder_path + item.file_name"/>
        </section>

        <section class="text_container">
            <h3>
                <a @click.stop="open_nav_link(`/browse/collections-item/${item.id}`)" >{{ item.title }}</a>
            </h3>
            <p>{{ item.file_type }}</p>
            <p>{{ item.file_name }}</p>
            <p>{{ item.item_Date }}</p>
            <p>{{ item.folder_path }}</p>
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