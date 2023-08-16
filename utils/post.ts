import { CLOUDINARY_CLOUD_NAME } from '../config/env'

/**
 * Returns absolute image url of cover image by given `imagePath`
 * @param imagePath - Post cover image path
 */
export function getPostCoverImageURL(imagePath: string): string {
   return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_600/${imagePath}.webp`
}

/**
 * Returns absolute image url of embedded image inside post body
 * @param imagePath - Image path
 */
export function getPostEmbeddedImageUrl(imagePath: string): string {
   return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_600/${imagePath}`
}
