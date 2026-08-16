import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import GlobalFooter from './components/GlobalFooter'
import Home from './pages/Home'
import OurBusiness from './pages/OurBusiness'
import EntityPage from './pages/EntityPage'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import StrategicPartner from './pages/StrategicPartner'
import HowItWorks from './pages/HowItWorks'
import InvestorRelations from './pages/InvestorRelations'
import AboutHub from './pages/about/AboutHub'
import CorporateInformation from './pages/about/CorporateInformation'
import CorporateProfile from './pages/about/CorporateProfile'
import LeadershipTeam from './pages/about/LeadershipTeam'
import FounderAdvisorHub from './pages/about/FounderAdvisorHub'
import FounderDetail from './pages/about/FounderDetail'
import MissionVision from './pages/about/MissionVision'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Cursor />
        <Navbar />
        <main className="pt-20 lg:pt-24">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<AboutHub />} />
            <Route path="/about/corporate-information" element={<CorporateInformation />} />
            <Route path="/about/corporate-profile" element={<CorporateProfile />} />
            <Route path="/about/leadership-team" element={<LeadershipTeam />} />
            <Route path="/about/founder-advisor" element={<FounderAdvisorHub />} />
            <Route path="/about/founder-advisor/:slug" element={<FounderDetail />} />
            <Route path="/about/mission-vision" element={<MissionVision />} />

            <Route path="/our-business" element={<OurBusiness />} />
            <Route path="/our-business/:slug" element={<EntityPage />} />
            <Route path="/strategic-partner" element={<StrategicPartner />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/investor-relations" element={<InvestorRelations />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <GlobalFooter />
      </SmoothScroll>
    </BrowserRouter>
  )
}
