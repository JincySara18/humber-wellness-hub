import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function InterviewTipsPage() {
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
              Interview Preparation Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>Mastering Your Job Interview</h2>
            
            <h3>1. Before the Interview</h3>
            <ul>
              <li>Research the company thoroughly</li>
              <li>Review the job description and requirements</li>
              <li>Prepare relevant examples of your experience</li>
              <li>Practice common interview questions</li>
            </ul>

            <h3>2. Common Interview Questions</h3>
            <ul>
              <li>Tell me about yourself</li>
              <li>Why are you interested in this position?</li>
              <li>What are your strengths and weaknesses?</li>
              <li>Where do you see yourself in five years?</li>
            </ul>

            <h3>3. STAR Method for Answering Questions</h3>
            <p>Use the STAR method to structure your responses:</p>
            <ul>
              <li><strong>Situation:</strong> Set the context</li>
              <li><strong>Task:</strong> Describe your responsibility</li>
              <li><strong>Action:</strong> Explain what you did</li>
              <li><strong>Result:</strong> Share the outcome</li>
            </ul>

            <h3>4. Body Language and Presentation</h3>
            <ul>
              <li>Maintain good eye contact</li>
              <li>Practice good posture</li>
              <li>Dress professionally</li>
              <li>Arrive 10-15 minutes early</li>
            </ul>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-2">Interview Day Tips:</h3>
              <ul>
                <li>Bring extra copies of your resume</li>
                <li>Have questions prepared for the interviewer</li>
                <li>Take notes during the interview</li>
                <li>Send a thank-you email within 24 hours</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
