function Loading() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-[6px] border-solid border-black dark:border-white border-t-transparent dark:border-primary-foreground dark:border-t-transparent" aria-label="loading"></div>
    </div>
  )
}

export default Loading