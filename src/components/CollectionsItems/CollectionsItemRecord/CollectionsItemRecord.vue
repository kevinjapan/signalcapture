<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/stores/AppStore'
import RecordCardTags from '@/components/Tags/RecordCardTags/RecordCardTags.vue'
import { img_size_filter, slugify } from '@/utilities/utilities/utilities'



// CollectionsItemRecordContainer
// container for CollectionsItemRecord component
// the container will retrieve the record and pass it to child component

const props = defineProps<{
    item: CollectionsItem
}>()

const AppStore = useAppStore()
const { root_folder, use_img_widths, lg_img_width } = AppStore

const src = ref<string>('')
const is_loading = ref<boolean>(false)

onMounted(() => {
   load_img()
})

watch(() => props.item,async() => {
   load_img()
})

// to do : if can't find image.. not loaded.. but still shows spinner currenlty...

const load_img = async() => {
   // to show 'loading' spinner we load img into local img object, then set the src in <img>
   is_loading.value = true
   const img = new Image()
   img.src = root_folder + props.item?.folder_path + props.item?.file_name + img_size_filter(use_img_widths,lg_img_width)


   try {
      await new Promise((resolve,reject) => {
         img.onload = resolve
         img.onerror = reject
      src.value = img.src
      is_loading.value = false
   })
   }
   catch(error) {
      
      // to do : replace 'notfound.jpg' with appropriate img !
      src.value = '/imgs/notfound.jpg'
      is_loading.value = false
   }

}

// to do : tidy up

const show_error = () => {
   if(src.value === '') { 
      console.log('EMPTY')
      return
   }
   if(is_loading.value = true) return null
   console.log('error here')
   if(is_loading.value) {
      console.log('still loading')
   }
   return null
}

const img_loaded = () => {
   console.log('img loaded',src.value)
}
   
</script>

<template>
   <section class="record_view_container mt_1 page_break" :id="item.slug ? item.slug : slugify(item.title)">

      <section v-if="props.item.id" style="background:white;">
        

        <section class="img_container">
         <div v-if="is_loading" class="loading_spin mb_5"></div>
            <!-- if WordPress, get img sizes depending on eg "?w=300" url query string -->
            <!-- <img :src="root_folder + item?.folder_path + item?.file_name + img_size_filter(use_img_widths,lg_img_width)"/> -->
            <img v-else-if="src !== ''" :src="src" @error="show_error" @load="img_loaded" />
        </section>


    </section>

    <section v-if="props.item.id" style="background:white;">

      <section  class="card_part record_card_header">
      <div class="v_center text_flex_end">title</div><div class="lg_text">{{ item?.title }}</div>
        <div>desc</div><div>{{ item?.content_desc }}</div>
        <div>file name</div><div>{{ item?.file_name }}</div>
        <div>file type</div><div>{{ item?.file_type }}</div>
        <div>folder</div><div>{{ item?.folder_path }}</div>
        <div>keywords</div><div>{{ item?.keywords }}</div>
        <div>img desc</div><div>{{ item?.imgDesc }}</div>
      </section>

      <section v-if="props.item.id" class="card_part record_card_footer">
        <div>item ref</div><div>{{ item?.item_ref }}</div>
        <div>item date</div><div>{{ item?.item_Date }}</div>
        <div>item type</div><div>{{ item?.item_Type }}</div>
        <div>location</div><div>{{ item?.location }}</div>
        <div>author / creator</div><div>{{ item?.author_creator }}</div>
        <div>people</div><div>{{ item?.people }}</div>
        <div>source</div><div>{{ item?.source }}</div>
        <div>donor</div><div>{{ item?.donor }}</div>
        <div>owner</div><div>{{ item?.owner }}</div>
        <div>copyright</div><div>{{ item?.copyright }}</div>
        <div>id</div><div>{{ item?.id }}</div>
        <div>created</div><div>{{ item?.created_at }}</div>
        <div>last updated</div><div>{{ item?.updated_at }}</div>
        <div>last viewed</div><div>{{ item?.viewed_at }}</div>
        <div>deleted</div><div>{{ item?.deleted_at }}</div>
      </section>
    <section v-if="props.item.id" class="card_part record_card_tags">
        <RecordCardTags v-if="item.tags" :tags="item?.tags"/>
    </section>

   </section>

</section>
</template>

<style scoped>
section.card_part {    
    display:-ms-grid;
    display:grid;
    -ms-grid-columns:1fr 4fr;
    grid-template-columns:1fr 4fr;
    gap:.75rem;
    /* we let containing grid set width */
    padding:1rem;
}
section.record_card_header{
    margin:0 2rem;
    margin-bottom:0;
    background:white;
    border-radius:.5rem .5rem 0 0;
}
section.record_card_header > *:nth-child(2n + 1),
section.record_card_footer > *:nth-child(2n + 1),
section.record_card_tags > *:nth-child(2n + 1) {
    text-align:right;
    color:hsl(0, 0%, 50%);
    padding-right:.5rem;
    font-size:.95rem;
    /* we retain user select on field contents, but remove awkward highlights where we can */
   
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
    user-select: none;
}
section.record_card_footer {
    -ms-grid-columns:1fr 2fr 1fr 2fr;
    grid-template-columns:1fr 2fr 1fr 2fr;
    margin:0 2rem;
    background:white;
}
section.record_card_tags {
    -ms-grid-columns:1fr 5fr;
    grid-template-columns:1fr 5fr;
    margin:1rem 2rem;
    margin-top:0;
    background:white;
    border-radius:0 0 .5rem .5rem;
}
.img_container {
    width:100%;
    height:100%;
    overflow-y:hidden;
    border-radius:.5rem;
}
img {
    width:100%;
    object-fit:fill;
}
</style>