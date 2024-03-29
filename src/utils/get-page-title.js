import defaultSettings from '@/settings'

const title = defaultSettings.title || '谦恒'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
