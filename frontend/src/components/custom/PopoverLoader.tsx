import { Loader2 } from 'lucide-react'

export default function PopoverLoader() {
  return (
    <div className='p-2 text-center flex justify-center items-center'>
      <Loader2 className='animate-spin text-sm text-black dark:text-white'/>
    </div>
  )
};