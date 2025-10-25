import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Package } from "lucide-react";
// import Title from "@/components/Title";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const Title = dynamic(() => import("@/components/Title"));

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Title title="React MVVM" />,
    },
    githubUrl: "https://github.com/beautyfree/react-mvvm",
    links: [
      {
        type: "icon",
        icon: <Package />,
        text: "NPM Package",
        url: "https://www.npmjs.com/package/react-mvvm",
      },
    ],
    themeSwitch: {
      component: <ThemeToggle />,
    },
  };
}
