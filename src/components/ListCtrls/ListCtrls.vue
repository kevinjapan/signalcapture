<script setup lang="ts">
import ViewToggle from './ViewToggle/ViewToggle.vue'

const props = defineProps<{
   card_view: boolean
}>()


const emit = defineEmits([
   'toggle-view'
])

</script>


<template>

   <section class="list_ctrls">

      <!-- PaginationNav slot -->
      <slot></slot>

      <ViewToggle 
         :card_view="props.card_view"
         @toggle-view="$emit('toggle-view')" />

   </section>

</template>


<style scoped>
.list_ctrls {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-pack:justify;
   -ms-flex-pack:justify;
   justify-content:space-between;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
   margin:0;
   margin-top:2rem;
   padding:0;
   background:white;
}
</style>

