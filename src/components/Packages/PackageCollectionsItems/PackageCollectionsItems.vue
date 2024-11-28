<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useCollectionsItemsListStore } from '@/stores/CollectionsItemsListStore'
import CollectionsItemTeaserCard from '@/components/CollectionsItems/CollectionsItemTeaserCard/CollectionsItemTeaserCard.vue'

const props = defineProps<{
    collection_items:number[]
}>()


const CollectionsItemsListStore = useCollectionsItemsListStore()
CollectionsItemsListStore.load_collection_items()

const list = ref<CollectionsItem[] | null>(null)

onMounted(() => {
    list.value = <CollectionsItem[]>CollectionsItemsListStore.get_collection_items_by_id(props.collection_items.flat())
})

watchEffect(() => {
    list.value = <CollectionsItem[]>CollectionsItemsListStore.get_collection_items_by_id(props.collection_items.flat())
})
</script>

<template>
    <section v-if="list" class="grid grid_cards_layout" style="margin-top:1rem;">
        <CollectionsItemTeaserCard v-for="item in list" :key="item?.id"  :item="item as unknown as CollectionsItem" />
    </section>
</template>

<style scoped>
.grid_cards_layout > * {
    margin:0;
}
</style>