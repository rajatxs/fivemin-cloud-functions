import { CLOUDINARY_CLOUD_NAME } from '../config/env'

export class Topic {
   public id: string
   public name: string
   public thumbId: string
   public thumbPath: string

   public getThumbUrl(): string {
      return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_600/${this.thumbPath}`
   }

   public getRelativeUrl(): string {
      return `/t/${this.id}`
   }

   public static fromObject(id: string, obj: Record<string, any>): Topic {
      const topic = new Topic()

      topic.id = id
      topic.name = obj.name
      topic.thumbId = obj.thumbId
      topic.thumbPath = obj.thumbPath
      return topic
   }
}
