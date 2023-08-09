import MarkdownIt from 'markdown-it'

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
   return new MarkdownIt('default').render(mdContent, {})
}

export function truncateText(text: string, len: number) {
   if (text.length > len) {
      return text.substring(0, len - 3) + '...'
   }
   return text
}
