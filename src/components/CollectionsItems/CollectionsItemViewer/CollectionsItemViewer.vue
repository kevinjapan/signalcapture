<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCollectionsItemStore } from '@/stores/CollectionsItemStore'
import { useFolderItemsListStore } from '@/stores/FolderItemsListStore'
import CollectionsItemRecord from '@/components/CollectionsItems/CollectionsItemRecord/CollectionsItemRecord.vue'



// CollectionsItemViewer
// opens item record in in-page viewer (dlg like)

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
const current_is_first_item = ref<boolean>(false)
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

watchEffect(() => {
   if(item?.value) {
      current_is_first_item.value = FolderItemsListStore.is_first_item(item?.value?.id)
      current_is_last_item.value = FolderItemsListStore.is_last_item(item?.value?.id)
   }
})

const close = () => {
   emit('close-collection-item-viewer')
}

const prev = (item_id:number) => {
   const prev_item = FolderItemsListStore.get_prev_item(item_id)
   if(prev_item === null) {
      current_is_first_item.value = true
      return
   }
   current_is_last_item.value = false
   item.value = prev_item
}

const next = (item_id:number) => {
   const next_item = FolderItemsListStore.get_next_item(item_id)
   if(next_item === null) {
      current_is_last_item.value = true
      return
   }
   current_is_first_item.value = false
   item.value = next_item
}

// to do : duplicated in CollectionsItemRecord
const slugify = (title: string) => {
   return title.replaceAll(' ','-')
}

const toggle_item_zoom = () => {
   if(item.value) {

      const viewer = document.getElementById('viewer_card')


      // get record_view_container element
      const slug = item.value.slug ? item.value.slug : slugify(item.value.title)
      const section_elem = document.getElementById(slug)


      if(section_elem && viewer) {
         viewer.classList.toggle('full_screen_zoom')
         section_elem.classList.toggle('full_screen_zoom')
      }
   }
}

</script>



<template>

   <!-- item viewer -->

   <section class="collections_item_viewer" @click="close()">

      <section  v-if="item" class="viewer_card" id="viewer_card">


         <!-- navbar -->
          <!-- future : can we make navbar fix at top of screen once we scrol down further -->

         <section class="collections_item_viewer_navbar">
            <div class="flex gap_.5">
               <div class="grey_text">{{ item.id }}</div>
               <div class="capitalize_first_letter">{{ item.title }}</div>
            </div>
            <div>
               Download
            </div>
         </section>
         
   
         <!-- prev / next btns -->

         <div v-if="!current_is_first_item" class="nav_btn prev_btn" @click.stop="prev(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="22" fill="currentColor" stroke="white" stroke-width="1" class="bi bi-chevron-left" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
         </div>
         <div v-if="!current_is_last_item" class="nav_btn next_btn" @click.stop="next(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="22" fill="currentColor" stroke="white" stroke-width="1" class="bi bi-chevron-right" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
         </div>

            
         <!-- the item record -->

         <CollectionsItemRecord @click.stop="toggle_item_zoom()" :item="item" />


         <!-- future : related items teasers here? -->


      </section>
      
   </section>

</template>



<style scoped>

/* the viewer includes dimmer background - so it full screen */
section.collections_item_viewer {
   position:fixed;
   top:0;
   left:0;
   z-index:999;
   width:100vw;
   height:100vh;
   overflow-y:scroll;

}
section.viewer_card {
   width:80%;
   height:80%;
   position:absolute;
   top:10%;
   left:10%;
   background:white;

   border-radius:.5rem;border:solid 4px red;
   padding:1rem;
   height:fit-content;
}
section.collections_item_viewer_navbar {
   display:flex;
   justify-content:space-between;
   line-height:unset;
}
/* dimmer */
section.collections_item_viewer::before {
   content:'';
   position:absolute;
   z-index:-1;
   top:0;
   left:0;
   background:black;
   opacity:.3;

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
   /* we need bg since there may be text/content behind dimmer */
   background:black;
   color:white;
   font-weight:100;
   opacity:.45;
   padding:.5rem 0;
   padding-bottom:.75rem;
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

section.viewer_card:hover {
   cursor:zoom-in;
}

section.viewer_card.full_screen_zoom {
   position:absolute;
   top:0;
   left:0;
   width:100vw;
   min-height:100vh;
}
section.viewer_card.full_screen_zoom:hover {
   cursor:zoom-out;
}
section.full_screen_zoom {
   position:relative;
   top:0;
   left:0;
}

</style>