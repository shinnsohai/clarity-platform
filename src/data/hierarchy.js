// Content lives in settings.json / entities.json so it's editable through the CMS
// (see /admin). This file just re-exports it under the names components use.
import settings from './settings.json'
import entitiesData from './entities.json'

export const parent = {
  id: 'cec',
  name: settings.parent.name,
  fullName: settings.parent.fullName,
  tagline: settings.parent.tagline,
  image: settings.parent.image,
}

// All 6 entities — 5 Subsidiaries + 1 Strategic Partner.
export const entities = entitiesData.entities
export const subsidiaries = entities.filter((e) => e.kind === 'subsidiary')
export const strategicPartners = entities.filter((e) => e.kind === 'strategic-partner')

export const getEntityBySlug = (slug) => entities.find((e) => e.slug === slug)

// Group Performance Metrics — homepage counters
export const groupMetrics = settings.groupMetrics
