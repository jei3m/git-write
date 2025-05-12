function MobileScreen() {
  return (
    <div className='p-4 max-w-[80%] min-h-[90dvh] mx-auto flex flex-col items-center justify-center gap-2'>
        <h1 className='text-black dark:text-white text-xl font-bold text-center'>Desktop Only Application</h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm text-center max-w-md'>
            GitWrite is designed exclusively for desktop use and won't support mobile devices.
        </p>
    </div>
  )
}

export default MobileScreen;