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

const toggle_tree_view = () => {
   const file_view_container = document.getElementById('file_view')
   if(file_view_container) {
      file_view_container.classList.toggle('close_files')
   }
}

</script>

<template>

<!-- to do : ctrl to close all nodes (as in figma) -->
   <div class="error_notification" v-if="FilesTreeStore?.error">
      <p>Oops! Error encountered: {{ FilesTreeStore?.error }}</p>
   </div>

   <section v-else class="file_view" id="file_view">

      <!-- to do : why this wrapper section? -->
      <section style="max-width:fit-content;">

         <section class="tree_view">

            <section class="tree_view_navbar">
               <div @click="toggle_tree_view()" class="clickable">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-sidebar" viewBox="0 0 16 16">
                     <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z"/>
                  </svg>
               </div>
            </section>

            <ul class="tree_view_tree">
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
      -ms-grid-columns:1fr 4fr;
      grid-template-columns:1fr 4fr;
   }

   /* 
   toggle to show/hide side files tree_view 
   */
   /* section.file_view section.tree_view {
      width:100%;
   } */
   section.file_view.close_files {
      -ms-grid-columns:1fr 7fr;
      grid-template-columns:1fr 7fr;
      /* overflow:hidden; */
   }
   section.file_view.close_files  ul.tree_view_tree {
      display:none;
   }
}
section.tree_view {
   position:fixed;
   
   /* to do : since fixed, can we emulate changes to record_view underneath in columns? change on media query..? */
   display:grid;
   grid-template-columns:1fr 7fr;

   height:100vh;
   max-height:88vh;
   border-right:solid 1px lightgrey;

   overflow-x:hidden;
   overflow-y:scroll;
   scrollbar-color: hsl(0, 0%, 60%) hsl(0, 0%, 94%); 
   scrollbar-width:thin;
   background:white;
   margin-top:1rem;

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
section.tree_view ::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

section.tree_view_navbar {
   display:flex;
   justify-content:flex-end;
   padding:.25rem;
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