<script setup lang="ts">

// we use Component v-model to implement two-way binding
const search_term = defineModel({ type: String, required: true })

// using defineEmits macro makes it function much more easily in the template w/ $emit
// otherwise we have a lot of probs getting this working w/ converting event name's case btwn emit and @.
const emit = defineEmits(
   ['submit-search-term']
)

</script>

<template>
   <form class="flex " @submit.prevent>
      <label for="title">Search</label>
      <input id="title" name="title" v-model="search_term" placeholder="enter your search term here"/>      
      <div class="btn_row">
         <button v-if="search_term?.length > 2" @click="$emit('submit-search-term')">Search</button>
         <button v-else disabled>Search</button>
      </div>      
   </form>
</template>


<style scoped>
form {
   -webkit-box-pack:center;
   -ms-flex-pack:center;
   justify-content:center;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
   gap:1rem;
   padding:0;
}

input {
   font-weight:100;
   color:hsl(0, 0%, 40%);
}
</style>


