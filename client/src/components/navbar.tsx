import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MessageSquare, Calendar, BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-primary">Humber Wellness Hub</a>
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <Link href="/chat">
                  <Button variant="ghost" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/appointments">
                  <Button variant="ghost" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Appointments
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources">
                  <Button variant="ghost" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="flex items-center"
                  onClick={() => logoutMutation.mutate()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
