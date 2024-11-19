<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionsItemStore } from '../stores/CollectionsItemStore'



// CollectionsItemView - view a single record

const item = ref<CollectionsItem | null>(null)
const is_loading = ref<boolean>(true)

const route = useRoute()
const CollectionsItemStore = useCollectionsItemStore()
CollectionsItemStore.load_single_collection_item(parseInt(route.params.id as string))

watchEffect(() => {
   if(CollectionsItemStore.single_collection_item) is_loading.value = false
   item.value = CollectionsItemStore.single_collection_item
})

</script>


<template>

   <div v-if="is_loading" class="loading_spin"></div>

   <section v-else class="record_card">
      <div>title</div><div>{{ item?.title }}</div>
      <div>desc</div><div>{{ item?.content_desc }}</div>
      <div>file name</div><div>{{ item?.file_name }}</div>
      <div>file type</div><div>{{ item?.file_type }}</div>
      <div>folder</div><div>{{ item?.folder_path }}</div>
      <div>img desc</div><div>{{ item?.imgDesc }}</div>
      <div>item ref</div><div>{{ item?.item_ref }}</div>
      <div>item date</div><div>{{ item?.item_Date }}</div>
      <div>item type</div><div>{{ item?.item_Type }}</div>
      <div>author / creator</div><div>{{ item?.author_creator }}</div>
      <div>people</div><div>{{ item?.people }}</div>
      <div>source</div><div>{{ item?.source }}</div>
      <div>tags</div><div>{{ item?.tags }}</div>
      <div>id</div><div>{{ item?.id }}</div>
      <div>created</div><div>{{ item?.created_at }}</div>
      <div>last updated</div><div>{{ item?.updated_at }}</div>
      <div>deleted</div><div>{{ item?.deleted_at }}</div>
   </section>

</template>


<style scoped>
section.record_card{
   display:grid;
   grid-template-columns:1fr 2fr;
   gap:.75rem;
   margin:5rem 3rem;
   max-width:600px;
   background:white;
   padding:1rem;
   border-radius:.5rem;
}

</style>