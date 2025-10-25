import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  const { nav, ...base } = baseOptions();

  return (
    <DocsLayout
      {...base}
      nav={{ ...nav, mode: "top" }}
      tabMode="navbar"
      tree={source.pageTree}
      themeSwitch={{
        component: <ThemeToggle />,
      }}
    >
      {children}
      <Footer />
    </DocsLayout>
  );
}
