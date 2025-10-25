"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import logoInverted from "@/assets/logo-inverted.png";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div style={{ width: 40, height: 40 }} />
        {title}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        src={theme === "dark" ? logo : logoInverted}
        alt={title}
        width={40}
        height={40}
      />
      {title}
    </div>
  );
}
