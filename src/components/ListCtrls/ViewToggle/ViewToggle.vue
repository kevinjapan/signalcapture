<script setup lang="ts">


const props = defineProps<{
   card_view: boolean
}>()

const emit = defineEmits([
   'toggle-view'
])



</script>

<template>
    <div>
        <button @click="$emit('toggle-view')">
            <img v-if="props.card_view"
                src="../../../assets/imgs/file.svg" />
            <img v-else="!props.card_view"
                src="../../../assets/imgs/list.svg" />
        </button>
    </div>
</template>

<style scoped>
img {
    cursor:pointer;
}
</style>