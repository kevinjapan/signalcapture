<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/AppStore'
import { useAppHelpStore } from '@/stores/AppHelpStore'


// AppNav
// future : enhance sm/mobile

const router = useRouter()
const route = useRoute()
const AppStore = useAppStore()
const AppHelpStore = useAppHelpStore()

//
const display = ref(false)

// 
const local_curr_view_route = ref<string>('')
   
// resynch nav on 'back' btn - future : improve and remove event listener onUnmounted
window.onpopstate = async function() {
   await router.isReady()
   AppStore.curr_view_route = route.fullPath
}

// sync AppNav on refresh page
onMounted(async() => {
   await router.isReady()
   AppStore.curr_view_route = route.fullPath
})

watchEffect(() => {
   local_curr_view_route.value = AppStore.curr_view_route
})

// we push rather than RouterLink to allow close app_nav
const open_nav_link = (route: string) => {
   display.value = false
   AppHelpStore.clear()
   AppStore.curr_view_route = route
   router.push(route)
}

const clicked_bg = () => {
   display.value = false
}

// highlight nav item for domain and all sub-views
const is_curr_view_route = (route: string) => {
   // return route === '/' ? AppStore.curr_view_route === route : AppStore.curr_view_route.startsWith(route)
   return route === '/' ? local_curr_view_route.value === route : local_curr_view_route.value.startsWith(route)
}
</script>


<template>

   <div class="app_nav_hamburger">
      <button @click="display = display === true ? false : true"  :class="{opened : display === true}">
         <img src="../../../assets/icons/list.svg" alt="open nav menu"/>
      </button>
   </div>

   <nav class="app_nav" :class="{opened : display === true}" @click="clicked_bg">

      <div class="app_nav_links">

         <a @click.stop="open_nav_link('/')" 
            :class="{sel_view:is_curr_view_route('/')}">Home</a>

         <!-- <div v-if="AppStore.app_api !== ''"> -->
            <a @click.stop="open_nav_link('/collections')" 
               :class="{sel_view:is_curr_view_route('/collections')}">Collections</a>
         <!-- </div> -->
         <!-- <div v-else class="text_lightgrey">
            <a class="no_cursor_pointer">Files</a>
         </div> -->

         <a @click.stop="open_nav_link('/packages')" 
               :class="{sel_view:is_curr_view_route('/packages')}">Packages</a>

         <a @click.stop="open_nav_link('/search')" 
            :class="{sel_view:is_curr_view_route('/search')}">Search</a>
            
         <a @click.stop="open_nav_link('/tags')" 
            :class="{sel_view:is_curr_view_route('/tags')}">Tags</a>
         
         <!-- <div v-if="AppStore.app_api !== ''"> -->
            <a @click.stop="open_nav_link('/browse')" 
               :class="{sel_view:is_curr_view_route('/browse')}">Browse</a>
         <!-- </div> -->
         <!-- <div v-else class="text_lightgrey">
            <a class="no_cursor_pointer">Browse</a>
         </div> -->

         <!-- <div v-if="AppStore.app_api !== ''">
            <a v-if="!AppStore.bearer_token" @click.stop="open_nav_link('/login')" :class="{sel_view:is_curr_view_route('/login')}">Login</a>
            <a v-else @click.stop="open_nav_link('/account')" :class="{sel_view:is_curr_view_route('/account')}">{{ AppStore.username }}</a>
         </div> -->

      </div>
      
      <div class="app_nav_dimmer"></div>

   </nav>

</template>


