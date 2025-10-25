import { notFound } from "next/navigation";
import { getLLMText, source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/[[...slug]]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  // Generate params but avoid conflicts by filtering out parent pages
  // that have children, since they would conflict with directory names
  const allParams = source.generateParams();
  const parentPages = new Set();

  // Find all parent pages (pages that have children)
  allParams.forEach((param) => {
    if (param.slug.length > 0) {
      const parentPath = param.slug.slice(0, -1);
      if (parentPath.length > 0) {
        parentPages.add(parentPath.join("/"));
      }
    }
  });

  // Filter out parent pages to avoid directory conflicts
  return allParams.filter((param) => {
    if (param.slug.length === 0) return true; // Keep root pages
    const currentPath = param.slug.join("/");
    return !parentPages.has(currentPath);
  });
}
