//
// set headers for fetch requests
//
export default function reqInit<T>(method: string = "POST", bearer_token: string = "",body: T): RequestInit {

   // we convert 'body' into json (type is now string)
   if(typeof body === 'object') {
      body = <T>JSON.stringify(body)
   }

   if(body && body !== "" && body !== undefined) {
      return {
         method: method,
         headers: { 
               'Accept':'application/json',
               'Authorization': `Bearer ${bearer_token}`,
               'Content-Type': 'application/json',
         },
         credentials: 'include',
         mode: "cors",
         cache: "default",
         body: <string>body
      }
   }
   else {
      return {
         method: method,
         headers: { 
            'Authorization': `Bearer ${bearer_token}`,
            'Accept':'application/json',
         },
         mode: "cors",
         cache: "default"
      }
   }
}