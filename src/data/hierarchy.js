// Content lives in settings.json / branches.json so it's editable through the CMS
// (see /admin). This file just re-exports it under the same names the components use,
// so editing content never requires touching component code.
import settings from './settings.json'
import branchesData from './branches.json'

export const assets = {
  master: settings.parent.image,
  wireframeCutout: settings.cutouts.wireframe,
  explosionCutout: settings.cutouts.explosion,
}

// Level 1 — Parent entity
export const parent = {
  id: 'clarity',
  name: settings.parent.name,
  tagline: settings.parent.tagline,
  image: settings.parent.image,
  theme: 'clarity',
}

// Level 2 — Six branches, each carrying its Level 3 sub-divisions.
export const branches = branchesData.branches

export const getBranchBySlug = (slug) => branches.find((b) => b.slug === slug)

// Group Performance Metrics — homepage
export const groupMetrics = settings.groupMetrics

// Deployment Sequence — mid-scroll showpiece cut data
export const deploymentCuts = settings.deploymentCuts
