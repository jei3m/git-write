import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function CTA({handleLogin}: {handleLogin: () => void}) {
  return (
    <section id='cta' className='w-full max-w-7xl mx-auto py-20 px-2 mt-10 bg-black dark:bg-white rounded-xl'>
        <div className='flex flex-col text-center justify-center'>
            <h2 className='text-3xl lg:text-4xl font-semibold text-white dark:text-black'>
                Start Writing Better Documentation Today
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-lg text-white dark:text-gray-800">
                Join developers who use GitWrite to streamline their documentation workflow
            </p>
            <div className='mt-10 flex flex-row justify-center gap-x-4'>
                <Button 
                className='text-black dark:text-white bg-white dark:bg-black' 
                onClick={handleLogin}
                >
                Get Started - It's Free
                </Button>
                <Link to={'https://github.com/jei3m'} target='_blank'>
                    <Button className='text-white dark:text-black'>
                        View on GitHub
                    </Button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default CTA;