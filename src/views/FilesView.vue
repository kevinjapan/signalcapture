<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useFilesStore } from '@/stores/FilesStore'
import FilesTreeNode from '@/components/FilesTreeNode/FilesTreeNode.vue'
import CollectionsItemRecordContainer from '@/components/CollectionsItems/CollectionsItemRecordContainer/CollectionsItemRecordContainer.vue'



const FilesStore = useFilesStore()
FilesStore.load_files_tree()

// FilesTreeView
const tree = ref<FilesTree | null>(null)

const parent_level = ref<number>(1)

const curr_record_id = ref<number>(0)

onMounted(() => {
   window.scroll(0,0)
})

watchEffect(() => {
   tree.value = FilesStore.files_tree
})

watchEffect(() => {
   curr_record_id.value = FilesStore.curr_file_id
})


</script>

<template>
   <section class="file_view mt_2">

      <section>
         <ul>
            <FilesTreeNode v-if="tree"
               :level="parent_level"
               :model="tree"
               :file_teaser="{id:1,title:'tester',slug:'tester'}"
            />
         </ul>
      </section>

      <section>
         <CollectionsItemRecordContainer 
            :id="curr_record_id"
         />
      </section>

   </section>
</template>

<style scoped>
/* to do : file will overlay tree in sm/mobile */
section.file_view {
  display:-ms-grid;
  display:grid;
  -ms-grid-columns:       1fr;
  grid-template-columns:  1fr;
}
@media (min-width: 768px) {
   section.file_view {
      display:-ms-grid;
      display:grid;
      -ms-grid-columns:       1fr 2fr;
      grid-template-columns:  1fr 2fr;
   }
}

ul {
   width:100%;
   margin:0;
   padding-left:1rem;
   text-align:left;
   list-style:none;
}
</style>