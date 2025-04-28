<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useFilesTreeStore } from '@/stores/FilesTreeStore'
import FilesTreeNode from '@/components/Files/FilesTreeNode/FilesTreeNode.vue'
import FolderItemsList from '@/components/Files/FolderItemsList/FolderItemsList.vue'



// FilesView
// future : do we want each sub-domain as a separate folder? - they can be (by default) sub-folders of collections root - unless specified differently


// to do : open item view as in Unsplash - in a 'modal' popup (w/ prev/next) we can then close


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
   // console.log('tree',FilesTreeStore.files_tree)
})

watchEffect(() => {
   curr_record_id.value = FilesTreeStore.curr_file_id
})

watchEffect(() => {
   curr_folder_id.value = FilesTreeStore.curr_folder_id
})

const folder_opened = (id: number) => {
   console.log('retain: you opened a folder',id)
}

</script>

<template>

<!-- to do : ctrl to close all nodes (as in figma) -->
   <div class="error_notification" v-if="FilesTreeStore?.error">
      <p>Oops! Error encountered: {{ FilesTreeStore?.error }}</p>
   </div>

   <section v-else class="file_view">

      <section class="">

         <section class="tree_view">
            <ul>
               <FilesTreeNode v-if="tree"
                  :level="parent_level"
                  :model="tree"
                  :file_teaser="{id:0,title:'tester'}"
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
  gap:0;
  margin:0;
}
@media (min-width: 768px) {
   section.file_view {
      display:-ms-grid;
      display:grid;
      -ms-grid-columns:1fr 3.5fr;
      grid-template-columns:1fr 3.5fr;
   }
}
section.tree_view {
   height:80vh;
   max-height:88vh;
   border:solid 1px lightgrey;
   overflow-x:hidden;
   overflow-y:scroll;
   scrollbar-color: hsl(0, 0%, 60%) hsl(0, 0%, 94%); 
   scrollbar-width:thin;
   background:white;
   margin-top:1rem;
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
   margin:0;
   margin-top:0;
   padding:0;
}
ul {
   width:100%;
   margin:0;
   padding:0;
   text-align:left;
   list-style:none;
}
</style>