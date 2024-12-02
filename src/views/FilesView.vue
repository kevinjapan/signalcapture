<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useFilesTreeStore } from '@/stores/FilesTreeStore'
import FilesTreeNode from '@/components/Files/FilesTreeNode/FilesTreeNode.vue'
import FolderItemsList from '@/components/Files/FolderItemsList/FolderItemsList.vue'



// FilesView
// future : do we want each sub-domain as a separate folder? - they can be (by default) sub-folders of collections root - unless specified differently

const FilesTreeStore = useFilesTreeStore()
FilesTreeStore.load_files_tree()

// FilesTreeView
const tree = ref<FilesTree | null>(null)

// parent's tree level
const parent_level = ref<number>(1)

// the current selected folder
const curr_folder_id = ref<number>(0)

// the current selected record
const curr_record_id = ref<number>(0)

onMounted(() => {
   window.scroll(0,0)
})

watchEffect(() => {
   tree.value = FilesTreeStore.files_tree
})

watchEffect(() => {
   curr_record_id.value = FilesTreeStore.curr_file_id
})

watchEffect(() => {
   curr_folder_id.value = FilesTreeStore.curr_folder_id

})

const folder_opened = (id: number) => {
   console.log('you opened a folder',id)
}


</script>

<template>

   <div class="error_notification" v-if="FilesTreeStore?.error">
      <p>Oops! Error encountered: {{ FilesTreeStore?.error }}</p>
   </div>

   <section v-else class="file_view mt_5">

      <section class="rounded_container">

         <section class="tree_view">
            <ul>
               <FilesTreeNode v-if="tree"
                  :level="parent_level"
                  :model="tree"
                  :file_teaser="{id:0,title:'tester',slug:'tester'}"
                  @folder-opened="folder_opened"
               />
            </ul>
         </section>
      </section>

      <section class="record_view">
         <FolderItemsList v-if="FilesTreeStore.curr_folder_id"  />
      </section>

   </section>
</template>

<style scoped>

/* future : file will overlay tree in sm/mobile */

section.file_view {
  display:-ms-grid;
  display:grid;
  -ms-grid-columns:1fr;
  grid-template-columns:1fr;
}
@media (min-width: 768px) {
   section.file_view {
      display:-ms-grid;
      display:grid;
      -ms-grid-columns:1fr 3fr;
      grid-template-columns:1fr 3fr;
   }
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
   background:transparent;
   margin:1rem;
   margin-top:0;
}
ul {
   width:100%;
   margin:0;
   padding:0;
   text-align:left;
   list-style:none;
}
</style>