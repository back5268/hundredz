import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/lib/actions";

export const UserButton = () => {
  const user = useCurrentUser();
  const onClick = () => logout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <span onClick={onClick} className="cursor-pointer">
          <DropdownMenuItem>
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
