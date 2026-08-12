import HeroSlider from '../components/HeroSlider'
import ServicesGrid from '../components/ServicesGrid'
import WorldMap from '../components/WorldMap'
import MetricsCounters from '../components/MetricsCounters'
import ClientCarousel from '../components/ClientCarousel'
import GroupAdvantages from '../components/GroupAdvantages'
import TestimonialCarousel from '../components/TestimonialCarousel'
import FAQAccordion from '../components/FAQAccordion'
import CTABanner from '../components/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <MetricsCounters />
      <GroupAdvantages />
      <ServicesGrid />
      <WorldMap />
      <ClientCarousel />
      <TestimonialCarousel />
      <FAQAccordion />
      <CTABanner />
    </>
  )
}
