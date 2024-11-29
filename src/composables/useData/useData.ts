import useFetch from '../useFetch/useFetch'
import reqInit from '../../utilities/requestInit/RequestInit'
import get_end_point from '../useEndPoints/useEndPoints'
import { query_params_str, is_empty_obj } from '../../utilities/utilities/utilities'


// useData composable

// we want ability to change between static (no-server, data in files) and server-api served site
// our application will call useData and herein we will map to correct end-point.
// by using this middleman, we only have a single point of change to achieve this (eg components don't care what the url is)
// future : 
// we want to seamlessly interchange btwn static files and server-api served data sources.
// since we want to build server-api served dev sites but demo as static
// - in dev: const { data, error } = await useFetch(`${app_store.app_api}/songs?order_by=${order_by.value}&asc=${asc.value}&page=${page.value}`,reqInit())
// - in static: const { data, error } = await useFetch(`./songs_list.json`,reqInit())


// useData
// @url_params  : array of url params (ids/slugs) to include in url path
// @query_params: object containing key/value pairs to build query string
// @body        : pass js object or json string


export default function useData<T>(endPoint: string, url_params: string[], query_params: QueryParams, body?: T | null) : UseDataReturn<T> {

   const { request_method, route_url, route_url_params } = get_end_point(endPoint, url_params, query_params) as EndPoint
 

   // build url for useFetch
   const query_string = query_params_str(query_params)
   const built_url = `${route_url}${route_url_params ? route_url_params : ''}${query_string ? '?' : ''}${query_string ? query_string : ''}`

   // fetch data
   const { loading, payload, error, updateUrl } = useFetch<T>(built_url,  reqInit(request_method,'',body))

   // access rcvd func
   let update_the_url = updateUrl

   // we intervene on updateUrl to resolve the end_point
   const updateDataUrl = (endPoint: string, url_params: string[], query_params: QueryParams) => {      
      let query_string2 = query_params_str(query_params)
      const { route_url, route_url_params } = get_end_point(endPoint, url_params, query_params) as EndPoint
      const built_url = `${route_url}${route_url_params ? route_url_params : ''}${!is_empty_obj(query_string2) ? '?' : ''}${!is_empty_obj(query_string) ? query_string : ''}`
      update_the_url(built_url)
   }

   // const body_stringified = body && typeof body === 'object' ? body = JSON.stringify(body) : body
   // let query_string3 = {}
   // if(!is_empty_obj(query_params)) {
   //    query_string3 = Object.keys(query_params).length > 0 ? new URLSearchParams({...query_params}) : {}
   // }

   // console.log('loading in useData',loading)


   // return UseDataReturn obj
   return { loading, payload, error, updateDataUrl }
}