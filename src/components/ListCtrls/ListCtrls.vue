<script setup lang="ts">
import ViewToggle from './ViewToggle/ViewToggle.vue'

const props = defineProps<{
   list_view_type: ListViewType
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
         :list_view_type="props.list_view_type"
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
   margin-top:1rem;
   margin-bottom:1rem;
   padding:0;
   background:white;
}
</style>

