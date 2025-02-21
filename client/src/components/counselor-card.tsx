import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Counselor } from "@shared/schema";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={counselor.imageUrl} alt={counselor.name} />
        </Avatar>
        <div>
          <h3 className="font-semibold">{counselor.name}</h3>
          <p className="text-sm text-muted-foreground">{counselor.specialization}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Available on:</p>
        <p className="text-sm text-muted-foreground">{counselor.availability}</p>
      </CardContent>
    </Card>
  );
}
