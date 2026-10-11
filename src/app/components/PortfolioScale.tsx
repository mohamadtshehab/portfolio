"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PortfolioScale({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={pathname === "/" ? "portfolio-scale" : undefined}>
      {children}
    </div>
  );
}
