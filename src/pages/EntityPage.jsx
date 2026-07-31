import { useParams, Navigate } from 'react-router-dom'
import { getEntityBySlug } from '../data/hierarchy'
import EntityPageTemplate from '../components/EntityPageTemplate'

export default function EntityPage() {
  const { slug } = useParams()
  const entity = getEntityBySlug(slug)

  if (!entity) return <Navigate to="/our-business" replace />

  return <EntityPageTemplate entity={entity} />
}
