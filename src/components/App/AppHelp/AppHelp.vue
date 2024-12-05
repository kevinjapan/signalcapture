<script lang="ts" setup>
import { watchEffect, ref } from 'vue'
import { useAppHelpStore } from '@/stores/AppHelpStore'


const AppHelpStore = useAppHelpStore()

const curr_help_topic = ref<HelpTopic | null>(null)

watchEffect(() => {
   curr_help_topic.value = AppHelpStore.get_help_topic('packages')
})
const close = () => {
   AppHelpStore.close()
}

</script>



<template>

   <section class="app_help" :class="{app_help_bg :AppHelpStore.is_open}" @click="close">
      <div>{{ curr_help_topic }}
         </div>

      <button @click="close">X</button>
   </section>

</template>

<style scoped>


.app_help {
   position:fixed;
   top:var(--status-msg-top);
   left:0;
   right:0;
   z-index:var(--app_status_z-index);
   width:fit-content;
   margin-left:auto;
   margin-right:auto;
   padding:1rem;
   background:lightgrey;
   border:solid 1px lightgrey;
   border-radius:.5rem;
   text-align:left;

   display:flex;
   flex-direction:column;
   gap:2rem;

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

</style>
