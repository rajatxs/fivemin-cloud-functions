import MarkdownIt from 'markdown-it'
import { CLOUDINARY_CLOUD_NAME } from '../config/env'
import { getPostEmbeddedImageUrl } from './post'

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

export function renderMarkdown(mdContent: string): string {
   const md = new MarkdownIt('default')

   md.renderer.rules.image = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      const src = token.attrs[token.attrIndex('src')][1]
      const url = getPostEmbeddedImageUrl(src)

      token.attrSet('src', url)
      return self.renderToken(tokens, idx, options)
   }
   return md.render(mdContent, {})
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
