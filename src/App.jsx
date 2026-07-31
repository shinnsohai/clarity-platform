import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import GlobalFooter from './components/GlobalFooter'
import Home from './pages/Home'
import About from './pages/About'
import OurBusiness from './pages/OurBusiness'
import EntityPage from './pages/EntityPage'
import HseCompliance from './pages/HseCompliance'
import TrackRecord from './pages/TrackRecord'
import InvestorRelations from './pages/InvestorRelations'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Cursor />
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-business" element={<OurBusiness />} />
            <Route path="/our-business/:slug" element={<EntityPage />} />
            <Route path="/hse-compliance" element={<HseCompliance />} />
            <Route path="/track-record" element={<TrackRecord />} />
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
