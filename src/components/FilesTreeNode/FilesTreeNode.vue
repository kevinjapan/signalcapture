<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useFilesStore } from '@/stores/FilesStore'


// FilesTreeNode
// modified from https://vuejs.org/examples/#tree

// to do : retain state (highlight/open tree) on 'back' from record - currently not consistent

// Component interface - props and emits
const props = defineProps<{
   level:number,
   model: FilesTree,
   file_teaser: FileTeaser
}>()

const emit = defineEmits([
   'child-opened'
])

const my_id = ref<number>(props.file_teaser.id)

const FilesStore = useFilesStore()

const isOpen = ref(false)


// some issue since parent_level is coming through attributes, we need to ensure it is a number here
// used for blanket peer closing (on-going)
const my_level = ref<number>(props.level ? props.level + 1 : 0)

const is_selected = ref<boolean>(false)

const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

onMounted(() => {
   if(my_level.value < FilesStore.closed_at_level) isOpen.value = true
})

watchEffect(() => {
   is_selected.value = my_id.value === FilesStore.curr_file_id ? true : false
})

// retain : for displaying files in tree..
// const open_record = (id: number) => {
//    FilesStore.curr_file_id = id
// }

const open_folder = (id: number) => {
   FilesStore.curr_folder_id = id
}

// expand/close this node
const toggle = () => {
   isOpen.value = !isOpen.value

   if(isOpen.value) emit('child-opened')
   FilesStore.set_closed_level(!isOpen.value ?  my_level.value - 1 : my_level.value)

   // we set selected folder id in FilesStore
   FilesStore.curr_file_id = my_id.value
}

const has_children = (children: FilesTree[]): boolean => {
   return children.length > 0
}

const child_opened = () => {
   // future : we now know if a child of the curr node has opened, so we can close our other children?
   // console.log('my child opened',props.model.teaser.id)
}



</script>

<template>

   <li>

      <div :class="{ bold: isFolder, bg_selected: is_selected, font_weight_900: is_selected }" class="cursor_pointer no_user_select"
         @click="toggle">
         <div class="flex align_items_center gap_.25">

            <span v-if="model.children && has_children(model?.children)">
               <img v-if="!isOpen" src="../../assets/icons/folder.svg" alt="folder" />
               <img v-else src="../../assets/icons/folder-open.svg" alt="folder" />
               <a @click="open_folder(model.teaser.id)">{{ model.teaser?.title }}</a>
            </span>
            
            <!-- retain : for displaying files in tree.. <span v-else>
               <img src="../../assets/icons/file.svg" alt="file" />
               <a @click.stop="open_record(model.teaser.id)">{{ model.teaser?.title }}</a>
            </span> -->

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
   padding-left:1rem;
   text-align:left;
   list-style:none;
}
a {
   width:fit-content;
   overflow-wrap:anywhere;
}
</style>