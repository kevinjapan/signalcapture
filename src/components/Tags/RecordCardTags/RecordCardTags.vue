<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useTagsStore } from '@/stores/TagsStore'



// RecordCardTags

// to do : focus on UI styling -
// get it really pro.


const props = defineProps<{
    tags: string
}>()

const TagsStore = useTagsStore()
TagsStore.load_tags()

const tags_list = ref<Tag[] | null>(null)

watchEffect(() => {    
    const tags_arr = props.tags.split(',')
    const tags_arr_nums = tags_arr.map((tag) => parseInt(tag))
    tags_list.value = <Tag[]>TagsStore.get_tags_by_id(tags_arr_nums)
})
</script>


<template>

<!-- to do : display tags nice like ! -->
    <div>tags</div>
    <div>
        <div v-for="tag in tags_list">
            {{ tag }}
        </div>
    </div>

</template>