<script setup lang="ts">


const props = defineProps<{
   card_view: boolean
}>()

const emit = defineEmits([
   'toggle-view'
])



// to do : add 3rd option : grid-sm.svg

</script>

<template>
    <section class="m_.5">
        <button @click="$emit('toggle-view')">
            <img v-if="props.card_view"
                src="../../../assets/icons/grid.svg" />
            <img v-else="!props.card_view"
                src="../../../assets/icons/list-columns-reverse.svg" />
        </button>
    </section>
</template>

<style scoped>
section {
    padding:0;
}
button {
    display:flex;
    align-items:center;
    outline:none;
    border:none;
    background:none;
}
img {
    cursor:pointer;
}
</style>