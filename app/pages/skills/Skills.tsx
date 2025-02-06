import React, { useState } from 'react'
import { skillsData } from './SkillsData'
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerDescription 
} from '@/components/ui/drawer'

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<typeof skillsData[0] | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <div className="h-screen w-full bg-white dark:bg-black overflow-hidden">
      <div className="h-[90%] max-w-7xl mx-auto p-2 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3 h-[calc(100vh-2rem)]">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedSkill(skill)
                setOpen(true)
              }}
              className={`
                skills-item
                rounded-2xl p-3 md:p-4
                flex items-center justify-center
                bg-[#d3d3d3] dark:bg-[#161616] 
                text-black dark:text-white 
                hover:scale-[0.98] transition-transform cursor-pointer
                ${index === 0 ? 'md:col-span-4 md:row-span-2' : ''}
                ${index === 1 ? 'md:col-span-2 md:row-span-2' : ''}
                ${index === 2 ? 'md:col-span-3' : ''}
                ${index === 3 ? 'md:col-span-3' : ''}
                ${index === 4 ? 'md:col-span-2 md:row-span-2' : ''}
                ${index === 5 ? 'md:col-span-2' : ''}
                ${index === 6 ? 'md:col-span-2 ' : ''}
                ${index === 7 ? 'md:col-span-4 ' : ''}
              `}
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">{skill.h2Content}</h2>
            </div>
          ))}
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="dark:bg-black dark:text-white p-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">
              {selectedSkill?.h2Content}
            </DrawerTitle>
            <DrawerDescription>
              {selectedSkill?.additionalData}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sample Projects</h3>
              <div className="space-y-4">
                {selectedSkill?.sampleProjects.map((project, index) => (
                  <div key={index} className="p-4 rounded-lg dark:bg-white/10 bg-black/10">
                    <h4 className="text-lg font-semibold">{project.projectName}</h4>
                    <p className="text-sm mt-2">{project.projectDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologiesUsed.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 text-sm rounded-full dark:bg-white/20 bg-black/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-white/20 rounded-full">
                <div 
                  className="h-full bg-black dark:bg-white rounded-full"
                  style={{ width: `${selectedSkill?.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{selectedSkill?.percentage}%</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Skills