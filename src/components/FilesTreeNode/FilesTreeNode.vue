<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFilesStore } from '@/stores/FilesStore'


// FilesTreeNode
// modified from https://vuejs.org/examples/#tree

// Component interface - props and emits
const props = defineProps<{
   level:number,
   model: FilesTree,
   file_teaser: FileTeaser
}>()


const router = useRouter()

const FilesStore = useFilesStore()

const isOpen = ref(false)


// some issue since parent_level is coming through attributes, we need to ensure it is a number here
// const level = ref<number>(props.parent_level ? parseInt(props.parent_level as unknown as string) + 1 : 0)
const my_level = ref<number>(props.level ? props.level + 1 : 0)


const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})


onMounted(() => {
   if(my_level.value < FilesStore.closed_at_level) isOpen.value = true
})

watch(() => FilesStore.closed_at_level,() => {
   console.log('checkin')
   if(FilesStore.closed_at_level < my_level.value) isOpen.value = false
})

const open_teaser = (slug: string) => {
   router.push(`tech/${slug}`)
}

// expand/close this node
const toggle = () => {
   isOpen.value = !isOpen.value
   FilesStore.set_closed_level(!isOpen.value ?  my_level.value - 1 : my_level.value)
}


// to do : 
// - on 'open' - display record or file list on right panel?
//          -  display files as nodes?    'open' record or list of files fro that folder?
// - change 'F' below to folder icon for nodes w/ children

const has_children = (children: FilesTree[]): boolean => {
   return children.length > 0
}

</script>

<template>

   <li>

      <div :class="{ bold: isFolder }" class="cursor_pointer"
         @click="toggle"
         @dblclick="changeType">
         <div>
            <span v-if="model.children && has_children(model?.children)">F</span>
            {{ model.teaser?.title }}
            <a @click.stop="open_teaser(model.teaser.slug)">open</a>
      </div>
      </div>

      <ul v-show="isOpen">
         <FilesTreeNode
            :level="my_level"
            v-for="model in model.children"
            :model="model"
            :file_teaser="model.teaser"
         />
         <!-- <li class="cursor_pointer" @click="addChild">+</li> -->
      </ul>
   </li>

</template>


<style scoped>

ul {
   margin:0;
   padding-left:1rem;
   text-align:left;
}
</style>