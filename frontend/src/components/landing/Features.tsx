import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileEdit, BookTemplate, Github, GitPullRequest } from 'lucide-react';

function Features() {
  
  const features = [
    {
      title: 'Markdown Editor',
      description: 'Write documentation using a streamlined interface with real-time preview, and formatting tools to create your documentation.',
      icon: FileEdit
    },
    {
      title: 'Templates',
      description: 'Save time with customizable documentation templates for various purposes. Create, manage, and reuse your templates to maintain consistency.',
      icon: BookTemplate
    },
    {
      title: 'README Fetching',
      description: 'Seamlessly import and edit README files from your GitHub repositories. Keep your documentation in sync with your codebase.',
      icon: Github
    },
    {
      title: 'GitHub Commits',
      description: 'Push your documentation changes directly to your repositories with integrated GitHub support.',
      icon: GitPullRequest
    }
  ]

  return (
    <section id="features" className="py-16 px-4">
        <h2 className='text-3xl md:text-3xl lg:text-4xl font-semibold text-center text-black dark:text-white'>A Streamlined Interface for Documentation</h2>
        <p className="mx-auto text-center mt-2 w-full md:max-w-2xl text-md md:text-lg text-black dark:text-gray-400">
          Packed with features for all of your documentation needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-300 dark:border-neutral-700 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2">
                  <feature.icon className="w-6 h-6 text-black dark:text-white" />
                  <CardTitle className="text-md md:text-xl text-black dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className='-mt-4'>
                  <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-md">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>
    </section>
  )
}

export default Features;