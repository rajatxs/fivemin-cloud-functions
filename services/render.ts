import { join } from 'path'
import { renderFile } from 'ejs'
import { PAGE_DIR, VIEW_PARTIAL_DIR, LAYOUT_DIR } from '../config'
import type { IndexPageTemplateData, PostPageTemplateData } from '../types'

/**
 * Returns computed index page content
 * @param data - Page template data
 */
export async function renderIndexPage(data: IndexPageTemplateData): Promise<string> {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: data.title,
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'index.ejs'), {}),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/**
 * Returns computed post page content
 * @param data - Page template data
 */
export async function renderPostPage(data: PostPageTemplateData) {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: data.title,
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'post.ejs'), {}),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/** Returns computed 404 error page content */
export async function render404Page() {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: "Page not found - Fivemin",
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, '404.ejs'), {}),
      partialFooter: '',
   })
}
