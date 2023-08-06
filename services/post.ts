import { postCollection } from './db'
import { PostDocument } from '../types/post'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): Promise<PostDocument | null> {
   return postCollection().findOne<PostDocument>({ slug, public: true })
}
