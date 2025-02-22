import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function StudySkillsPage() {
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
              Study Skills Workshop
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>Effective Study Techniques</h2>
            
            <h3>1. Time Management</h3>
            <p>Master your study schedule with these strategies:</p>
            <ul>
              <li>Create a weekly study schedule</li>
              <li>Use the Pomodoro Technique (25 minutes study, 5 minutes break)</li>
              <li>Set specific goals for each study session</li>
              <li>Prioritize tasks based on importance and deadlines</li>
            </ul>

            <h3>2. Active Learning Strategies</h3>
            <p>Enhance your understanding and retention:</p>
            <ul>
              <li>Summarize key concepts in your own words</li>
              <li>Create mind maps or concept diagrams</li>
              <li>Teach concepts to others</li>
              <li>Practice with sample problems</li>
            </ul>

            <h3>3. Note-Taking Techniques</h3>
            <p>Improve your note-taking skills:</p>
            <ul>
              <li>Cornell Method: Divide page into sections for notes, questions, and summary</li>
              <li>Mind Mapping: Create visual connections between concepts</li>
              <li>Outline Method: Organize information hierarchically</li>
              <li>Review and revise notes within 24 hours</li>
            </ul>

            <h3>4. Exam Preparation</h3>
            <p>Prepare effectively for tests:</p>
            <ul>
              <li>Start reviewing well in advance</li>
              <li>Create practice tests</li>
              <li>Form study groups</li>
              <li>Focus on understanding, not just memorization</li>
            </ul>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-2">Study Environment Tips:</h3>
              <ul>
                <li>Find a quiet, well-lit study space</li>
                <li>Minimize distractions (turn off phone notifications)</li>
                <li>Keep your study area organized</li>
                <li>Take regular breaks to maintain focus</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
