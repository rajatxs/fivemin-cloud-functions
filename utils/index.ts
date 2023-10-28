import { CLOUDINARY_CLOUD_NAME } from '../config/env'

export function formatTime(time: Date) {
   const currentTime = new Date()
   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ]

   const month = months[time.getMonth()]

   if (time.getFullYear() === currentTime.getFullYear()) {
      return `${month} ${time.getDate()}`
   } else {
      return `${month} ${time.getDate()}, ${time.getFullYear()}`
   }
}

export function getTimeFormat(time: Date): string {
   return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
}

export function truncateText(text: string, len: number) {
   if (text.length > len) {
      return text.substring(0, len - 3) + '...'
   }
   return text
}

export function getOpenGraphImageURL(imagePath: string): string {
   return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1200,h_600/${imagePath}`
}
