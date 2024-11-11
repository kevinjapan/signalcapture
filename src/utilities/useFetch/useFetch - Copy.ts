import { ref, watchEffect } from 'vue'
// import useStatusCode from '../useStatusCode/useStatusCode'
// import { is_empty_obj } from '../utilities/utilities'



// useFetch

export default async function useFetch<T>(
   initialUrl: string,
   initialRequestOptions: RequestInit,
   // payload:T|null : future add rcvd payload for CrUd ops
   initialOptions?:UseFetchOptions
): Promise<UseFetchReturn<T>> {

   const loading = ref<boolean>(false)
   const url = ref<string>(initialUrl)
   const payload = ref<Payload<T | null> | null>(null)
   const error = ref<string | null>(null)
   const requestOptions = ref(initialRequestOptions)
   const options = ref(initialOptions || {immediate:true})
   
   const abortController = ref(new AbortController())

   const load = async() => {
      
      abortController.value.abort()
      abortController.value = new AbortController()
      payload.value = null
      if(!url.value || url.value === '') {
         error.value = 'Empty URL'
         return
      }
      else {
         error.value = null
      }
      loading.value = true

      try {
         const reqInit = (requestOptions || {})
         reqInit.value.signal = abortController.value.signal
         const currentAbortController = abortController.value

         const response = await fetch(url.value,reqInit.value)
         if(!response.ok) {
            throw Error(response.statusText)
         }
         console.log('got response',response)
         const json = await response.json()
         if(currentAbortController.signal.aborted) return
         payload.value = json
      }
      catch(e) {
         // in TS error type is 'unknown' - we know it will be an Error object
         const err_obj = e as Error
         if(err_obj.name === "AbortError") {
            error.value = null     
            payload.value = null
         }
         else {
            error.value = err_obj.message
         }
      }      
      loading.value = false
   }

   
const updateUrl = (rcvd_url: string) => {url.value = rcvd_url}
const updateRequestOptions = (rvd_req_options: RequestInit) => {
   requestOptions.value = rvd_req_options
}
const updateOptions = (rcvd_options: UseFetchOptions) => {
   options.value = rcvd_options
}

   watchEffect(async() => {
      if(options.value.immediate) {
         await load()
      }
      // to do : do we have unmount equivalent to this from react version in useEffect() ?
      // abort request on component unmounted
      // return () => {
      //    abortController.current.abort()
      // }
   })
   
   return {
      url:url.value,
      loading:loading.value ?? false,
      error:error.value,
      payload:payload.value as Payload<T>,
      // load,
      updateUrl,
      updateOptions,
      updateRequestOptions
   }
}

