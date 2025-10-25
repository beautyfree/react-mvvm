import { Github, Package } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between space-y-2 text-muted-foreground text-sm">
          <div className="flex items-center space-x-4">
            <Link
              className="flex items-center space-x-2 transition-colors hover:text-foreground"
              href="https://github.com/beautyfree/react-mvvm"
              rel="noopener"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link
              className="flex items-center space-x-2 transition-colors hover:text-foreground"
              href="https://www.npmjs.com/package/react-mvvm"
              rel="noopener"
              target="_blank"
            >
              <Package className="h-4 w-4" />
              <span>NPM Package</span>
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-1">
            <p>Copyright © 2022 Yoskutik</p>
            <p>Copyright © 2025 beautyfree</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
