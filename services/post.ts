import { postCollection } from './db'
import { PostDocument } from '../types/post'
import type { PostDocumentMetadata } from '../types/post'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): Promise<PostDocument | null> {
   return postCollection().findOne<PostDocument>({ slug, public: true })
}

/**
 * Returns list of recent post metadata
 * @param limit - Number of posts
 */
export function getRecentPosts(limit: number = 6) {
   return postCollection()
      .find<PostDocumentMetadata>(
         {
            public: true,
         },
         {
            projection: {
               body: false,
            },
            limit,
         }
      )
      .sort({ createdAt: -1 })
      .toArray()
}
