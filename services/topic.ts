import { Topic } from '../models/Topic'
import topics from '../data/topics.json'

/**
 * Returns topic name by given topic `id`
 * @param id - Topic Id
 */
export function getTopicName(id: string): string {
   const _topic = Reflect.get(topics, id)
   return _topic ? _topic.name : 'Other'
}

/**
 * Returns `Topic` instance from raw object entry
 * @param id - Topic Id
 */
export function getTopic(id: string): Topic | null {
   const _topic = Reflect.get(topics, id)

   if (_topic) {
      return Topic.fromObject(id, _topic)
   } else {
      return null
   }
}

export function getAllTopics(): Topic[] {
   let _topics = new Array<Topic>()

   for (const _topic in topics) {
      _topics.push(Topic.fromObject(_topic, topics[_topic]))
   }

   return _topics
}
