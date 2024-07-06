import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { User as UserIcon } from "lucide-react";
import { useQueryClient } from "react-query";
import { User } from "@/types/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog } from "../ui/dialog";
import { useState } from "react";

const UserAvatar = ({ data }: { data: User }) => {
  
  return (
    <Avatar>
      <AvatarImage src={data.avatar_url} alt={data.name} />
      <AvatarFallback>{data.name}</AvatarFallback>
    </Avatar>
  );
};

const UserMenu = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryState<User>(["user"]);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  if (!user?.data) return <>Not found</>;
  const { data } = user;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full border-0">
          <UserAvatar data={data} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hi, {data.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsUserSettingsOpen((prev) => !prev);
            }}
          >
            <UserIcon className="w-4 h-4 mr-2" /> Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={isUserSettingsOpen}
        onOpenChange={setIsUserSettingsOpen}
        defaultOpen={isUserSettingsOpen}
      >
      </Dialog>
    </>
  );
};

export default UserMenu;
