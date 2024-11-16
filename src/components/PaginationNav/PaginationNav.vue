<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { number_range } from '../../utilities/utilities/utilities'


// PaginationNav

// Component Interface - props and emits
const props = defineProps<{
   title: string,
   page: number,
   total_num_items: number,
   items_per_page: number
}>()

const emit = defineEmits([
   'step-to-page',
   'navigate-to-page'
])

const page_links = ref<number[]>([])
const num_pages = ref<number>(0)

watchEffect(() => {
   
   num_pages.value = Math.ceil(props.total_num_items / props.items_per_page)

   // const start_index = ((props.page - 1 ) * props.items_per_page) + 1
   // console.log(start_index, start_index + props.items_per_page, 1)
   // const page_links = number_range(start_index, start_index + props.items_per_page, 1)
   page_links.value = number_range(1,num_pages.value,1)
   console.log('page_links',page_links)

})

const step = (step: number) => {
   if(step > 0) {
      if(props.page + 1 === num_pages.value) return
   }
   else {
      if(props.page - 1 <= 0) return
   }
   emit('step-to-page',step)
}

const on_first_page = computed(() => {
   return props.page === 1
})
const on_last_page = computed(() => {
   // return props.page === computed_last_page.value
})

const items_of = computed(() => {
   // to do : edge cases
   return (props.page * props.items_per_page) - (props.items_per_page - 1) + ' - ' + props.page * props.items_per_page
})
</script>

<template>
   <section class="nav_bar mt_2"> 
      <div>Page 
         <input :value="page" class="curr_page_input"/></div>
         <div>of {{ num_pages }}</div>
      <div>Items {{ items_of }} of {{ total_num_items }}</div>
      <div class="flex ">
         <button v-on:click="step(-1)" class="page_nav_btn start_btn" :class="{greyed_out: on_first_page}"><</button>
         <button v-on:click="step(1)" class="page_nav_btn end_btn" :class="{greyed_out: on_last_page}">></button>
      </div>
   </section>
</template>


<style scoped>
section.nav_bar {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   align-items:center;
   flex-wrap:wrap;
   gap:1rem;
   width:fit-content;
   /* margin-left:auto;
   margin-right:auto; */
   padding:.35rem 1rem;
   list-style:none;
   background:white;
   border-radius:.15rem;
   font-size:.9rem;
   color:hsl(0, 0%, 30%);
}
.nav_bar li {
   width:fit-content;
   height:fit-content;
   margin:0;
   padding:.25rem;
   padding-top:.25rem;
   padding-bottom:.25rem;
   white-space:nowrap;
   cursor:pointer;
}
.nav_bar li:hover {
   background:hsl(0, 0%, 96%);
}
.nav_bar li:not(.page_link):hover {
   background:none;
}
.selected_link {
   font-weight:700;
   background:hsl(0, 0%, 96%);
   border-radius:.25rem;
}
input.curr_page_input {
   width:3rem;
   text-align:center;padding:0;
   color:hsl(0, 0%, 40%);
   font-size:.8rem;
   font-weight:100;
   padding:.15rem;
   border-radius:0;
   border:solid 1px hsl(0, 0%, 85%);
}
.page_nav_btn {
   cursor:pointer;
   font-style:italic;
   border:solid 1px hsl(0, 0%, 90%);
   padding:.1rem;
   padding-top:.2rem;
   padding-left:.4rem;
   padding-right:.4rem;
}
.page_nav_btn.start_btn {
   border-radius:.15rem 0 0 .15rem;
}
.page_nav_btn.end_btn {
   border-radius:0 .15rem .15rem 0;
}
.page_nav_btn:hover {
   border:solid 1px hsl(0, 0%, 75%);
}
</style>
