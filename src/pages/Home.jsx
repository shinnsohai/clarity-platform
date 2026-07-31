import HeroSlider from '../components/HeroSlider'
import ServicesGrid from '../components/ServicesGrid'
import WorldMap from '../components/WorldMap'
import MetricsCounters from '../components/MetricsCounters'
import ClientCarousel from '../components/ClientCarousel'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <MetricsCounters />
      <ServicesGrid />
      <WorldMap />
      <ClientCarousel />
    </>
  )
}
