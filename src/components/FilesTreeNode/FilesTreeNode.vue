<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useFilesStore } from '@/stores/FilesStore'


// FilesTreeNode
// modified from https://vuejs.org/examples/#tree

// to do : open file
// - in md/lg - opens to right side of tree
// - in sm/mobile - opens in pos:abs div overlaying the tree

// Component interface - props and emits
const props = defineProps<{
   level:number,
   model: FilesTree,
   file_teaser: FileTeaser
}>()



const FilesStore = useFilesStore()

const isOpen = ref(false)


// some issue since parent_level is coming through attributes, we need to ensure it is a number here
const my_level = ref<number>(props.level ? props.level + 1 : 0)


const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})


onMounted(() => {
   if(my_level.value < FilesStore.closed_at_level) isOpen.value = true
})

// peer-to-peer may work but is getting expensive (calls every node on closing a folder)
// watch(() => FilesStore.closed_at_level,() => {
//    if(FilesStore.closed_at_level < my_level.value) isOpen.value = false
// })

const open_record = (id: number) => {
   FilesStore.curr_file_id = id
}

// expand/close this node
const toggle = () => {
   isOpen.value = !isOpen.value
   FilesStore.set_closed_level(!isOpen.value ?  my_level.value - 1 : my_level.value)
}

const has_children = (children: FilesTree[]): boolean => {
   return children.length > 0
}

</script>

<template>

   <li>

      <div :class="{ bold: isFolder }" class="cursor_pointer"
         @click="toggle">
         <div class="flex align_items_center gap_.25">
            <span v-if="model.children && has_children(model?.children)">
               <img v-if="!isOpen" src="../../assets/imgs/folder.svg" alt="folder" />
               <img v-else src="../../assets/imgs/folder-open.svg" alt="folder" />
            </span>
            <span v-else>
               <img src="../../assets/imgs/file.svg" alt="folder" />
            </span>
            
            <a v-if="!model.children || !has_children(model?.children)" @click.stop="open_record(model.teaser.id)">{{ model.teaser?.title }}</a>
            <span v-else>{{ model.teaser?.title }}</span>

         </div>
      </div>
      <ul v-show="isOpen">
         <FilesTreeNode
            :level="my_level"
            v-for="model in model.children"
            :model="model"
            :file_teaser="model.teaser"
         />
      </ul>
   </li>

</template>


<style scoped>

ul {
   margin:0;
   padding-left:1rem;
   text-align:left;
   list-style:none;
}
.bold {
   font-weight:500;
}

</style>