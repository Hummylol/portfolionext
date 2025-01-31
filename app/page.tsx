'use client'

import React from 'react'
import Landing from './pages/Landing'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import About from './pages/About'
import Scrollbar from '../components/Scrollbar'
import useLenis from '@/utils/lenisSetup'
import Navbar from '../components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

const Page = () => {
  useLenis()
  return (
    <ThemeProvider>
      <div className='h-screen'>
        <Navbar />
        <Scrollbar />
        <Landing />
        <Skills />
        <Projects />
        <About />
      </div>
    </ThemeProvider>
  )
}

export default Page
