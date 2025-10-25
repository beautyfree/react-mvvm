import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  const { links, ...base } = baseOptions();

  return (
    <HomeLayout
      {...base}
      links={[
        ...(links ?? []),
        {
          text: "Docs",
          url: "/docs",
          active: "nested-url",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
