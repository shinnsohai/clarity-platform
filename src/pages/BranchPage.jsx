import { useParams, Navigate } from 'react-router-dom'
import { getBranchBySlug } from '../data/hierarchy'
import BranchPageTemplate from '../components/BranchPageTemplate'

export default function BranchPage() {
  const { slug } = useParams()
  const branch = getBranchBySlug(slug)

  if (!branch) return <Navigate to="/" replace />

  return <BranchPageTemplate branch={branch} />
}
