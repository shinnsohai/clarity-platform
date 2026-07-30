import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import BranchPage from './pages/BranchPage'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<BranchPage />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
