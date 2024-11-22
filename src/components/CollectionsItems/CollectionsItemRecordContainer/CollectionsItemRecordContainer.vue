<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useCollectionsItemStore } from '@/stores/CollectionsItemStore'
import CollectionsItemRecord from '../CollectionsItemRecord/CollectionsItemRecord.vue'


// CollectionsItemRecordContainer
// container for CollectionsItemRecord component
// the container will retrieve the record and pass it to child component
// to do : review : analogous to CollectionsItemView - so we can use same child  CollectionsItemRecord component therein?

// Component Interface - props and emits
const props = defineProps<{
   id: number
}>()

const CollectionsItemStore = useCollectionsItemStore()
CollectionsItemStore.load_single_collection_item(parseInt(props.id.toString()))
// to do : review - why is arg to load_single... a string and not a number?

const item_id = ref<number>(-1)
const item = ref<CollectionsItem | null>(null)
const is_loading = ref<boolean>(true)

// to do : useful?
watchEffect(() => {
   if(CollectionsItemStore.single_collection_item) is_loading.value = false
   item.value = CollectionsItemStore.single_collection_item
})

watchEffect(() => {
    CollectionsItemStore.load_single_collection_item(parseInt(props.id.toString()))
    item_id.value = props.id
})

</script>

<template>

    <CollectionsItemRecord
        v-if="item"
        :item="item"
    />

</template>

<style scoped>


</style>