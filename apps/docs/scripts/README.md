# Changelog Generation Script

This directory contains scripts for automatically generating documentation content.

## generate-changelog.js

This script parses the root `changelog.md` file and generates the corresponding MDX file for the documentation site.

### How it works

1. Reads the `changelog.md` file from the project root
2. Parses the markdown content to extract version information, dates, and changes
3. Handles code blocks properly to preserve formatting
4. Generates an MDX file with the `<Updates>` and `<Update>` components used by the documentation site

### Usage

The script is automatically run during the build process via npm scripts:

```bash
npm run generate-changelog
```

It's also integrated into the `dev` and `build` scripts, so it runs automatically when you start the development server or build the project.

### File Structure

- **Input**: `/changelog.md` (project root)
- **Output**: `/apps/docs/content/docs/changelog/index.mdx`

### Features

- Preserves code blocks with proper formatting
- Handles multiple sections per version (Changed, Added, Removed, etc.)
- Maintains proper MDX structure for the documentation site
- Automatically runs during development and build processes
