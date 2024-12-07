import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'


// AppHelpStore

// future : 
// move hard-coded dataset to json files
// resolve from sub-pages for each topic..  eg /packages/details -> /packages -> packages

export const useAppHelpStore = defineStore('app_help_store', () => {

   const is_open = ref<boolean>(false)

   const topics_list = ref<string[]>(
      ['intro','collections','packages','search','tags','browse']
   )

   const curr_topic = ref<string>('')

   const open = () => {
      is_open.value = true
   }
   const close = () => {
      is_open.value = false
   }

   const set_curr_topic = (topic: string) => {
      curr_topic.value = topic
   }

   const clear = () => {
      curr_topic.value = ''
      is_open.value = false
   }

   // stub for demo
   const get_topic = (topic: string): HelpTopic => {

      switch(topic) {
         case 'packages':
            return {
               "id":1,
               "title":"Packages",
               "tagline":"a tagline",
               "sections":[
                  {
                     "title":'Packages Section One',
                     "lines":[
                        "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                        "Accusantium aperiam dignissimos modi suscipit expedita odio quaerat cumque, excepturi sit consequatur incidunt ad rerum? Quis fugit corrupti perferendis eaque totam unde hic illum amet illo cupiditate veniam id harum culpa soluta labore reprehenderit, doloremque fuga sint officiis odio nihil? Perferendis dolorum velit ullam. Excepturi in adipisci labore eligendi quibusdam quia, sapiente, laudantium ea ratione nam ullam iste veniam asperiores?",
                        "Beatae quis minus accusamus ab molestiae at ex, numquam modi quas, qui praesentium quos ducimus recusandae hic, vel consectetur iure. Nostrum natus maxime quis aspernatur alias minima temporibus aliquid ratione nulla. Quisquam dicta voluptas impedit perferendis asperiores cupiditate vel optio vero placeat ducimus? Eligendi libero totam nihil, nostrum quis, inventore quas tenetur autem error animi aliquid, iste iusto? "
                     ]
                  }
               ]
            }
            break
            case 'search':
               return {
                  "id":2,
                  "title":"Search",
                  "tagline":"a tagline",
                  "sections":[
                     {
                        "title":'Search Section One',
                        "lines":[
                           "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                           "Accusantium aperiam dignissimos modi suscipit expedita odio quaerat cumque, excepturi sit consequatur incidunt ad rerum? Quis fugit corrupti perferendis eaque totam unde hic illum amet illo cupiditate veniam id harum culpa soluta labore reprehenderit, doloremque fuga sint officiis odio nihil? Perferendis dolorum velit ullam. Excepturi in adipisci labore eligendi quibusdam quia, sapiente, laudantium ea ratione nam ullam iste veniam asperiores?",
                           "Beatae quis minus accusamus ab molestiae at ex, numquam modi quas, qui praesentium quos ducimus recusandae hic, vel consectetur iure. Nostrum natus maxime quis aspernatur alias minima temporibus aliquid ratione nulla. Quisquam dicta voluptas impedit perferendis asperiores cupiditate vel optio vero placeat ducimus? Eligendi libero totam nihil, nostrum quis, inventore quas tenetur autem error animi aliquid, iste iusto? "
                        ]
                     }
                  ]
               }
               break
            case 'collections':
                  return {
                     "id":2,
                     "title":"Collections",
                     "tagline":"a tagline",
                     "sections":[
                        {
                           "title":'Collections Section One',
                           "lines":[
                              "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                              "Accusantium aperiam dignissimos modi suscipit expedita odio quaerat cumque, excepturi sit consequatur incidunt ad rerum? Quis fugit corrupti perferendis eaque totam unde hic illum amet illo cupiditate veniam id harum culpa soluta labore reprehenderit, doloremque fuga sint officiis odio nihil? Perferendis dolorum velit ullam. Excepturi in adipisci labore eligendi quibusdam quia, sapiente, laudantium ea ratione nam ullam iste veniam asperiores?",
                              "Beatae quis minus accusamus ab molestiae at ex, numquam modi quas, qui praesentium quos ducimus recusandae hic, vel consectetur iure. Nostrum natus maxime quis aspernatur alias minima temporibus aliquid ratione nulla. Quisquam dicta voluptas impedit perferendis asperiores cupiditate vel optio vero placeat ducimus? Eligendi libero totam nihil, nostrum quis, inventore quas tenetur autem error animi aliquid, iste iusto? "
                           ]
                        }
                     ]
                  }
                  break
               
            case 'browse':
               return {
                  "id":3,"title":"Browse","tagline":"here",
                  "sections":[
                     {  "title":'Browse Section One',
                        "lines":[
                           "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                        ]
                     }
                  ]
               }
               break
            case 'tags':
                  return {
                     "id":3,"title":"Tags","tagline":"here",
                     "sections":[
                        {  "title":'Tags Section One',
                           "lines":[
                              "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                           ]
                        }
                     ]
                  }
                  break
            case 'intro':
            default:
               // intro 
               return {
                  "id":3,"title":"Intro","tagline":"here",
                  "sections":[
                     {  "title":'Intro Section One',
                        "lines":[
                           "Eaque amet ut exercitationem at quibusdam laboriosam ex doloremque, delectus suscipit recusandae quos est, voluptatum velit consequatur! Quibusdam veniam laborum sit repellat iste similique eos, iure reiciendis deserunt. Perferendis aliquid animi iusto minima at culpa, sequi dolore.",
                        ]
                     }
                  ]
               }
               
      }
   }

   return {

      is_open,
      topics_list,
      curr_topic,
   
      open,
      close,
      get_topic,
      set_curr_topic,
      clear

   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAppHelpStore, import.meta.hot))
}