<script setup lang="ts">
import { ref } from 'vue'

const today = new Date()
const copyright_date = ref(today.getFullYear())

</script>


<template>

   <section class="v_end">
      Copyright &copy; Kevin Hastie 2023 - {{ copyright_date }}
   </section>

</template>

<style scoped>

section {
   display:flex;
   justify-content:center;
   padding:2rem;
   background:hsl(0, 0%, 25%);
   color:hsl(0, 0%, 70%);
   font-size:.95rem;
   min-height:200px;
   max-height:fit-content;
}

</style>