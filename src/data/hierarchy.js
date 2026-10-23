// Content lives in settings.json / entities.json so it's editable through the CMS
// (see /admin). This file just re-exports it under the names components use.
import settings from './settings.json'
import entitiesData from './entities.json'
import officesData from './offices.json'
import partnersData from './partners.json'

export const parent = {
  id: 'clarity-ec',
  name: settings.parent.name,
  fullName: settings.parent.fullName,
  tagline: settings.parent.tagline,
}

// Everything in entities.json, in display order (Clarity E&C first).
export const allEntities = entitiesData.entities

// The subsidiaries shown on the site. An entity with `"published": false` (Techsphere for now)
// stays in the data but drops out of every list, page and count — tick "Published" in the CMS
// to bring it back.
export const entities = allEntities.filter((e) => e.published !== false)

export const getEntityBySlug = (slug) => entities.find((e) => e.slug === slug)

// "Five" — for copy that states how many subsidiaries are listed, so it can never drift from the lists.
const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
export const subsidiaryCountWord = COUNT_WORDS[entities.length] ?? String(entities.length)

// Group Performance Metrics — homepage counters
export const groupMetrics = settings.groupMetrics

// Homepage hero background video
export const heroVideo = settings.heroVideo

// Closing CTA banner (homepage)
export const ctaBanner = settings.ctaBanner

// Clarity Group's own social channels — footer "Follow Clarity Group" block.
// Blank until real URLs are added via CMS (never fabricate a company's social links).
export const groupSocial = settings.social

// Global office network — used on homepage world map + /contact
export const offices = officesData.offices

// External strategic partners (not owned subsidiaries) — used on /strategic-partner
export const partners = partnersData.partners
export const getPartnerBySlug = (slug) => partners.find((p) => p.slug === slug)
