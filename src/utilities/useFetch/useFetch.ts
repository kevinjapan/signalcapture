import { ref } from 'vue'


export default function useFetch<T>(
  url: string, 
  initialRequestOptions: RequestInit,
) : UseFetchReturn<T> {

  const payload = ref<Payload<T> | null>(null) 
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false) 
  const { signal, abort } = new AbortController()

  console.log('use url',url)

  const baseUrl = '/data/collection-items.json'

  const headers = {
    "Content-Type":"application/json",
    Accept: "application/json",
    Authorisation:"Bearer dasdfdsafdsfsdfdfdereqwr"
  }

  if(initialRequestOptions.headers) {
    initialRequestOptions.headers = {...headers,...initialRequestOptions.headers}
  }

  const fetchData = async() => {
    loading.value = true
    console.log('fetchData')
    try {
      const res = await fetch(baseUrl,{signal,...initialRequestOptions})
      if(!res.ok) {
        error.value = "Could not fetch"
      }
      payload.value = <Payload<T>> await res.json()
    }
    catch(e) {
      console.log('error happened')
         // in TS error type is 'unknown' - we know it will be an Error object
         const err_obj = e as Error
         if(err_obj.name === "AbortError") {
            error.value = null
            // payload.value = null
         }
         else {
            error.value = err_obj.message
         }
    }
    loading.value = false
  }


  return {
    payload,
    error,
    loading,
    fetchData,
    abort
  }
}