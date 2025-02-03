'use client'

import React from 'react'
import Landing from './pages/Landing'
import Skills from './pages/skills/Skills'
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
      <main className='h-screen'>
        <Navbar />
        <Scrollbar />
        <Landing />
        <Skills />
        <Projects />
        <About />
      </main>
    </ThemeProvider>
  )
}

export default Page
