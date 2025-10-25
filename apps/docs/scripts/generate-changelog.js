#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse changelog.md and generate index.mdx for the docs
 */
function generateChangelogMDX() {
  const changelogPath = path.join(__dirname, "../../../CHANGELOG.md");
  const outputPath = path.join(
    __dirname,
    "../content/docs/CHANGELOG/index.mdx",
  );

  // Read the CHANGELOG.md file
  const changelogContent = fs.readFileSync(changelogPath, "utf8");

  // Parse the changelog content
  const updates = parseChangelog(changelogContent);

  // Generate MDX content
  const mdxContent = generateMDXContent(updates);

  // Ensure the output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the generated MDX file
  fs.writeFileSync(outputPath, mdxContent);

  console.log("✅ Changelog MDX generated successfully");
}

/**
 * Parse the changelog markdown content
 */
function parseChangelog(content) {
  const updates = [];
  const lines = content.split("\n");

  let currentUpdate = null;
  let currentSection = null;
  let currentContent = [];
  let inCodeBlock = false;
  let codeBlockContent = [];

  for (const line of lines) {
    // Handle code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // Ending a code block
        inCodeBlock = false;
        codeBlockContent.push(line);
        // Add the entire code block as one item
        currentContent.push(codeBlockContent.join("\n"));
        codeBlockContent = [];
      } else {
        // Starting a code block
        inCodeBlock = true;
        codeBlockContent = [];
        // Add the opening line to code block
        codeBlockContent.push(line);
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Match version headers like "## [1.2.1] - 2023-01-08"
    const versionMatch = line.match(/^## \[([^\]]+)\] - (.+)$/);
    if (versionMatch) {
      // Save previous update if exists
      if (currentUpdate) {
        if (currentSection && currentContent.length > 0) {
          currentUpdate.sections[currentSection] = currentContent
            .join("\n")
            .trim();
        }
        updates.push(currentUpdate);
      }

      // Start new update
      currentUpdate = {
        version: versionMatch[1],
        date: versionMatch[2],
        sections: {},
      };
      currentSection = null;
      currentContent = [];
      continue;
    }

    // Match section headers like "### Changed", "### Added", etc.
    const sectionMatch = line.match(/^### (.+)$/);
    if (sectionMatch) {
      // Save previous section if exists
      if (currentUpdate && currentSection && currentContent.length > 0) {
        currentUpdate.sections[currentSection] = currentContent
          .join("\n")
          .trim();
      }

      currentSection = sectionMatch[1];
      currentContent = [];
      continue;
    }

    // Collect content for current section
    if (currentUpdate && currentSection && line.trim()) {
      // Remove markdown list markers and clean up
      const cleanedLine = line.replace(/^-\s*/, "").trim();
      if (cleanedLine) {
        currentContent.push(cleanedLine);
      }
    }
  }

  // Save the last update
  if (currentUpdate) {
    if (currentSection && currentContent.length > 0) {
      currentUpdate.sections[currentSection] = currentContent.join("\n").trim();
    }
    updates.push(currentUpdate);
  }

  return updates;
}

/**
 * Generate MDX content from parsed updates
 */
function generateMDXContent(updates) {
  const frontmatter = `---
title: Changelog
description: New updates and improvements
icon: History
---

<Updates>`;

  const updatesContent = updates
    .map((update) => {
      const label = `${update.version} - ${update.date}`;
      let content = `  <Update label="${label}">`;

      // Add sections
      for (const [sectionName, sectionContent] of Object.entries(
        update.sections,
      )) {
        content += `\n    ### ${sectionName} [!toc]\n\n`;

        // Process the content line by line
        const lines = sectionContent.split("\n");
        let inCodeBlock = false;

        for (const line of lines) {
          if (line.startsWith("```")) {
            if (inCodeBlock) {
              // Ending code block
              inCodeBlock = false;
              content += `    ${line}\n`;
            } else {
              // Starting code block
              inCodeBlock = true;
              content += `    ${line}\n`;
            }
          } else if (inCodeBlock) {
            // Inside code block, preserve formatting
            content += `    ${line}\n`;
          } else if (line.trim()) {
            // Regular text item
            content += `    * ${line}\n`;
          }
        }
      }

      content += "\n  </Update>";
      return content;
    })
    .join("\n\n");

  return `${frontmatter}
${updatesContent}
</Updates>`;
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateChangelogMDX();
}

export { generateChangelogMDX, parseChangelog, generateMDXContent };
