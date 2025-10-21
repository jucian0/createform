import type { Route } from "./+types/home";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import HomeContent from "./components";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CreateForm" },
    {
      name: "description",
      content:
        "The ReactJS form library",
    },
  ];
}

export default function Home() {
  return (
    <HomeLayout
      nav={{
        title: (
          <span className="flex items-center">
            <img src="/favicon.svg" alt="Turbo Logo" className="w-6 h-6 mr-2" />{" "}
            CreateForm
          </span>
        ),
      }}
    >
      <div className="p-4 flex flex-col items-center justify-center text-center flex-1">
        <HomeContent />
      </div>
    </HomeLayout>
  );
}
