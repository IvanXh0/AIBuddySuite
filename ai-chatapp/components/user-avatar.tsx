import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar data-testid="user-avatar" className="h-8 w-8">
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
};
