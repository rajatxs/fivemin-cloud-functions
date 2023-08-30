import algoliasearch from 'algoliasearch'
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from '../config/env'

/** Algolia search instance */
function instance() {
   return algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
}

/** Algolia Post Index */
export function postIndex() {
   return instance().initIndex('posts')
}
