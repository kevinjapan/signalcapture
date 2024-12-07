<script lang="ts" setup>
import { useAppHelpStore } from '@/stores/AppHelpStore'


// Options

const AppHelpStore = useAppHelpStore()

const toggle_help = async() => {
   AppHelpStore.is_open ? AppHelpStore.close() : AppHelpStore.open()
}
</script>


<template>
   <ul class="options_bar mt_4 no_user_select">
      <li @click="toggle_help" :class="{bg_selected: AppHelpStore.is_open}">Help</li>
      <li class="v_center"><img src="@/assets/icons/ellipsis .svg" class="pt_.15"/></li>
   </ul>
</template>

<style scoped>
.options_bar {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-pack:flex-end;
   -ms-flex-pack:flex-end;
   justify-content:flex-end;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
   gap:1rem;
   /* margin-bottom:-.5rem; */
   padding:0;
   padding-right:1rem;
   padding-top:.25rem;
   height:26px;
}
li, li > * {
   cursor:pointer;
}
</style>