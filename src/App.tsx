import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './views/Home'
import NewsPage from './views/NewsPage'
import BlogsPage from './views/BlogsPage'
import ReportsPage from './views/ReportsPage'
import NasaApod from './views/NasaApod'
import NewsDetailsPage from './views/NewsDetailsPage'

function App() {
  return (
    <div
      className='App font-navine h-screen w-screen bg-gradient-to-br 
    from-black/80 to-slate-700 text-slate-100 overflow-auto'
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/news/:id' element={<NewsDetailsPage />} />
        <Route path='/blogs' element={<BlogsPage />} />
        <Route path='/reports' element={<ReportsPage />} />
        <Route path='/apod' element={<NasaApod />} />
      </Routes>
    </div>
  )
}

export default App