<style scoped>
nav.app_nav {
   position:fixed;
   top:var(--app_nav_dropdown_top);
   right:0;
   z-index:var(--over_nav_layer);

   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   
   -webkit-box-orient:horizontal;
   -webkit-box-direction:normal;
   -ms-flex-direction:row;
   flex-direction:column;
   
   -webkit-box-pack:flex-start;
   -ms-flex-pack:flex-start;
   justify-content:flex-start;
   
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;

   gap:1rem;

   width:100%;
   height:120px;height:100vh;
   margin:0;
   padding:60px 0;
   overflow:hidden;

   font-size:1.1rem;
   background:white;
      
   user-select: none;

   /* 
   transitions
   we fade app_nav_dimmer first and delay transition on app_nav so background does not visibly slide w/ dropdown
   */
   -webkit-transform: translateY(-100%);
   -ms-transform: translateY(-100%);
   transform: translateY(-100%);
   opacity:0;
   -webkit-transition:opacity 2.35s ease-in-out .25s,-webkit-transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,-webkit-transform .5s ease-in-out .25s;
   -o-transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out,-webkit-transform .5s ease-in-out .25s;
}
nav.app_nav > div.app_nav_dimmer {
   content:'';

   position:absolute;
   top:0;
   left:0;
   z-index:-1;

   width:100%;
   height:100%;
   background:white;
   
   opacity:0;
   -webkit-transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
   -o-transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
}
nav.app_nav.opened {
   /* transitions */
   -webkit-transform: translateY(0);
   -ms-transform: translateY(0);
   transform: translateY(0);
   opacity:1;
   -webkit-transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;
   -o-transition:opacity .5s ease-in-out,transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,transform .5s ease-in-out,-webkit-transform .5s ease-in-out;
}
nav.app_nav.opened > div.app_nav_dimmer {
   opacity:.2;
   -webkit-transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
   -o-transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
}
.app_nav_links {   
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;

   -webkit-box-pack:flex-start;
   -ms-flex-pack:flex-start;
   justify-content:flex-start;

   /* -ms-flex-item-align:end; */
   /* align-self:flex-end; */

   width:fit-content;
   margin-right:.5rem;
   padding:1rem 2rem 1rem 2rem;
   /* background:white; */
   border-radius:0 0 .5rem .5rem;
}

.app_nav_links {
   font-size:2rem;
}
.app_nav_hamburger {

   position:fixed;
   top:0;
   right:0;
   z-index:var(--over_over_nav_layer);

   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:flex-end;
   -ms-flex-pack:flex-end;
   justify-content:flex-end;

   /* we use bar to cover scrolling content */
   width:100%;

   height:var(--app_nav_height);
   margin:0;
   padding:0;
   color:white;
   background:white;
}
.app_nav_hamburger button {
   background:hsl(0, 0%, 86%);
   border:none;
   outline:none;
   margin:0;
   padding:0;
   cursor:pointer;
}
button img {
   background: white !important;
}
/* grey-out opened dropdown ctrl */
.app_nav_hamburger button.opened {
   -webkit-filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
   filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
}
.app_nav_hamburger img {
   width:30px;
   height:30px;
   background:hsl(0, 0%, 86%);
}

@media (min-width: 768px) {   
   nav.app_nav {
      top:0;

      -webkit-box-orient:horizontal;
      -webkit-box-direction:normal;
      -ms-flex-direction:row;
      flex-direction:row;
      
      -webkit-box-pack:end;
      -ms-flex-pack:end;
      justify-content:flex-end;

      align-items:center;

      width:100%;
      height:60px;
      margin:0;
      padding:0;
      font-size:1.2rem;
      font-weight:300;

      /* nullify transitions */
      -webkit-transform: unset;
      -ms-transform: unset;
      transform: unset;
      transition:unset;
      opacity:1;
  
   }
   nav.app_nav > div.app_nav_dimmer {
      display:none;
   }
   nav.app_nav.opened {
      /* nullify transitions */
      -webkit-transform: unset;
      -ms-transform: unset;
      transform: unset;
      opacity:1;
   }
   nav.app_nav.opened > div.app_nav_dimmer {
      display:none;
   }   
   .app_nav_links {
      -webkit-box-orient:horizontal;
      -webkit-box-direction:normal;
      -ms-flex-direction:row;
      flex-direction:row;

      -webkit-box-pack:flex-end;
      -ms-flex-pack:flex-end;
      justify-content:flex-end;

      gap:.15rem;

      width:100%;
      padding:0 1rem 0 1rem;
      font-size:unset;
   }
   
   
   .app_nav_hamburger {
      display:none;
   }
}
a {
   width:fit-content;
   margin:0;
   padding:0 .5rem;
   color:inherit;
   font-weight:400;
   border-radius:.25rem;
   cursor:pointer;
}
a.sel_view {
   font-weight:700;
   background:hsl(0, 0%, 96%);
   border-radius:0;
}
a:not(.sel_view):hover {
   font-weight:400;
}
a:not(.no_cursor_pointer):not(.sel_view):hover {
   background:hsl(0, 0%, 98%);
}
</style>