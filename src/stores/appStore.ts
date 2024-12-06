import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useRoute } from 'vue-router'



// AppStore

export const useAppStore = defineStore('app_store', () => {

   // site title
   // const site_title = 'Signal Capture Online Demo'

   // toggle web_api/static
   const is_static = false
   
   // we use presence/absence as web_api/static toggle flag
   const app_api = is_static ? ref('http://songs-api-laravel/api') : ref('')

   // we track view to highlight nav links on page refreshes
   const curr_view_route = ref<string>('/')

   // we use presence/absence as logged-in flag
   const bearer_token = ref('')
   const username = ref('')

   // we have a single AppStatus notify_msg_list 
   // array of strings so we can cleanly display separate multiple error msgs
   // to tell TypeScript we intend to store Strings in this array, we pass a type parameter to the ref function
   const notify_msg_list = ref<String[]>([])

   // list_view_types
   const list_view_types = ['card','teaser_card','list']
   const list_view_type = ref<ListViewType>('card')

   // the Collections root folder
   // future : have sub-roots / sub-domains - generally sub-folders but can be separate locations (up to say seven?)
   const root_folder = ref('/collection')

   const items_per_page = ref<number>(20)

   // getters
   const get_api = computed(() => app_api.value)

   // future : persist login / bearer_token for limited time
   // - do post-static separation - we don't use login in static deployment.
   //   our server is a stateless rest model, so we need to save client-side
   //   and attempt to re-hydrate session...
   //   server-side, we need to verify correctly expiring tokens


   // set_notify_msg_list
   // accepts string or array of strings
   const set_notify_msg_list = (msg: string) => {
      let arr: Array<string> = Array.isArray(msg) ? [...msg] : [msg]
      notify_msg_list.value = arr
   }

   // actions
   function set_api(new_api: string) {
      app_api.value = new_api
   }

   function switch_list_view_type() {
      const curr_index = list_view_types.indexOf(list_view_type.value)
      const new_index = curr_index < list_view_types.length - 1   ?  curr_index + 1  :  0
      list_view_type.value = <ListViewType>list_view_types[new_index]
   }

   const is_logged_in = () => {
      return bearer_token.value !== '' ? true : false
   }

   return {

      app_api, 
      root_folder,
      items_per_page,
      curr_view_route,
      bearer_token,
      username,
      notify_msg_list,
      get_api,
      list_view_type,

      set_api,
      set_notify_msg_list,
      is_logged_in,
      switch_list_view_type
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}