<script setup lang="ts">
import { onMounted, ref } from 'vue'


const props = defineProps<{
   list_view_type: ListViewType
}>()


const emit = defineEmits([
   'toggle-view'
])

const list_view_type = ref<ListViewType>(props.list_view_type)


onMounted(() => {
    // to do : set initial index of list_view_types - then we can rotate around them..
})

const three_way_toggle = () => {

    emit('toggle-view',list_view_type.value)

}



// to do : add 3rd option : grid-sm.svg

</script>

<template>
    <section class="m_.5">
        <button @click="three_way_toggle">
            <img v-if="props.list_view_type === 'card'"
                src="../../../assets/icons/grid.svg" />
            <img v-if="props.list_view_type === 'teaser_card'"
                src="../../../assets/icons/grid-sm.svg" />
            <img v-if="props.list_view_type === 'list'"
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