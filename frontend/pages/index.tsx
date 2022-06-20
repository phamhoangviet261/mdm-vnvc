import type { NextPage } from 'next'
import Girl from '../components/Girl'

const Home: NextPage = () => {
  return (
    <div className="grid">
      <Girl></Girl>
      <a href="#" className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
        <div className="flex items-center space-x-3">
          <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24">smt</svg>
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
      </a>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-8 sm:p-12">
        <div classNameName="w-full max-w-4xl rounded-md border-2 border-gray-100 bg-white p-14">
          <div classNameName="flex flex-col items-center">
            <span classNameName="-rotate-1 rounded-lg bg-yellow-100 py-px px-2 text-sm text-yellow-800">117+ people joined this week</span>
            <h3 classNameName="mt-2 max-w-2xl text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-tight">Want actionable SEO advice from me? Then join this newsletter</h3>
            <form action="" classNameName="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-0">
              <input type="email" name="email" id="email" classNameName="grow rounded border-2 border-gray-300 py-3 px-3 focus:border-emerald-500 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0" placeholder="Email Address" />
              <button type="submit" classNameName="rounded bg-emerald-500 px-5 py-4 font-bold text-white sm:rounded-l-none sm:rounded-r-md">Get First Email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
