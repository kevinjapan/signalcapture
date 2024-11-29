<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionsItemStore } from '../stores/CollectionsItemStore'
import CollectionsItemRecord from '@/components/CollectionsItems/CollectionsItemRecord/CollectionsItemRecord.vue'



// CollectionsItemView - view a single record

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

</script>


<template>

   <div v-if="is_loading" class="loading_spin"></div>

   <section v-if="item" class="record_view_container mt_5">
      
      <section>
         
      </section>

      <section >
         <CollectionsItemRecord
            :item="item"
         />
      </section>

   </section>

</template>


<style scoped>

section.record_view_container {
  display:-ms-grid;
  display:grid;
  -ms-grid-columns:       1fr;
  grid-template-columns:  1fr;
}
@media (min-width: 768px) {
   section.record_view_container {
      display:-ms-grid;
      display:grid;
      -ms-grid-columns:       1fr 2fr;
      grid-template-columns:  1fr 2fr;
   }
}
</style>