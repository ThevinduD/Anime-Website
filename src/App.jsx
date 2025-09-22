import About from "./components/About"
import Contact from "./components/Contact"
import Features from "./components/Features"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Story from "./components/Story"
import Footer from "./components/Footer"

import { ReactLenis } from 'lenis/react'

const App = () => {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar/>
        <Hero/>
        <About/>
        <Features/>
        <Story/>
        <Contact/>
        <Footer/>
      </main>
    </ReactLenis>
  )
}

export default App