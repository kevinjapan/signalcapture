<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCollectionsItemStore } from '@/stores/CollectionsItemStore'
import { useFolderItemsListStore } from '@/stores/FolderItemsListStore'
import CollectionsItemRecord from '@/components/CollectionsItems/CollectionsItemRecord/CollectionsItemRecord.vue'



// CollectionsItemViewer
// opens item record in in-page viewer (dlg like)

// to do : review unsplash behaviour - eg can scroll once modal/dlg open?


// Definitions
const props = defineProps<{
   current_item_id: number
}>()
const emit = defineEmits([
   'close-collection-item-viewer'
])

// Refs
const item = ref<CollectionsItem | null>(null)
const is_loading = ref<boolean>(true)
const current_is_first_item = ref<boolean>(true)
const current_is_last_item = ref<boolean>(false)

// Stores
const CollectionsItemStore = useCollectionsItemStore()
CollectionsItemStore.load_single_collection_item(props.current_item_id)
const FolderItemsListStore = useFolderItemsListStore()


// Effects
watchEffect(() => {
   if(CollectionsItemStore.single_collection_item) is_loading.value = false
   item.value = CollectionsItemStore.single_collection_item
})


const close = () => {
   emit('close-collection-item-viewer')
}

// to do : tidy UX of prev/next at edge of array
const prev = (item_id:number) => {
   const prev_item = FolderItemsListStore.get_prev_file(item_id)
   if(prev_item === null) {
      current_is_first_item.value = true
      return
   }
   current_is_last_item.value = false
   item.value = prev_item
}
const next = (item_id:number) => {
   const next_item = FolderItemsListStore.get_next_file(item_id)
   if(next_item === null) {
      current_is_last_item.value = true
      return
   }
   current_is_first_item.value = false
   item.value = next_item
}


</script>



<template>

   <section class="collections_item_viewer" @click="close()">

      <div class="inner">

         this is CollectionsItemViewer : {{ props.current_item_id }}

         <section v-if="item" >

               <div v-if="!current_is_first_item" class="nav_btn prev_btn" @click.stop="prev(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                     <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
                  </svg>prev
               </div>

               <div v-if="!current_is_last_item" class="nav_btn next_btn" @click.stop="next(item.id)">next
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                     <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                  </svg>
               </div>
            

            <CollectionsItemRecord @click.stop :item="item" />

         </section>

      </div>
      
   </section>

</template>



<style scoped>

section.collections_item_viewer {
   position:fixed;
   top:0;
   left:0;
   z-index:999;
   width:100vw;
   height:100vh;
   overflow-y:scroll;
}
div.inner {
   width:80%;
   height:80%;
   position:absolute;
   top:10%;
   left:10%;
   background:white;
}
/* dimmer */
section.collections_item_viewer::before {
   content:'';
   position:absolute;
   z-index:-1;
   top:0;
   left:0;
   background:black;
   opacity:.25;

   width:100%;

   /* extend dimmer to cover height of longest record (w/ img) */
   height:750%;
}
.nav_btn {
   position:fixed;
   top:25%;
   display:flex;
   gap:.3rem;
   /* flex-direction:column; */
   align-items:center;
   margin:.25rem;
   /* width:2rem;
   height:2rem; */
   background:black;
   color:white;
   font-weight:100;
   opacity:.8;
   padding:1rem;
   padding-bottom:1.25rem;
   cursor:pointer;
   border-radius:.5rem;
}
.nav_btn svg {
   margin-top:.25rem;
}
.nav_btn:hover {
   opacity:1;
}
.prev_btn {
   left:0;
}
.next_btn {
   right:0;
}
</style>