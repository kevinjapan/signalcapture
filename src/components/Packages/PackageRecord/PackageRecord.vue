<script setup lang="ts">



// PackageRecord

// Component Interface - props and emits
const props = defineProps<{
    item: Package
}>()

// to do : ensure if a record doesn't have a field it isn't populated w/ last records field value

</script>

<template>

    <section v-if="props.item.id" class="record_card">
        <div>title</div><div>{{ item?.title }}</div>
        <div>desc</div><div>{{ item?.content_desc }}</div>
        <div>file name</div><div>{{ item?.file_name }}</div>
        <div>file type</div><div>{{ item?.file_type }}</div>
        <div>folder</div><div>{{ item?.folder_path }}</div>
        <div>keywords</div><div>{{ item?.keywords }}</div>
        <div>img desc</div><div>{{ item?.imgDesc }}</div>
        
        <div></div><section class="img_container">
            <img :src="'\\collection\\' + item?.folder_path + item?.file_name"/>
        </section>

        <div>author / creator</div><div>{{ item?.author_creator }}</div>

        <div>tags</div><div>{{ item?.tags }}</div>
        <div>id</div><div>{{ item?.id }}</div>
        <div>created</div><div>{{ item?.created_at }}</div>
        <div>last updated</div><div>{{ item?.updated_at }}</div>
        <div>last viewed</div><div>{{ item?.viewed_at }}</div>
        <div>deleted</div><div>{{ item?.deleted_at }}</div>
    </section>

</template>

<style scoped>
section.record_card{
   display:grid;
   grid-template-columns:1fr 2fr;
   gap:.75rem;
   margin:1rem 2rem;
   max-width:600px;
   background:white;
   padding:1rem;
   border-radius:.5rem;
}
.img_container {
    width:100%;
    max-height:200px;
    overflow-y:hidden;
}
img {
    width:100%;
    object-fit:fill;
}
</style>