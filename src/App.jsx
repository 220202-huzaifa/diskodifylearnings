import { useEffect } from 'react'
// import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import LearningTracks from './components/LearningTracks'
import WhyDiskodify from './components/WhyDiskodify'
import FeaturedCourses from './components/FeaturedCourses'
import InstructorSpotlight from './components/InstructorSpotlight'
import TeamHierarchy from './components/TeamHierarchy'
import Community from './components/Community'
import Footer from './components/Footer'
import { useLenisSmoothScroll } from './utils/smoothScroll'
import Whatsappbutton from './components/Whatsappbutton'

function App() {
  useLenisSmoothScroll()

  return (
    <div className="min-h-screen bg-white text-black">
      {/* <CustomCursor /> */}
      <Navigation />
      <main>
        <Hero />
        <LearningTracks />
        <WhyDiskodify />
        <FeaturedCourses />
        <InstructorSpotlight />
        <TeamHierarchy />
        <Community />
        <Whatsappbutton/>
      </main>
      <Footer />
    </div>
  )
}

export default App
