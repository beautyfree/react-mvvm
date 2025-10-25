import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  const { links, ...base } = baseOptions();

  return (
    <HomeLayout
      {...base}
      className="landing-page"
      links={[
        ...(links ?? []),
        {
          text: "Docs",
          url: "/docs/getting-started",
        },
      ]}
      themeSwitch={{
        component: <ThemeToggle />,
      }}
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
