const Girl = () => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer ">
      <div className="group w-72 border-2 m-40 p-2 rounded-md pb-[20px] hover:bg-sky-500 hover:text-white hover:scale-150 duration-500 ring-2 ring-blue-500 bg-cyan-500 shadow-lg shadow-cyan-500/50">
        <img src="https://gamek.mediacdn.vn/133514250583805952/2020/11/7/photo-1-16047368104351907433833.jpg" alt="Mean Nghi" className='rounded-md'/>
        <div className="mt-5 text-lg font-bold group-hover:text-green-300 after:content-['*'] after:ml-0.5 after:text-red-500">
          <p>Nguyen Tran Minh Nghi</p>
        </div>
        <span className="">September 26, 1996</span>
      </div>
      <div className="max-w-lg mx-auto p-8 w-full">
  <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
    <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
      Why do they call it Ovaltine?
    </summary>
    <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
      <p>The mug is round. The jar is round. They should call it Roundtine.</p>
    </div>
  </details>
</div>
    </div>
  )
}

export default Girl