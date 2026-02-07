import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function CourseCard() {
  return (
    <Card className="h-full overflow-hidden p-0">
      <CardHeader className="relative block p-0">
        <AspectRatio ratio={1.268115942} className="overflow-hidden">
          <Image
            fill
            src={"/demo_course_img.jpeg"}
            alt={"product image"}
            className="block size-full object-cover object-center"
          />
        </AspectRatio>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-base font-semibold leading-snug line-clamp-2">
          Consulting Approach to Problem Solving
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Learn structured thinking and real-world problem solving techniques.
        </p>
        <div className="flex gap-3">
          <Badge className="bg-green-800">{"All Levels"}</Badge>
          <Badge className="bg-green-800">{"Free"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
