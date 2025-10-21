import Link from "fumadocs-core/link";
import { CreateFormIcon } from "./icon";
import HeroPulse from "./pulse";

export default function HeroContent() {
  //const { theme } = useTheme();
  const isDark = "dark";
  return (
    <div className="isolate my-20">
      <div className="px-6 pt-6 lg:px-8 justify-center flex relative">
        <HeroPulse />
        <div
          className={`w-60 h-60 rounded-full animate-pulse ${isDark ? "bg-brandDark" : "bg-brandLight"
            } flex justify-center`}
        >
          <CreateFormIcon />
        </div>
      </div>
      <main>
        <div className="relative px-3 lg:px-2">
          <div className="mx-auto max-w-2xl py-28 sm:py-14 lg:py-14">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
                The ReactJS form library
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                CreateForm is a powerful and flexible form library for ReactJS
                applications. It provides an easy-to-use API for managing form
                state, validation, and submission.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs"
                  className="relative py-2.5 px-8 mr-3 mb-2 text-md font-medium rounded-lg group
                    bg-violet-600 hover:bg-violet-700 text-white
                    dark:bg-violet-700/90 dark:hover:bg-violet-600/90
                    transition-all duration-200 ease-out
                    shadow-lg hover:shadow-violet-500/20 dark:hover:shadow-violet-400/10
                    border border-violet-700/30 dark:border-violet-500/30
                    focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
                    dark:focus:ring-violet-500 dark:focus:ring-offset-violet-900/50"
                >
                  <span className="relative z-10">Docs</span>
                  <span
                    className="absolute inset-0 rounded-lg bg-violet-500/10 dark:bg-white/5
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>

                <a
                  href="https://github.com/jucian0/CreateForm"
                  className="relative py-2.5 px-8 mr-3 mb-2 text-md font-medium rounded-lg group
                    bg-white/80 hover:bg-white text-violet-800
                    dark:bg-violet-900/30 dark:hover:bg-violet-900/40 dark:text-violet-100
                    transition-all duration-200 ease-out
                    shadow-lg hover:shadow-violet-200/30 dark:hover:shadow-violet-500/10
                    border border-violet-200/60 dark:border-violet-700/40
                    focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2
                    dark:focus:ring-violet-500 dark:focus:ring-offset-violet-900/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1">
                    Github
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span
                    className="absolute inset-0 rounded-lg bg-violet-200/20 dark:bg-white/5
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />
    </div>
  );
}
