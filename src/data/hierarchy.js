// Content lives in settings.json / entities.json so it's editable through the CMS
// (see /admin). This file just re-exports it under the names components use.
import settings from './settings.json'
import entitiesData from './entities.json'

export const parent = {
  id: 'clarity-ec',
  name: settings.parent.name,
  fullName: settings.parent.fullName,
  tagline: settings.parent.tagline,
}

// All 5 subsidiaries.
export const entities = entitiesData.entities

export const getEntityBySlug = (slug) => entities.find((e) => e.slug === slug)

// Group Performance Metrics — homepage counters
export const groupMetrics = settings.groupMetrics

// Homepage hero slider images
export const heroImages = settings.heroImages

// Global office network — used on homepage world map + /contact
export const offices = settings.offices
