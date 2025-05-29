import React, { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";
import clsx from "clsx";
import { skillsData } from "./SkillsData";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

const spanPattern = [
  { col: 4, row: 2 },
  { col: 2, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 2 },
  { col: 4, row: 2 },
];

const SwappableComponent = () => {
  const swapyInstance = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedSkill, setSelectedSkill] = useState<typeof skillsData[0] | null>(
    null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      swapyInstance.current = createSwapy(containerRef.current);
      swapyInstance.current.onSwap?.(() => {});
    }
    return () => {
      swapyInstance.current?.destroy?.();
    };
  }, []);

  return (
    <div
      id="skills-section"
      className="pt-4 flex justify-center items-center h-screen bg-white dark:bg-black"
    >
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-2 w-4/5 h-[90%] p-4"
      >
        {skillsData.map((skill, i) => {
          const { col, row } = spanPattern[i];

          return (
            <div
              key={skill.h2Content}
              data-swapy-slot={skill.swapySlot}
              className={clsx(
                "col-span-1 row-span-1", // mobile default

                // sm col-span
                {
                  "sm:col-span-1": col === 1,
                  "sm:col-span-2": col === 2,
                  "sm:col-span-3": col === 3,
                  "sm:col-span-4": col >= 4,
                },

                // sm row-span
                {
                  "sm:row-span-1": row === 1,
                  "sm:row-span-2": row === 2,
                  "sm:row-span-3": row === 3,
                  "sm:row-span-4": row >= 4,
                },

                // lg col-span
                {
                  "lg:col-span-1": col === 1,
                  "lg:col-span-2": col === 2,
                  "lg:col-span-3": col === 3,
                  "lg:col-span-4": col === 4,
                  "lg:col-span-5": col === 5,
                  "lg:col-span-6": col === 6,
                },

                // lg row-span
                {
                  "lg:row-span-1": row === 1,
                  "lg:row-span-2": row === 2,
                  "lg:row-span-3": row === 3,
                  "lg:row-span-4": row === 4,
                }
              )}
              onClick={() => {
                setSelectedSkill(skill);
                setOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div
                data-swapy-item={skill.swapyItem}
                className="p-4 bg-[#cccccc8a] dark:bg-[#181818] text-black dark:text-white text-center rounded-xl font-bold h-full flex items-center justify-center"
                
              >
                <h2 className="text-lg font-semibold">{skill.h2Content}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="dark:bg-black dark:text-white p-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">
              {selectedSkill?.h2Content}
            </DrawerTitle>
            <DrawerDescription>{selectedSkill?.additionalData}</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sample Projects</h3>
              <div className="space-y-4">
                {selectedSkill?.sampleProjects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg dark:bg-white/10 bg-black/10"
                  >
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
  );
};

export default SwappableComponent;
