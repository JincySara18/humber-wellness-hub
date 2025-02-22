import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ResumeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/resources">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-2 h-6 w-6" />
              Resume Writing Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>Creating an Effective Resume</h2>
            
            <h3>1. Contact Information</h3>
            <p>Include your:</p>
            <ul>
              <li>Full name</li>
              <li>Professional email address</li>
              <li>Phone number</li>
              <li>LinkedIn profile (optional)</li>
            </ul>

            <h3>2. Professional Summary</h3>
            <p>Write a brief overview of your key qualifications and career goals (2-3 sentences).</p>

            <h3>3. Education</h3>
            <p>List your educational background in reverse chronological order:</p>
            <ul>
              <li>Degree and major</li>
              <li>Institution name</li>
              <li>Graduation date (or expected)</li>
              <li>Relevant coursework</li>
              <li>GPA (if above 3.5)</li>
            </ul>

            <h3>4. Work Experience</h3>
            <p>For each position, include:</p>
            <ul>
              <li>Company name and location</li>
              <li>Your job title</li>
              <li>Employment dates</li>
              <li>Key responsibilities and achievements</li>
              <li>Quantifiable results when possible</li>
            </ul>

            <h3>5. Skills</h3>
            <p>List relevant skills for your target position:</p>
            <ul>
              <li>Technical skills</li>
              <li>Soft skills</li>
              <li>Language proficiencies</li>
              <li>Certifications</li>
            </ul>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-2">Pro Tips:</h3>
              <ul>
                <li>Keep your resume to 1-2 pages</li>
                <li>Use action verbs to describe your experiences</li>
                <li>Tailor your resume for each job application</li>
                <li>Proofread carefully for errors</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
