// skillsData.ts
export interface SampleProject {
  projectName: string
  projectDescription: string
  technologiesUsed: string[]
}

export interface Skill {
  swapySlot: string
  swapyItem: string
  h2Content: string
  additionalData: string
  percentage: number
  sampleProjects: SampleProject[]
}

export const skillsData: Skill[] = [
  {
    swapySlot: 'abc',
    swapyItem: 'a',
    h2Content: 'Front-end Development',
    additionalData:
      'Proficient in HTML, CSS, JavaScript, and React. Experienced in building responsive and interactive web applications. Familiar with modern front-end build tools like Webpack and Babel.',
    percentage: 90,
    sampleProjects: [
      {
        projectName: 'Personal Portfolio',
        projectDescription:
          'A responsive and interactive web application showcasing my skills and experience.',
        technologiesUsed: ['React', 'JavaScript', 'CSS', 'HTML'],
      },
      {
        projectName: 'E-commerce Website',
        projectDescription:
          'A fully functional e-commerce website with user authentication and payment gateway integration.',
        technologiesUsed: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Express'],
      },
    ],
  },
  {
    swapySlot: 'bca',
    swapyItem: 'b',
    h2Content: 'MERN Stack',
    additionalData:
      'Knowledgeable in MongoDB, Express, React, and Node.js. Familiar with building full-stack web applications. Experienced in using Mongoose for database modeling and Passport for authentication.',
    percentage: 90,
    sampleProjects: [
      {
        projectName: 'Blog Application',
        projectDescription:
          'A full-stack web application with user authentication, blog posting, and commenting functionality.',
        technologiesUsed: ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose', 'Passport'],
      },
    ],
  },
  {
    swapySlot: 'baz',
    swapyItem: 'c',
    h2Content: 'Graphic Design',
    additionalData:
      'Skilled in Adobe Creative Suite, specifically Photoshop and Illustrator. Experienced in creating visual designs and graphics. Familiar with design principles and human-centered design approach.',
    percentage: 70,
    sampleProjects: [
      {
        projectName: 'Logo Design',
        projectDescription:
          'A collection of logo designs for various clients, showcasing my creativity and design skills.',
        technologiesUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
      },
    ],
  },
  {
    swapySlot: 'qux',
    swapyItem: 'd',
    h2Content: '3D Modeling',
    additionalData:
      'Familiar with Blender and Autodesk Maya. Knowledgeable in creating 3D models and animations. Experienced in texturing and lighting for realistic renders.',
    percentage: 60,
    sampleProjects: [
      {
        projectName: '3D Character Model',
        projectDescription:
          'A 3D character model created using Blender, showcasing my skills in 3D modeling and texturing.',
        technologiesUsed: ['Blender'],
      },
    ],
  },
  {
    swapySlot: 'quux',
    swapyItem: 'e',
    h2Content: 'AI Prompts',
    additionalData:
      'Experienced in generating AI prompts for various applications. Knowledgeable in natural language processing. Familiar with AI models like GPT-3 and BERT.',
    percentage: 50,
    sampleProjects: [
      {
        projectName: 'Chatbot Development',
        projectDescription:
          'A chatbot developed using GPT-3, showcasing my skills in AI prompt generation and natural language processing.',
        technologiesUsed: ['GPT-3', 'Node.js', 'JavaScript'],
      },
    ],
  },
  {
    swapySlot: 'corge',
    swapyItem: 'f',
    h2Content: 'UI/UX Design',
    additionalData:
      'Skilled in designing user interfaces and user experiences. Familiar with design tools like Figma and Sketch. Experienced in creating wireframes, prototypes, and high-fidelity designs.',
    percentage: 80,
    sampleProjects: [
      {
        projectName: 'Mobile App Design',
        projectDescription:
          'A mobile app design created using Figma, showcasing my skills in UI/UX design and user experience.',
        technologiesUsed: ['Figma'],
      },
    ],
  },
  {
    swapySlot: 'grault',
    swapyItem: 'g',
    h2Content: 'Back-end Development',
    additionalData:
      'Knowledgeable in building server-side applications with Node.js and Express. Experienced in database management with MongoDB and SQL. Familiar with API design and implementation.',
    percentage: 85,
    sampleProjects: [
      {
        projectName: 'RESTful API',
        projectDescription:
          'A RESTful API built using Node.js and Express, showcasing my skills in back-end development and API design.',
        technologiesUsed: ['Node.js', 'Express', 'MongoDB'],
      },
      {
        projectName: 'Server-side Rendering',
        projectDescription:
          'A server-side rendering application built using Next.js, showcasing my skills in back-end development and server-side rendering.',
        technologiesUsed: ['Next.js', 'Node.js', 'Express'],
      },
    ],
  },
  {
    swapySlot: 'hoge',
    swapyItem: 'h',
    h2Content: 'DevOps',
    additionalData:
      'Familiar with DevOps practices and tools like Docker and Kubernetes. Knowledgeable in continuous integration and deployment with Jenkins and GitLab CI/CD. Experienced in monitoring and logging with Prometheus and Grafana.',
    percentage: 75,
    sampleProjects: [
      {
        projectName: 'Containerization',
        projectDescription:
          'A containerized application built using Docker, showcasing my skills in DevOps and containerization.',
        technologiesUsed: ['Docker'],
      },
      {
        projectName: 'CI/CD Pipeline',
        projectDescription:
          'A CI/CD pipeline built using Jenkins and GitLab CI/CD, showcasing my skills in DevOps and continuous integration and deployment.',
        technologiesUsed: ['Jenkins', 'GitLab CI/CD'],
      },
    ],
  },
]
