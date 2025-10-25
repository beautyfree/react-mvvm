#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outDir = join(__dirname, "../out");
const llmsMdxDir = join(outDir, "llms.mdx");
const docsDir = join(outDir, "docs");

function copyMdxFiles(sourceDir, targetDir, path = []) {
  if (!existsSync(sourceDir)) {
    return;
  }

  const items = readdirSync(sourceDir, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = join(sourceDir, item.name);
    const targetPath = join(targetDir, item.name);

    if (item.isDirectory()) {
      // Create target directory
      if (!existsSync(targetPath)) {
        mkdirSync(targetPath, { recursive: true });
      }

      // Recursively copy files
      copyMdxFiles(sourcePath, targetPath, [...path, item.name]);
    } else if (item.isFile()) {
      // Copy file and rename to .mdx
      const content = readFileSync(sourcePath, "utf8");
      const mdxPath = join(targetDir, `${item.name}.mdx`);

      // Ensure target directory exists
      const targetDirPath = dirname(mdxPath);
      if (!existsSync(targetDirPath)) {
        mkdirSync(targetDirPath, { recursive: true });
      }

      writeFileSync(mdxPath, content);
      console.log(`Copied ${sourcePath} -> ${mdxPath}`);
    }
  }
}

// Copy files from llms.mdx to docs with .mdx extension
console.log("Copying MDX files for static export...");
copyMdxFiles(llmsMdxDir, docsDir);
console.log("MDX files copied successfully!");
