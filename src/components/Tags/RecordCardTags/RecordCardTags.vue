<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/stores/TagsStore'



// RecordCardTags

const props = defineProps<{
    tags: string
}>()

const router = useRouter()

const TagsStore = useTagsStore()
TagsStore.load_tags()

const tags_list = ref<Tag[] | null>(null)

watchEffect(() => {    
    const tags_arr = props.tags.split(',')
    const tags_arr_nums = tags_arr.map((tag) => parseInt(tag))
    tags_list.value = <Tag[]>TagsStore.get_tags_by_id(tags_arr_nums)
})

const open_tag = (tag_id:number) => {
   router.push(`/tags/${tag_id}`)
}
</script>

<template>
    <div class="v_center text_flex_end">tags</div>
    <div class="flex gap_.5">
        <div v-for="tag in tags_list" class="tag_on_record" @click="open_tag(tag.id)">
            {{ tag.tag }}
        </div>
    </div>
</template>

