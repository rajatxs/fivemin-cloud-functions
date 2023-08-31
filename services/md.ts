import MarkdownIt from 'markdown-it'

var _md: MarkdownIt

function instance(): MarkdownIt {
   if (!_md) {
      _md = new MarkdownIt('default')
   }

   return _md
}

instance().renderer.rules.image = function (tokens, idx, options, env, self) {
   const token = tokens[idx]
   const caption = token.content || ''

   const [refName = '', refUrl = ''] = (token.attrGet('title') || '')
      .split(',')
      .map((_token) => _token.trim())

   // remove 'title' attr
   token.attrSet('alt', caption)
   token.attrSet('title', caption)
   token.attrSet('class', 'fm-post__image')
   token.attrSet('width', '100%')
   token.attrSet('height', 'auto')

   return `
<figure class="fm-post__image_figure">
   ${self.renderToken(tokens, idx, options)}
   <figcaption class="fm-post__image_caption">${caption}</figcaption>
   <a href="${refUrl}" target="_blank" class="fm-post__image_ref">
      <small>${refName}</small>
   </a>
</figure>
`
}

/**
 * Renders `content` with custom Markdown config
 * @param content - Text content
 */
export function renderMarkdown(content: string): string {
   return instance().render(content, {})
}
