import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MessageSquare, Calendar, BookOpen, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/appointments", icon: Calendar, label: "Appointments" },
    { href: "/resources", icon: BookOpen, label: "Resources" },
  ];

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={`flex items-center ${mobile ? 'w-full justify-start' : ''}`}
            onClick={onItemClick}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className={`flex items-center ${mobile ? 'w-full justify-start' : ''}`}
        onClick={() => {
          logoutMutation.mutate();
          onItemClick();
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </>
  );

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-primary">Humber Wellness Hub</a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px]">
              <div className="flex flex-col space-y-4 mt-6">
                <NavLinks mobile onItemClick={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}