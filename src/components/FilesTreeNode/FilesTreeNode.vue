<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'


// FilesTreeNode
// modified from https://vuejs.org/examples/#tree

// Component interface - props and emits
const props = defineProps<{ 
   model: FilesTree,
   file_teaser: FileTeaser
}>()

const router = useRouter()
const isOpen = ref(false)

// to do : all our nodes are valid lessons?
const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

const open_teaser = (slug: string) => {
   router.push(`tech/${slug}`)
}
const toggle = () => {
  isOpen.value = !isOpen.value
}

const changeType = () => {
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}
const addChild = () => {
   // props?.model?.children?.push({ 
   //    teaser: {
   //       id: 9999,
   //       title: 'new child',
   //       slug: '' 
   //    },
   //    children:[]
   // })
}

// to do : can we start w/ first children displayed (one level)
// to do : on open any level below 2, close all peers
// to do : on 'open' - display record or file list on right panel?
//          -  display files as nodes?
//             'open' record or list of files fro that folder?
</script>

<template>

   <li>

      <div :class="{ bold: isFolder }" class="cursor_pointer"
         @click="toggle"
         @dblclick="changeType">
         <div>
            {{ model.teaser?.id }}: {{ model.teaser?.title }}
            <a @click.stop="open_teaser(model.teaser.slug)">open</a>
         </div>
      </div>

      <ul v-show="isOpen">
         <FilesTreeNode
            v-for="model in model.children"
            :model="model"
            :file_teaser="model.teaser"
         />
         <li class="cursor_pointer" @click="addChild">+</li>
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