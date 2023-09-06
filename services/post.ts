import { postsCollection, postsMetadataCollection } from './db'
import type { PostDocumentMetadata, PostDocument } from '../types/post'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(
   slug: string
): Promise<PostDocument | null> {
   return postsCollection().findOne<PostDocument>({ slug })
}

/**
 * Returns list of recent post metadata
 * @param limit - Number of posts
 * @param skip - Skip number of posts
 */
export function getRecentPosts(
   limit: number = 6,
   skip: number = 0
): Promise<PostDocumentMetadata[]> {
   return postsMetadataCollection()
      .find<PostDocumentMetadata>({})
      .limit(limit)
      .skip(skip)
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
   return postsMetadataCollection()
      .find<PostDocumentMetadata>({ topic })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .toArray()
}

/** Returns number of public posts */
export function getPostCount(): Promise<number> {
   return postsMetadataCollection().countDocuments()
}

/**
 * Returns number of public posts by given `topic`
 * @param topic - Topic Id
 */
export function getPostCountByTopic(topic: string): Promise<number> {
   return postsMetadataCollection().countDocuments({ topic })
}
