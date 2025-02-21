import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MessageSquare, Calendar, BookOpen } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/chat">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  AI Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant answers to your questions from our AI counselor.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/appointments">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Schedule meetings with academic counselors.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access career guides and wellness resources.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students collaborating"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
