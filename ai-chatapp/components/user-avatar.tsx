import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

export const UserAvatar = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
};
