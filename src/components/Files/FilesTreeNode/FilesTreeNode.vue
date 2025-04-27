<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useFilesTreeStore } from '@/stores/FilesTreeStore'



// FilesTreeNode
// modified from https://vuejs.org/examples/#tree

const props = defineProps<{
   level:number,
   model: FilesTree,
   file_teaser: FileTeaser
}>()

const emit = defineEmits([
   'child-opened'
])

//  
const my_id = ref<number>(props.file_teaser.id)

//
const FilesTreeStore = useFilesTreeStore()

//
const isOpen = ref(false)

// used for blanket peer closing (on-going)
const my_level = ref<number>(props.level ? props.level + 1 : 0)

//
const is_selected = ref<boolean>(false)

onMounted(() => {
   if(my_level.value < FilesTreeStore.closed_at_level) isOpen.value = true
   if(my_id.value === FilesTreeStore.curr_file_id) isOpen.value = true
})

watchEffect(() => {
   is_selected.value = my_id.value === FilesTreeStore.curr_file_id ? true : false
})

// retain : for displaying files in tree..
// const open_record = (id: number) => {
//    FilesTreeStore.curr_file_id = id
// }

const open_folder = (id: number) => {
   FilesTreeStore.curr_folder_id = id
}

const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

// expand/close this node
const toggle = () => {
   isOpen.value = !isOpen.value

   if(isOpen.value) emit('child-opened')
   FilesTreeStore.set_closed_level(!isOpen.value ?  my_level.value - 1 : my_level.value)

   // we set selected folder id in FilesTreeStore
   FilesTreeStore.curr_file_id = my_id.value
}

// retain : 
// const has_children = (children: FilesTree[]): boolean => {
//    return children.length > 0
// }

const child_opened = () => {
   // future : we now know if a child of the curr node has opened, so we can close our other children?
   // console.log('my child opened',props.model.teaser.id)
}
</script>

<template>
   <li v-if="isFolder">

      <div :class="{ bold: isFolder, bg_selected: is_selected, font_weight_900: is_selected }" 
            class="cursor_pointer no_user_select highlight_hover"
         @click="toggle">

         <div class="flex align_items_center gap_.25 p_.2 pl_1">

            <img v-if="!isOpen" src="../../../assets/icons/folder.svg" alt="folder" />
            <img v-else src="../../../assets/icons/folder-open.svg" alt="folder" />
            <a @click="open_folder(model.teaser.id)">{{ model.teaser?.title }} 
                  <span class="text_grey">{{ model.children.length }}</span></a>
           
            <!-- retain : for displaying files in tree.. 
            <span v-else>
               <img src="../../assets/icons/file.svg" alt="file" />
               <a @click.stop="open_record(model.teaser.id)">{{ model.teaser?.title }}</a>
            </span> 
            -->
         </div>

      </div>
      
      <ul v-show="isOpen">
         <FilesTreeNode
            :level="my_level" 
            v-for="model in model.children"
            :model="model"
            :file_teaser="model.teaser"
            @child-opened="child_opened"
         />
      </ul>

   </li>
</template>

<style scoped>
ul {
   margin:0;
   padding:0;
   padding-left:.7rem;
   text-align:left;
   list-style:none;
}
li {
   padding:0;
}
li:hover {
   background:transparent;
}
li > div {
   padding-top:.2rem;
   padding-bottom:.2rem;
}
a {
   width:100%;
   overflow-wrap:anywhere;
   font-weight:400;
}
.text_grey {
   font-size:.9rem;
   color:hsl(0, 0%, 60%);
}
a:hover {
   color:unset;
}
.highlight_hover:hover {
   background:hsl(60, 100%, 80%);
}
</style>