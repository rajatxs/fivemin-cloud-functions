import { postsCollection, postsMetadataCollection } from './db'
import { getTopicName } from './topic'
import { formatTime } from '../utils'
import { getPostCoverImageURL } from '../utils/post'
import type { PartialPostViewData } from '../types/template'
import type { PostDocumentMetadata, PostDocument, PostFeedData } from '../types/post'

/** Returns post feed data for various topics */
export async function getPostFeedData(): Promise<PostFeedData> {
   const cursor = postsMetadataCollection().aggregate<PostFeedData>([
      {
         $sort: {
            createdAt: -1,
         },
      },
      {
         $facet: {
            popular: [
               { $sort: { stars: -1 } },
               { $match: { stars: { $gt: 0 } } }, 
               { $limit: 6 },
            ],
            technology: [
               { $match: { topic: 'technology' } }, 
               { $limit: 3 },
            ],
            science: [
               { $match: { topic: 'science' } }, 
               { $limit: 3 },
            ],
            programming: [
               { $match: { topic: 'programming' } }, 
               { $limit: 3 },
            ],
         },
      },
   ])

   const [ result ] = await cursor.toArray()
   return result
}

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): Promise<PostDocument | null> {
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
 * Returns list of popular post metadata
 * @param limit - Number of posts
 * @param skip - Skip number of posts
 */
export function getPopularPosts(
   limit: number = 6,
   skip: number = 0
): Promise<PostDocumentMetadata[]> {
   return postsMetadataCollection()
      .find<PostDocumentMetadata>({
         stars: { $gt: 5 },
      })
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

export function parsePostViewData(
   meta: PostDocumentMetadata,
   index: number = 0
): PartialPostViewData {
   return {
      postUrl: `/${meta.slug}`,
      postIndex: index + 1,
      postTitle: meta.title,
      postDesc: meta.desc,
      postTopic: getTopicName(meta.topic),
      postPublishTime: formatTime(meta.createdAt),
      postCoverImageUrl: getPostCoverImageURL(meta.coverImage.path),
   }
}

export function parsePostViewDataList(
   posts: PostDocumentMetadata[]
): PartialPostViewData[] {
   return posts.map((_post, _index) => parsePostViewData(_post, _index))
}
