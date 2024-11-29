<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useFilesStore } from '@/stores/FilesStore'
import FilesTreeNode from '@/components/FilesTreeNode/FilesTreeNode.vue'
import CollectionsItemRecordContainer from '@/components/CollectionsItems/CollectionsItemRecordContainer/CollectionsItemRecordContainer.vue'


// FilesView
// to do : do we want each sub-domain as a separate folder?
//         - they can be (by default) sub-folders of collections root - unless specified differently

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

   <div class="error_notification" v-if="FilesStore?.error">
      <p>Oops! Error encountered: {{ FilesStore?.error }}</p>
   </div>

   <section v-else class="file_view mt_5">

         <section class="rounded_container">

      <section class="tree_view">
            <ul>
               <FilesTreeNode v-if="tree"
                  :level="parent_level"
                  :model="tree"
                  :file_teaser="{id:0,title:'tester',slug:'tester'}"
               />
            </ul>
         </section>
      </section>

      <section class="record_view">
         <CollectionsItemRecordContainer 
            :id="curr_record_id"
         />
      </section>

   </section>
</template>

<style scoped>
/* future : file will overlay tree in sm/mobile */

section.file_view {
  display:-ms-grid;
  display:grid;
  -ms-grid-columns:       1fr;
  grid-template-columns:  1fr;
}
section.tree_view {
   max-height:88vh;
   border:solid 1px lightgrey;
   overflow-x:hidden;
   overflow-y:scroll;
   padding:1rem;
   scrollbar-color: hsl(0, 0%, 60%) hsl(0, 0%, 94%); 
   scrollbar-width:thin;
   background:white;
}
.rounded_container {
   border-radius:.5rem;
   overflow:hidden;
   height:fit-content;
   margin:0;
   margin-top:.5rem;
   padding-top:1rem;
   padding:0;
}
section.record_view {
   background:transparent
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
   padding:0;
   text-align:left;
   list-style:none;
}
</style>