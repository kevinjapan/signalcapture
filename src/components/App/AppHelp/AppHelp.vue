<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppHelpStore } from '@/stores/AppHelpStore'



// AppHelp

const router = useRouter()
const route = useRoute()
const AppHelpStore = useAppHelpStore()

//
const curr_help_topic = ref<HelpTopic | null>(null)

watchEffect(() => {
   curr_help_topic.value = AppHelpStore.get_topic(AppHelpStore.curr_topic)
})

const close = () => {
   AppHelpStore.close()
}

const select_topic = (topic: string) => {
   AppHelpStore.set_curr_topic(topic)
   curr_help_topic.value = AppHelpStore.get_topic(topic)
}

// select topic from url
watchEffect(async() => {
   if(AppHelpStore.is_open) {
      await router.isReady()
      AppHelpStore.set_curr_topic(route.fullPath.slice(1))
   }
})

const test = (topic: string) => {
   return curr_help_topic?.value?.title.toUpperCase() === topic.toUpperCase()
}
</script>


<template>

   <section class="app_help " :class="{app_help_bg :AppHelpStore.is_open}">

      <section class="no_user_select">
         <ul>
            <li v-for="topic in AppHelpStore.topics_list" 
               @click="select_topic(topic)"
               :class="{bold: test(topic)}"
            >{{ topic }}</li>
         </ul>
      </section>

      <section>
         <h2>{{ curr_help_topic?.title }}</h2>
         <h3>{{ curr_help_topic?.tagline }}</h3>
         <section class="app_help_content">
            <section v-for="section in curr_help_topic?.sections">
               {{ section.title }}
               <p v-for="line in section.lines">{{ line }}</p>
            </section>
         </section>
         <button @click="close">X</button>
      </section>

   </section>

</template>

<style scoped>


.app_help {
   position:fixed;
   top:var(--app_help_top);
   left:0;
   right:0;
   z-index:var(--app_status_z-index);
   width:fit-content;
   max-width:80%;
   height:70vh;
   margin-left:auto;
   margin-right:auto;
   padding:1rem;
   background:white;
   border:solid 1px black;
   border-radius:.5rem;
   text-align:left;

   display:grid;
   grid-template-columns:1fr 5fr;
   gap:.5rem;

   /* transitions */
   -webkit-transform: translateY(-400%);
   -ms-transform: translateY(-400%);
   transform: translateY(-400%);
   opacity:0;

   -webkit-transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}
.app_help_content {
   height:60%;
   overflow-y:scroll;
}

.app_help_bg {

   /* transitions */
   -webkit-transform: translateY(0);
   -ms-transform: translateY(0);
   transform: translateY(0);
   opacity:1;

   -webkit-transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}

button {
   width:fit-content;
   padding: .5rem 1rem;
   align-self:flex-end;
}

h1, h2 {
   margin:0;
   padding:0;
}
ul {
   margin:0;
   padding:0;
}
li {
   cursor: pointer;
}

</style>
