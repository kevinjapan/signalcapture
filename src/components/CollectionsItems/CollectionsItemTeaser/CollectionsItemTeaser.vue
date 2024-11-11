<script setup lang="ts">


// Component Interface - props and emits
const props = defineProps<{
   item: CollectionsItem
}>()

// const emit = defineEmits<{
//   change: [id: number]
//   update: [value: string]
// }>()

</script>

<template>

    DA DA {{  props.item }}

</template>