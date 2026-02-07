import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BiohazardIcon, MapPin, Phone } from "lucide-react";
import { TStudent } from "@/types/student";
import { UpdateProfileModal } from "./UpdateProfileModal";

type StudentCardProps = {
  student: TStudent;
};

export default function StudentProfileCard({ student }: StudentCardProps) {
  const { name, bio, phone, address, profilePhoto, user } = student;

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profilePhoto || ""} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CardTitle className="text-lg">
            Name: {name || "Not Available"}
          </CardTitle>
          <Badge variant="secondary" className="mt-1">
            Role: {user.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <BiohazardIcon />
          <span> Bio: {bio || "Not Available"}</span>{" "}
        </p>

        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>Phone: {phone || "Not Available"}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>Address: {address || "Not Available"}</span>
        </div>
      </CardContent>
      <div className="h-7/12">
        <UpdateProfileModal />
      </div>
    </Card>
  );
}
