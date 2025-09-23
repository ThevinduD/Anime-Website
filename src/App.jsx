import React, { Suspense } from "react"
import About from "./components/About"
import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Story from "./components/Story"
import Footer from "./components/Footer"

const Features = React.lazy(() => import("./components/Features"))

import { ReactLenis } from 'lenis/react'


const App = () => {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar/>
        <Hero/>
        <About/>
        <Suspense fallback={<div>Loading features…</div>}>
          <Features/>
        </Suspense>
        <Story/>
        <Contact/>
        <Footer/>
      </main>
    </ReactLenis>
  )
}

export default App