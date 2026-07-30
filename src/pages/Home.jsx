import Hero from '../components/Hero'
import MetricsBar from '../components/MetricsBar'
import HierarchyMap from '../components/HierarchyMap'
import DeploymentSequence from '../components/DeploymentSequence'
import DeepDives from '../components/DeepDives'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <HierarchyMap />
      <DeploymentSequence />
      <DeepDives />
      <Footer />
    </>
  )
}
