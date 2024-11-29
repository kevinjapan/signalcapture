<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useCollectionsItemsListStore } from '@/stores/CollectionsItemsListStore'
import CollectionsItemRecord from '@/components/CollectionsItems/CollectionsItemRecord/CollectionsItemRecord.vue';



const props = defineProps<{
    item: Package
}>()

const CollectionsItemsListStore = useCollectionsItemsListStore()
CollectionsItemsListStore.load_collection_items()

const list = ref<CollectionsItem[] | null>(null)

onMounted(() => {
    list.value = <CollectionsItem[]>CollectionsItemsListStore.get_collection_items_by_id(props.item.collection_items.flat())
})

watchEffect(() => {
    list.value = <CollectionsItem[]>CollectionsItemsListStore.get_collection_items_by_id(props.item.collection_items.flat())
})
</script>


<template>
    <section v-if="list" class="flex flex_column " style="margin-top:5rem;">
        <CollectionsItemRecord v-for="item in list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
    </section>
</template>

<style scoped>
.grid_cards_layout > * {
    margin:0;
}
</style>