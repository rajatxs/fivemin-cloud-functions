import { CLOUDINARY_CLOUD_NAME } from '../config/env'

// @ts-ignore
import type { Marked, MarkedExtension } from 'marked/index'

const { marked }: { marked: Marked } = require('marked')
const { baseUrl }: { baseUrl: MarkedExtension } = require('marked-base-url')

marked.use(baseUrl(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_600/`))

marked.use({
   renderer: {
      image(href, title, text) {
         const [caption = '', refName = '', refUrl = ''] = text
            .split(';')
            .map((_token) => _token.trim())

         let html = `<img src="${href}" alt="${caption}" class="fm-post__image" width="100%" height="auto" />`

         if (caption.length) {
            html += `<span class="fm-post__caption"><small>${caption}</small></span>`
         }

         if (refName.length && refUrl.length) {
            html += `<a href="${refUrl}" target="_blank" class="fm-post__image_ref"><small>${refName}</small></a>`
         }
         return html
      },
      paragraph(text) {
         return `<p class="fm-post__paragraph">${text}</p>`
      },
   },
})

/**
 * Renders `content` with custom Markdown config
 * @param content - Text content
 */
export function renderMarkdown(content: string): Promise<string> {
   return marked.parse(content, {
      async: true,
   })
}
