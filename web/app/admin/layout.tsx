"use client";

import { SideBar, TopBar } from "@/components/admin";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  return (
    <main className="antialiased font-normal text-base text-color">
      <TopBar
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <SideBar isShowSidebar={isShowSidebar} />
      <div
        className={cn(
          "relative transition-all duration-500 ease-in-out p-6 mt-20",
          isShowSidebar ? "lg:ml-[18rem]" : ""
        )}
      >
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
