<script setup lang="ts">

const emit = defineEmits([
   'toggle-view'
])

</script>


<template>

   <section class="list_ctrls">

      <!-- PaginationNav slot -->
      <slot></slot>

      <div class="mt_2">
         <button @click="$emit('toggle-view')">card/list</button>
      </div>

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
   align-items:center
}
</style>

