<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useCollectionItemsStore } from '../stores/collectionItemsStore'
import get_ui_ready_date from '../utilities/dates/dates'



const collection_items_store = useCollectionItemsStore()

 


const items_list = ref<CollectionsItemList | null>(null)

onBeforeMount(async() => {

   // to do : only load data if necessary.
   // if(!collection_items_store.collection_items) {

   await collection_items_store.load_collection_items()
   
      // if(result && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)    
      // console.log('RESULT',result)
   // }

   // now we can use 'collection_items_store.collection_items'
   console.log(collection_items_store.collection_items)

   // to do : see collectionItemsStore - need to bring in generic useData version to handle different data transfers

   items_list.value = collection_items_store.collection_items
})


const order_songs_by = (col_title: string) => {
   console.log(col_title)

   // // start @ page 1
   // page.value = 1

   // // set order_by col
   // order_by.value = col_title
   // song_store.current_order_by = col_title

   // // toggle asc
   // if(asc.value) {
   //    asc.value = false
   //    song_store.current_asc = false
   // }
   // else {
   //    asc.value = true
   //    song_store.current_asc = true
   // }
}

const clicked_title = (title: string) => {
   console.log(title)
}

// const get_song_img = (img: string) => {
//    return `/data/imgs/songs/${img.toLowerCase()}`
// }
const { data, error } = useFetch(url)

const retry = () => {
  id.value = ''
  id.value = '1'
}
</script>

<template>
  Load post id:
  <button v-for="i in 5" @click="id = `${i}`">{{ i }}</button>

	<div v-if="error">
    <p>Oops! Error encountered: {{ error.message }}</p>
    <button @click="retry">Retry</button>
  </div>
  <div v-else-if="data">Data loaded: <pre>{{ data }}</pre></div>
  <div v-else>Loading...</div>
</template>


<template>

   <section class="grid_list">


      <h1>BrowseView in here</h1>

         <!-- <PaginationNav 
            title="PageNav for SongsList" 
            :page=page 
            :page_links="page_links"
            @step-to-page="step_to_page" 
            @navigate-to-page="navigate_to_page" 
            class="mt_3"
         /> -->

         <ul class="songs_list">           
            <li class="grid_list_row titles_row">
               <div></div>
               <div @click="order_songs_by('title')" class="cursor_pointer col col_title">title</div>
               <div @click="order_songs_by('created_at')" class="cursor_pointer col col_title date_col">made</div>
               <div @click="order_songs_by('updated_at')" class="cursor_pointer col col_title date_col">updated</div>
               <div class=" date_col"></div>
            </li>
            <li v-for="item in items_list?.list" :key="item.id"
                  class="grid_list_row cursor_pointer"  
                  @click="clicked_title(item.title)">
                  <!-- to do : orig was item.slug - but we don't have a slug in json dataset yet.. -->
               <div class="col">
                  <!-- <img v-if="item." class="list_teaser_img" :src="get_item_img(item?.img)" /> -->
                  <!-- <div v-else class="no_img"></div> -->
               </div>
               <div class="col cursor_pointer item_title" >{{ item.title }}</div> 
               <div class="col date_col">{{ get_ui_ready_date(item.createdAt) }}</div>
               <div class="col date_col">{{ get_ui_ready_date(item.updatedAt) }}</div>
               <div class="col date_col">
                  <!-- <ResourceLinks :links="item.links" /> -->
               </div>
            </li>
         </ul>

   </section>

</template>


<style scoped>
.songs_list {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;
   gap:2rem;
   max-width:100%;
   padding-right:2rem;
}
.grid_list_row {
   padding-top:2rem;
}
.song_title {
   font-size:1.75rem;
}
li.titles_row {
   visibility:hidden;
}
.col_title {
   color:hsl(0, 0%, 73%);
   font-style:italic;
}
.col {
   text-align:center;
}
.date_col {
   text-align:center;
}
img.list_teaser_img {
   width:160px;
   margin-top:.25rem;
   height:100px;
   border-radius:1rem;
}
div.no_img {
   width:160px;
}
@media (min-width: 768px) {
   li.titles_row {
      /* toggling display will interfere w/ grid display */
      visibility:visible;
   }
   .songs_list {
      gap:1rem;
   }
   .song_title {
      font-size:1.05rem;
      font-weight:500;
   }
   .col {
      text-align:left;
   }
   .date_col {
      text-align:right;
   }
   img.list_teaser_img {
      width:80px;
      height:50px;
   }
   div.no_img {
      width:80px;
   }
}
</style>