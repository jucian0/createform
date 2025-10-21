const highlights = [
  {
    title: "Smart Commit-Driven Versioning",
    description:
      "CreateForm analyzes commit messages to automatically calculate precise version bumps according to semantic versioning principles.",
    features: [
      "`feat:` → minor version bump",
      "`fix:` → patch update",
      "`BREAKING CHANGE:` → major version",
    ],
    img: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7V13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 17H12.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Branch-Named Releases",
    description:
      "Your branch naming convention directly determines release types, perfect for Git-flow workflows.",
    features: [
      "`feature/` → minor versions",
      "`hotfix/` → patch versions",
      "`release/` → major versions",
    ],
    img: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3V15C3 16.6569 4.34315 18 6 18H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 15L10 12L13 15L17 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="18"
          cy="18"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Monorepo & Single-Package Ready",
    description:
      "Seamlessly handles both complex monorepos and simple single-package projects with equal ease.",
    features: [
      "Async mode for independent versions",
      "Sync mode for lockstep releases",
      "Automatic dependency management",
    ],
    img: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8H8.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 8H16.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Highlights() {
  return (
    <section className="rounded-2xl py-16 bg-gradient-to-b from-violet-50/80 to-transparent dark:from-violet-900/10 dark:to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-violet-800 dark:text-violet-300 sm:text-4xl">
            CreateForm Highlights
          </h2>
          <p className="mt-4 text-xl text-violet-600/90 dark:text-violet-200/80">
            Automated versioning with intelligent workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-white/80 dark:bg-violet-900/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-violet-200/40 dark:hover:shadow-violet-500/10 transition-all duration-300 border border-violet-100/50 dark:border-violet-900/30 hover:border-violet-200/70 dark:hover:border-violet-700/50"
            >
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-5 rounded-xl bg-violet-100/70 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                {item.img}
              </div>
              <h3 className="text-xl font-semibold text-center text-violet-900 dark:text-violet-100 mb-4">
                {item.title}
              </h3>
              <p className="text-violet-700/90 dark:text-violet-200/80 mb-5 text-center">
                {item.description}
              </p>
              <ul className="space-y-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-violet-500 dark:text-violet-400 mt-0.5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-violet-800/90 dark:text-violet-100/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
