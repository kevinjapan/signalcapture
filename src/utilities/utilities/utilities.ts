

export const scroll_to_elem = (id: string) => {
   let target = document.getElementById(id)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

// errors are typically passed as arrays of strings, only add if unique
export const add_if_unique_str = (arr: Array<string>,str: string) => {
   if(arr.find(elem => elem === str) === undefined) arr.push(str)
}

export const truncate = (str: string,len = 20,trailing:boolean = true) => {
   if(str) {
      if(str !== "" && str.length > len) {
         return trailing ? str.substring(0, len) + '..' : str.substring(0, len) 
      }
   }
   return str
}


export const is_empty_obj = (obj: object) => {
   return Object.keys(obj).length === 0
}

export const query_params_str = (query_params: QueryParams) => {
   let query_string = {}
   if(!is_empty_obj(query_params)) {
      query_string = Object.keys(query_params).length > 0 ? new URLSearchParams({...query_params}) : {}
   }
   return query_string
}

// sequenced number generator
export const number_range = (start: number, stop: number, step: number): number[] => {
   return Array.from(
      {length: Math.ceil((stop-start/step))},
      (_,index) => start + index * step
   )
}


// Search utilities

export const tokenize_search_term = (full_search_term: string) => {
   let tokens = []
   if(full_search_term.indexOf(' ') === -1) {
      tokens.push(full_search_term)
   }
   else {
      tokens = [full_search_term,...full_search_term.split(' ')]
   }
   return [...tokens.filter(token => token.length >= 3) ]
}

// remove common words from array of search tokens, returns array of permitted
export const remove_stopwords = (search_term_tokens: string[]) => {
   
   const search_excluded_words = [
      'also','and','are','been','but','for','from',
      'has','have','not','our',
      'than','that','the','their','them','then','there','these','this',
      'was','were','with',
   ]
   let tokens = null
   if(search_term_tokens.length > 0) {
      tokens = search_term_tokens.filter(token => {
         return !search_excluded_words.includes(token)
      })
   }
   else {
      tokens = search_term_tokens
   }
   return tokens      
} 