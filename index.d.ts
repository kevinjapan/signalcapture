declare module '*.vue' {
   import Vue from 'vue'
   export default Vue
}

declare module 'AppStore'
declare module 'useEndPoints'
declare module 'PackagesStore'

// ----------------------------------------------------
// Fetch and Data interfaces

// EndPoint
interface EndPoint {
   request_method:string,
   route_url:string, 
   route_url_params?:string
}

// QueryParams
// URLSearchParams requires all values as strings
interface QueryParams {
   order_by?:string,
   asc?:string,
   page?:string
}

type QueryOutcome = 'success' | 'fail'

type UseFetchOptions = {
   immediate: boolean
}


// Payload
// server/file responses carry a payload which is passed by our useFetch inteface
interface Payload<T> {
   server_response:string,
   outcome:string,
   data: T | null
}

interface Ref<T> {
   value: T
 }


// UseFetchReturn
// useFetch is app-agnostic - returns meta info, api methods and json payload from server/file
// future : review Ref<..> usage below - taken from example in VueUse and from intellsense hints - but little docs about it
interface UseFetchReturn<T> {
   url?:string | null,
   loading:Ref<boolean>,
   payload:Ref<Payload<T> | { server_response: string; outcome: string; data: UnwrapRef<T> | null; } | null>,
   error:Ref<string | null>,
   // load: () => Promise<void>,
   fetchData: () => Promise<void>
   abort:() => void,
   updateUrl?: (string) => void,
   updateRequestOptions?: (RequestInit) => void,
   updateOptions?: (UseFetchOptions) => void
}

// UseDataReturn
// useData wraps useFetch for in-app endpoint mapping
interface UseDataReturn<T> {
   loading:boolean,
   payload?:Payload<T | null> | null,
   error?:string | null,
   load?: () => Promise<void>,
   updateUrl?: (string) => void,
}



// ----------------------------------------------------
// Error interfaces

interface RouteError {
   data:string,
   error: {
      columnNumber:number,
      fileName:string,
      lineNumber:number,
      message:string,
      stack:string
   },
   internal:boolean,
   status:number,
   statusText:string
}




// ----------------------------------------------------
// CollectionItems

interface CollectionsItem {
   title:string
   slug?:string
   content_desc?:string
   file_name:string
   file_type:string
   folder_path:string
   keywords?:string
   imgDesc?:string
   item_ref?:string
   item_Date?:string
   item_Type?:string
   location?:string
   author_creator?:string
   people?:string
   source?:string
   donor?:string
   owner?:string
   copyright?:string
   tags?:string
   id:number
   created_at:string
   updated_at:string
   viewed_at:string
   deleted_at:string
}


interface PageLink {
   url:string
   label:string
   active:boolean
}


// FilesTree

interface FileTeaser {
   id:number,
   title:string,
   slug:string
}

interface FilesTree {
   teaser:FileTeaser,
   children:FilesTree[]
}



// Packages

interface Package {
   id:number
   title:string
   slug?:string
   content_desc?:string
   keywords?:string
   file_name:string
   file_type:string
   folder_path:string
   imgDesc?:string
   author_creator?:string
   owner?:string
   tags?:string
   created_at:string
   updated_at:string
   viewed_at?:string
   deleted_at?:string
}