import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useRoute } from 'vue-router'



// AppStore

export const useAppStore = defineStore('app_store', () => {

   // Site Title
   // const site_title = 'Signal Capture Online Demo'

   // Toggle web_api/static
   const is_static = false
   
   // we use presence/absence as web_api/static toggle flag : to do : depr?
   const app_api = is_static ? ref('http://songs-api-laravel/api') : ref('')

   // we track view to highlight nav links on page refreshes
   const curr_view_route = ref<string>('/')

   // Authentication
   // we use presence/absence as logged-in flag
   const bearer_token = ref('')
   const username = ref('')

   // AppStatus
   // we have a single AppStatus notify_msg_list 
   // array of strings so we can cleanly display separate multiple error msgs
   // to tell TypeScript we intend to store Strings in this array, we pass a type parameter to the ref function
   const notify_msg_list = ref<String[]>([])


   // The Collections Root Folder
   // our collection data files are image files mapped to in our json data files
   // future : have sub-roots / sub-domains - generally sub-folders but can be separate locations (up to say seven?)
   // to do : add configuration of some kind - even if only a separate json file for static site.

      // local server
      // const root_folder = ref<string>('/collection')

      // WordPress server
      const root_folder = ref<string>('https://capturedimages0.wordpress.com/wp-content/uploads') 


   // Image Sizes
   // specify image sizes - service offered by WordPress server 
   // manage img size eg for list teaser cards performance
   // we should configure these to match our image sizes in WordPress settings
   const use_img_widths = ref<boolean>(true)
   const sm_img_width = ref<number>(300)
   const md_img_width = ref<number>(1024)
   const lg_img_width = ref<number>(2049)

   // List View Settings
   const list_view_types = ['card','teaser_card','list']
   const list_view_type = ref<ListViewType>('card')
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
      use_img_widths,
      sm_img_width,
      md_img_width,
      lg_img_width,
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