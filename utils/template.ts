import { join } from 'path'
import { URL } from 'url'
import { renderFile, Options } from 'ejs'
import { HOST_URL } from '../config/env'
import { LAYOUT_DIR, PAGE_DIR } from '../config'
import { PageData } from '../types/template'
import meta from '../data/meta.json'

const defaultOptions: Options = {
   includer: (_file) => {
      return {
         filename: join(PAGE_DIR, `${_file}.ejs`),
      }
   },
}

/**
 * Returns computed page with default options
 * @param file - Template file name
 * @param data - Template data
 */
export function renderTemplate<T>(file: string, data: T): Promise<string> {
   return renderFile(file, data, defaultOptions)
}

/**
 * Returns computed page with specified layout
 * @param name - Layout name
 * @param data - Page template data
 */
export function renderLayout<T extends PageData>(name: string, data: T): Promise<string> {
   const payload: Record<string, any> = { ...data }

   payload.pageContent = data.pageContent
   payload.pageDesc = data.pageDesc || meta.defaultDescription
   payload.pageType = data.pageType || meta.openGraphType
   payload.pageCoverImage = data.pageCoverImage || new URL(meta.openGraphImage, HOST_URL).href
   payload.pageUrl = new URL(data.pageUrlEndpoint || '', HOST_URL).href

   if (data.pageTitle.startsWith('Fivemin')) {
      payload.pageTitle = data.pageTitle
   } else {
      payload.pageTitle = `${data.pageTitle} - Fivemin`
   }

   if (Array.isArray(data.pageKeywords)) {
      payload.pageKeywords = meta.defaultKeyworkds.concat(data['pageKeywords'])
   } else {
      payload.pageKeywords = meta.defaultKeyworkds
   }

   return renderFile(join(LAYOUT_DIR, `${name}.ejs`), payload, defaultOptions)
}

/**
 * Returns computed page with default layout
 * @param data - Page template data
 */
export function renderDefaultLayout<T extends PageData>(data: T): Promise<string> {
   return renderLayout('default-layout', data)
}
