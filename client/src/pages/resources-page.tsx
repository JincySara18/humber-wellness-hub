import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, GraduationCap, Heart } from "lucide-react";
import { Link } from "wouter";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Career Development",
      icon: GraduationCap,
      items: [
        { title: "Resume Writing Guide", link: "/resources/resume-guide" },
        { title: "Interview Preparation Tips", link: "/resources/interview-tips" },
        { title: "Job Search Strategies", link: "#" },
      ],
    },
    {
      category: "Academic Success",
      icon: BookOpen,
      items: [
        { title: "Study Skills Workshop", link: "/resources/study-skills" },
        { title: "Time Management Guide", link: "#" },
        { title: "Research Methods", link: "#" },
      ],
    },
    {
      category: "Mental Wellness",
      icon: Heart,
      items: [
        { title: "Stress Management", link: "#" },
        { title: "Mindfulness Techniques", link: "#" },
        { title: "Work-Life Balance", link: "#" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Student Resources</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <category.icon className="mr-2 h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.title}>
                      <Link href={item.link}>
                        <Button
                          variant="link"
                          className="text-left w-full justify-start"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {item.title}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Featured Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src="https://images.unsplash.com/photo-1605781231474-f60dea478e8a"
                  alt="Student studying"
                  className="rounded-lg w-full md:w-1/2 h-48 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Complete Guide to Academic Success
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive resource covering study techniques, time management,
                    and exam preparation strategies.
                  </p>
                  <Button>Download Guide</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}