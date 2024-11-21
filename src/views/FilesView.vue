<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useFilesStore } from '@/stores/FilesStore'
import FilesTreeNode from '../components/FilesTreeNode/FilesTreeNode.vue'




const FilesStore = useFilesStore()
FilesStore.load_files_tree()

// FilesTreeView
const tree = ref<FilesTree | null>(null)

const parent_level = ref<number>(1)

onMounted(() => {
   window.scroll(0,0)
})

watchEffect(() => {
   tree.value = FilesStore.files_tree
})


</script>

<template>
   <section class="mt_2">
      <ul>
         <FilesTreeNode v-if="tree"
            :level="parent_level"
            :model="tree"
            :file_teaser="{id:1,title:'tester',slug:'tester'}"
         />
      </ul>
   </section>
</template>

<style scoped>
ul {
   margin:0;
   padding-left:1rem;
   text-align:left;
   list-style:none;
}
</style>