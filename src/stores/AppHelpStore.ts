import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'


// AppHelpStore

export const useAppHelpStore = defineStore('app_help_store', () => {

   const is_open = ref<boolean>(false)

   const open = () => {
      is_open.value = true
   }
   const close = () => {
      is_open.value = false
   }

   // stub for demo :
   // to do : build help functionality
   //         access dataset help.json
   const get_help_topic = (topic: string): HelpTopic | null => {

      switch(topic) {
         case 'packages':
            return {
               "id":1,
               "title":"Packages",
               "tagline":"a tagline",
               "sections":[
                  {
                     "title":'Packages',
                     "lines":[
                        "this is line one",
                        "this is second",
                        "and a third"
                     ]
                  }
               ]
            }
            break
      }
      return null
   }

   return {

      is_open,
   
      open,
      close,
      get_help_topic

   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAppHelpStore, import.meta.hot))
}