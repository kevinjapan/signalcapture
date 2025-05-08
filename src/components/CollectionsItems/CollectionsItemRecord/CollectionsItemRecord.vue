<script setup lang="ts">
import RecordCardTags from '@/components/Tags/RecordCardTags/RecordCardTags.vue'

// CollectionsItemRecordContainer
// container for CollectionsItemRecord component
// the container will retrieve the record and pass it to child component



const props = defineProps<{
    item: CollectionsItem
}>()



</script>

<template>
   <section class="record_view_container mt_1 page_break" >

      <section v-if="props.item.id" style="background:white;">
        
        <section class="img_container">
            <img :src="'\\collection\\' + item?.folder_path + item?.file_name" />
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