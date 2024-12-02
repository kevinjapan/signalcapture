<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useTagsStore } from '@/stores/TagsStore'


// TagsSelector
// display all tags for selecting

const emit = defineEmits([
   'tag-selected'
])

const TagsStore = useTagsStore() // to do : better name - this is list of tags store only...
TagsStore.load_tags()


// local ref to store's Tags list
const list = ref<Tag[] | null>(null)

// display loading spinner
const is_loading = ref<boolean>(true)

const selected_id = ref<number>(0)

// to do : highlight on clicking 'back' from a record

onMounted(() => {
   window.scroll(0,0)
})
watchEffect(() => {
   is_loading.value = TagsStore.loading.value
})
watchEffect(() => {
   list.value = <Tag[]>TagsStore.paginated_tags_list
})

const tag_selected = (tag_id: number) => {
   emit('tag-selected',tag_id)
   selected_id.value = tag_id
}



</script>

<template>
   <ul class="flex gap_1 cursor_pointer mt_5">
      <li v-for="item in list" 
            :key="item.id"  
            :item="item as unknown as Tag" 
            @click="tag_selected(item.id)"
            :class="{bg_selected: selected_id === item.id}">
         {{ item.tag }}
      </li>
   </ul>
</template>


