function Tech() {

    const techStack = [
        { name: 'React', src: '/svg/landing/react.svg' },
        { name: 'Tailwind CSS', src: '/svg/landing/tailwind.svg' },
        { name: 'Node.js', src: '/svg/landing/node.svg' },
        { name: 'Express', src: '/svg/landing/express.svg' },
        { name: 'MongoDB', src: '/svg/landing/mongodb.svg' },
        { name: 'GitHub', src: '/svg/landing/github.svg' }
    ];

  return (
    <section id="tech-stack" className='w-full max-w-7xl mx-auto'>
        <div className='flex flex-col text-center justify-center'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-white'>
                Built with Modern Technologies
            </h2>
            <p className="mt-2 max-w-lg mx-auto text-md md:text-lg text-black dark:text-gray-400">
                Leveraging up-to-date technologies, and frameworks
            </p>
            <div className='mt-10 flex flex-row justify-between'>
                {techStack.map((tech, index) => (
                    <div key={index} className="flex flex-col items-center gap-y-2">
                        <img 
                            src={tech.src} 
                            alt={tech.name}
                            className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain brightness-0 dark:invert"
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Tech;