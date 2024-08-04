"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared";
import { sidebarLinks } from "@/constants";

interface SideBarProps {
  isShowSidebar: boolean;
}

export const SideBar = ({ isShowSidebar }: SideBarProps) => {
  const pathname = usePathname();

  return (
    <section
      className={cn(
        "fixed left-0 inset-y-0 h-screen w-full max-w-[16rem] shadow-xl shadow-blue-gray-900/5 bg-sidebar text-on-sidebar transition-all duration-500 ease-in-out",
        isShowSidebar ? "" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Logo />
        </div>
      </div>
      <nav className="flex flex-col gap-y-3 text-base font-normal mt-4 px-4">
        {sidebarLinks?.map((item, index) => {
          return <div>{item.label}</div>;
        })}
      </nav>
    </section>
  );
};
