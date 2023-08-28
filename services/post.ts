import { postCollection } from './db'
import { PostDocument } from '../types/post'
import type { PostDocumentMetadata } from '../types/post'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): Promise<PostDocument | null> {
   return postCollection().findOne<PostDocument>({ slug, public: true, deleted: false })
}

/**
 * Returns list of recent post metadata
 * @param limit - Number of posts
 * @param skip - Skip number of posts
 */
export function getRecentPosts(limit: number = 6, skip: number = 0) {
   return postCollection()
      .find<PostDocumentMetadata>(
         {
            public: true,
            deleted: false,
         },
         {
            projection: {
               body: false,
            },
            limit,
            skip,
         }
      )
      .sort({ createdAt: -1 })
      .toArray()
}

/**
 * Returns list of recent post metadata by given `topic`
 * @param topic - Topic Id
 * @param limit - Number of posts
 */
export function getRecentPostsByTopic(
   topic: string,
   limit: number = 6,
   skip: number = 0
): Promise<PostDocumentMetadata[]> {
   return postCollection()
      .find<PostDocumentMetadata>(
         { public: true, deleted: false, topic },
         { projection: { body: false }, limit, skip }
      )
      .sort({ createdAt: -1 })
      .toArray()
}

/** Returns number of public posts */
export function getPostCount(): Promise<number> {
   return postCollection().countDocuments({ public: true, deleted: false })
}

/**
 * Returns number of public posts by given `topic`
 * @param topic - Topic Id
 */
export function getPostCountByTopic(topic: string): Promise<number> {
   return postCollection().countDocuments({ public: true, deleted: false, topic })
}
