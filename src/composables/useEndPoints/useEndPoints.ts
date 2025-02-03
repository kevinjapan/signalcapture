

// useEndPoints composable

// map end_points names to relative URLs
// app_store.app_api is our flag - if empty, we are in 'web api' mode, else we are in 'static site' mode
// url params : we assume order matches that expected by end-point and we always append url_params at end of url route
   
export default function useEndPoints(endPoint: string, url_params: Array<string>,query_params: QueryParams) {

   const is_static_site = true  // future : app context toggle for static / web api site

   console.log(query_params)
   let end_points

   if(is_static_site === true) {

      // static site endpoints

      end_points = {

         load_collection_items:{
            request_method:'GET',
            route_url:`/data/collection-items.json`,
            route_url_params:url_params?.join('/')
            // route:`/data/songs_list_${query_params.page}.json`,
            // route_url_params:url_params?.join('/')
         },
         get_single_tech:{
            request_method:'GET',
            route_url:`/data/tech/`,
            route_url_params:`${url_params?.join('/')}.json`
         },


         albums_list:{
            request_method:'GET',
            route_url:'/data/albums_list.json',
            route_url_params:url_params?.join('/')
         },
         load_album:{
            request_method:'GET',
            route_url:`/data/albums/${url_params[0]}.json`,
            route_url_params:''
         },
         // failsafe default if no match found - useFetch will report error on empty URL
         default:{
            request_method:'GET',
            route_url:``,
         }
      }

   }
   else {

      // web api endpoints

      end_points = {

         login:{
            request_method:'POST',
            route_url:'/login',
            route_url_params:url_params
         },


         songs_list:{
            request_method:'GET',
            route_url:'/songs',
            route_url_params:url_params
         },
         get_single_song:{
            request_method:'GET',
            route_url:'/songs/',
            route_url_params:url_params
         },
         create_song:{
            request_method:'POST',
            route_url:'/songs'
         },
         delete_song:{
            request_method:'DELETE',
            route:'/songs/',
            route_url_params:url_params
         },
         save_song:{
            request_method:'PUT',
            route_url:'/songs/',
            route_url_params:url_params
         },
         update_song:{
            request_method:'PUT',
            route_url:'/songs/',
            route_url_params:url_params
         },


         search_songs:{
            request_method:'GET',
            route_url:'/songs/search/',
            route_url_params:url_params
         },


         albums_list:{
            request_method:'GET',
            route_url:'/albums',
            route_url_params:url_params
         },
         load_album:{
            request_method:'GET',
            route_url:'/albums/',
            route_url_params:url_params
         },
         create_album:{
            request_method:'POST',
            route_url:'/albums',
            route_url_params:url_params
         },
         delete_album:{
            request_method:'DELETE',
            route_url:'/albums/',
            route_url_params:url_params
         },
         save_album:{
            request_method:'PUT',
            route_url:'/albums/',
            route_url_params:url_params
         },
         update_album:{
            request_method:'PUT',
            route_url:'/albums/',
            route_url_params:url_params
         },
         // failsafe default if no match found - useFetch will report error on empty URL
         default:{
            request_method:'GET',
            route_url:``,
         }
      }
   }
   // we need to handle if endPoint doesnt find match in the returned end_points object - we pass 'default'
   if(Object.prototype.hasOwnProperty.call(end_points, endPoint)) {
      return end_points[endPoint as keyof typeof end_points] as EndPoint
   }
   else {
      return end_points['default']
   }
}

