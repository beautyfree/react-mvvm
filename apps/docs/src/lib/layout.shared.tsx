import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Package } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "React MVVM",
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
  };
}
