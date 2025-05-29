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
import Cursor from '../components/Cursor'

const Page = () => {
  useLenis()
  return (
    <ThemeProvider>
      <main className='h-screen'>
        <Cursor />
        <Navbar />
        <Scrollbar />
        <Landing />
        <Projects />
        <Skills />
        <About />
      </main>
    </ThemeProvider>
  )
}

export default Page
