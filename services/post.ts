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

/**
 * Returns list of recent post metadata by given `topic`
 * @param topic - Topic Id
 * @param limit - Number of posts
 */
export function getRecentPostsByTopic(
   topic: string,
   limit: number = 6
): Promise<PostDocumentMetadata[]> {
   return postCollection()
      .find<PostDocumentMetadata>(
         { public: true, topic },
         { projection: { body: false }, limit }
      )
      .sort({ createdAt: -1 })
      .toArray()
}

/** Returns number of public posts */
export function getPostCount(): Promise<number> {
   return postCollection().countDocuments({ public: true })
}

/**
 * Returns number of public posts by given `topic`
 * @param topic - Topic Id
 */
export function getPostCountByTopic(topic: string): Promise<number> {
   return postCollection().countDocuments({ public: true, topic })
}
