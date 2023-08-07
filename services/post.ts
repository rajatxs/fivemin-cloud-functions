import { postCollection } from './db'
import { PostDocument } from '../types/post'
import topics from '../data/topics.json'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): Promise<PostDocument | null> {
   return postCollection().findOne<PostDocument>({ slug, public: true })
}

/**
 * Returns topic name by given topic `id`
 * @param id - Topic Id
 */
export function getPostTopicName(id: string): string {
   return Reflect.get(topics, id) || 'Other'
}
