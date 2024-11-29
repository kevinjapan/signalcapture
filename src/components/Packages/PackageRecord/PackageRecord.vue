<script setup lang="ts">
import PackageCollectionsItems from '@/components/Packages/PackageCollectionsItems/PackageCollectionsItems.vue'
import PackageRecordCtrls from './PackageRecordCtrls/PackageRecordCtrls.vue'


// PackageRecord


const props = defineProps<{
    item: Package
}>()


// future :
// - produce an html / pdf of all items in the package
// - user can check which items to include in above

</script>

<template>

    <section v-if="props.item.id" class="package_record_card">
        <div></div>
        <section class="img_container">
            <img :src="'\\collection\\' + item?.folder_path + item?.file_name"/>
        </section>

        <div></div>
        <PackageRecordCtrls :package_id="item?.id"/>

        <div class="v_center text_flex_end">title</div><div class="xlg_text">{{ item?.title }}</div>
        <div>description</div><div>{{ item?.content_desc }}</div>
        <div>keywords</div><div>{{ item?.keywords }}</div>


        <div></div>
        <PackageCollectionsItems 
            :collection_items="item.collection_items"
        />

        <div>img desc</div><div>{{ item?.imgDesc }}</div>

        <div>author / creator</div><div>{{ item?.author_creator }}</div>

        <div class="divider">package image file</div>
        <div class="divider"></div>

        <div>file name</div><div>{{ item?.file_name }}</div>
        <div>file type</div><div>{{ item?.file_type }}</div>
        <div>folder</div><div>{{ item?.folder_path }}</div>
      
        <div class="divider"></div>
        <div class="divider"></div>

        <div>tags</div>         <div>{{ item?.tags }}</div>
        <div>id</div>           <div>{{ item?.id }}</div>
        <div>created</div>      <div>{{ item?.created_at }}</div>
        <div>last updated</div><div>{{ item?.updated_at }}</div>
        <div>last viewed</div><div>{{ item?.viewed_at }}</div>
        <div>deleted</div><div>{{ item?.deleted_at }}</div>
    </section>

</template>

<style scoped>
section.package_record_card {
   display:grid;
   grid-template-columns:1fr 4fr;
   gap:.75rem;
   margin:3rem 2rem;
   height:80%;
   background:white;
   padding:1rem;
   border-radius:.5rem;
}
section.package_record_card > *:nth-child(2n + 1) {
    text-align:right;
    color:hsl(0, 0%, 40%);
    padding-right:.5rem;
    font-size:.95rem;
}
.img_container {
    width:100%;
    height:200px;
    overflow-y:hidden;
    border-radius:.5rem;
}
img {
    width:100%;
    object-fit:fill;
}
.divider {
    padding:.25rem;
    padding-top:1rem;
    font-style:italic;
    font-size:.95rem;
    color:hsl(0, 0%, 40%);
}
</style>