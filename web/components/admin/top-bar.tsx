import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ModeToggle } from "@/components/shared";
import { UserButton } from "../shared/user-button";

interface TopBarProps {
  isShowSidebar: boolean;
  setIsShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar = ({ isShowSidebar, setIsShowSidebar }: TopBarProps) => {
  return (
    <div className="fixed top-0 inset-x-0 p-6 transition-all duration-500 ease-in-out">
      <div
        className={cn(
          "h-14 transition-all duration-500 ease-in-out shadow-md px-4 bg-slate-100",
          isShowSidebar ? "lg:ml-[16rem]" : ""
        )}
      >
        <div className="flex justify-between items-center h-full transition-all duration-500 ease-in-out">
          <Button
            onClick={() => setIsShowSidebar((pre) => !pre)}
            variant="link"
            className="p-1"
          >
            <Bars3Icon className="h-8 w-8 stroke-1" />
          </Button>
          <div className="flex gap-x-4 justify-between items-center mr-2">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};
