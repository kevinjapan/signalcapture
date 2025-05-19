<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionsItemStore } from '../stores/CollectionsItemStore'
import { useFolderItemsListStore } from '../stores/FolderItemsListStore'
import CollectionsItemRecord from '@/components/CollectionsItems/CollectionsItemRecord/CollectionsItemRecord.vue'



// CollectionsItemView - view a single record

// future : currently Friockheim imgs - not all are fetched - we need to handle '.JPG' as well as '.jpg'
// to do : make UI pretty - psychology - eg masonary tiling - different sizes for some of them -
//         make it pleasurable to browse etc - not just boring and functional like a spreadsheet/list

// to do : can we use free wordpress.com to save images and somehow retrieve from there? how to add text/meta data?

const item = ref<CollectionsItem | null>(null)
const is_loading = ref<boolean>(true)

const route = useRoute()
const CollectionsItemStore = useCollectionsItemStore()
CollectionsItemStore.load_single_collection_item(parseInt(route.params.id as string))

onMounted(() => {
   window.scroll(0,0)
})

watchEffect(() => {
   if(CollectionsItemStore.single_collection_item) is_loading.value = false
   item.value = CollectionsItemStore.single_collection_item
})


const FolderItemsListStore = useFolderItemsListStore()

// ------------------------------------------------------------------------------------------------------------
// to do : this is the list of peer files in the current folder - so we can navigate prev/next or slideshow ?
// - we may not even have to access the list - just provide a prev() and next() in store to act on current list
console.log('in CollectionItemRecord - list:',FolderItemsListStore.list)
// ------------------------------------------------------------------------------------------------------------


</script>


<template>

   <div v-if="is_loading" class="loading_spin"></div>


   <section v-if="item" style="background:white;" >

      <div style="margin:0;padding:0;width:100%;display:flex;justify-content:space-between;">
         <div>prev {{ FolderItemsListStore.get_prev_item(item.id)}}</div>
         <div>next {{ FolderItemsListStore.get_next_item(item.id) }}</div>
      </div>

      <CollectionsItemRecord :item="item" />

   </section>

</template>


<style scoped>

section.record_view_container {
  display:-ms-grid;
  display:grid;
  -ms-grid-columns:       1fr;
  grid-template-columns:  1fr;
  background:white;
  /* to do : reverse order in stack - so img on top? */
}
@media (min-width: 768px) {
   section.record_view_container {
      display:-ms-grid;
      display:grid;
      -ms-grid-columns:       1fr 1fr;
      grid-template-columns:  1fr 1fr;
      background:white;
   }
}
</style>