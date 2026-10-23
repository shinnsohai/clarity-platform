import { useParams, Navigate } from 'react-router-dom'
import { getEntityBySlug, getSubpage } from '../data/hierarchy'
import StandardSubpage from '../components/StandardSubpage'
import BuiltSyncPage from '../components/builtsync/BuiltSyncPage'

// /our-business/:slug/:sub — a page that hangs off a subsidiary (e.g. /our-business/lenix/builtsync).
// Which layout it uses is the "Page Type" chosen for it in the CMS.
const TEMPLATES = {
  builtsync: BuiltSyncPage,
  standard: StandardSubpage,
}

export default function SubPage() {
  const { slug, sub } = useParams()
  const entity = getEntityBySlug(slug)
  const subpage = entity && getSubpage(slug, sub)

  if (!entity) return <Navigate to="/our-business" replace />
  if (!subpage) return <Navigate to={`/our-business/${slug}`} replace />

  const Template = TEMPLATES[subpage.template] || StandardSubpage
  return <Template subpage={subpage} entity={entity} />
}
