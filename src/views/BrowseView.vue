<script setup lang="ts">
import { onBeforeMount } from 'vue'
// import { useCollectionItemsStore } from '../stores/collectionItemsStore'
import useFetch from '../utilities/useFetch/useFetch'
import CollectionItemTeaser from '../components/CollectionsItems/CollectionsItemTeaser/CollectionsItemTeaser.vue'


// to do :
// 1. move useFetch into collectionItemsStore and use store herein
// 2. inject useData middleware btwn store and useFetch
// 3. enhance useData and useFetch from prev/orig examples



const baseUrl = '/data/collection-items - sm.json'


const { payload, error, loading, fetchData } = useFetch<CollectionsItemList>(baseUrl,{})

onBeforeMount(async() => {
   await fetchData()
})
// const retry = () => {
//   id.value = ''
//   id.value = '1'
// }

// to do : 
// - interject useData (endPoints)
// - 

// to do : pagination - in CollectionsItemStore

</script>

<template>
	<div v-if="error">
    <p>Oops! Error encountered: {{ error }}</p>
  </div>
  <ul >
      <li v-for="(item,index) in payload?.data" :key="index" >
         <CollectionItemTeaser :item="item"/>
      </li>
  </ul>
  <div v-if="loading">Loading...</div>
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