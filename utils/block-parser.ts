import { BlockParser } from '@rxpm/fivemin-block-parser'
import type { BlockDocument } from '@rxpm/fivemin-block-parser/lib/types'

const parser = new BlockParser()

/**
 * Parses block document and produce HTML code
 * @param doc - Block document
 */
export function parseBlockDocument(doc: BlockDocument): string {
   return parser.parse(doc)
}
