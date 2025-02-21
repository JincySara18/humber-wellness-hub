import natural from 'natural';
import nlp from 'compromise';

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier with common student queries
function trainClassifier() {
  // Academic Planning
  classifier.addDocument('How do I choose my courses?', 'academic');
  classifier.addDocument('What classes should I take next semester?', 'academic');
  classifier.addDocument('Can you help me plan my schedule?', 'academic');
  
  // Career Guidance
  classifier.addDocument('How do I write a resume?', 'career');
  classifier.addDocument('What jobs can I get with my degree?', 'career');
  classifier.addDocument('How do I prepare for interviews?', 'career');
  
  // Wellness Support
  classifier.addDocument('I feel stressed about exams', 'wellness');
  classifier.addDocument('How can I manage my anxiety?', 'wellness');
  classifier.addDocument('I need help balancing work and study', 'wellness');
  
  classifier.train();
}

trainClassifier();

// Response templates
const responses = {
  academic: [
    "For course selection, I recommend reviewing your program requirements and consulting with your academic advisor. Some tips:\n" +
    "• Focus on prerequisites for your desired specialization\n" +
    "• Balance your workload across semesters\n" +
    "• Consider your strengths and interests",
    
    "When planning your academic schedule, consider:\n" +
    "• Core requirements for your program\n" +
    "• Course availability and timing\n" +
    "• Your preferred learning style and workload capacity"
  ],
  career: [
    "For career development, here are some key steps:\n" +
    "• Update your resume with relevant coursework and projects\n" +
    "• Network with professionals in your field\n" +
    "• Visit the career center for personalized guidance",
    
    "To enhance your career prospects:\n" +
    "• Gain practical experience through internships\n" +
    "• Develop relevant technical and soft skills\n" +
    "• Attend career fairs and industry events"
  ],
  wellness: [
    "Here are some wellness tips:\n" +
    "• Maintain a balanced schedule\n" +
    "• Practice regular self-care\n" +
    "• Don't hesitate to seek professional support\n" +
    "Remember, Humber's counseling services are here to help.",
    
    "To manage academic stress:\n" +
    "• Break tasks into smaller, manageable parts\n" +
    "• Take regular breaks\n" +
    "• Maintain healthy sleep habits\n" +
    "Consider booking an appointment with our wellness counselors."
  ]
};

function getRandomResponse(category: string): string {
  const categoryResponses = responses[category as keyof typeof responses];
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  return categoryResponses[randomIndex];
}

function preprocessMessage(message: string): string {
  const doc = nlp(message);
  doc.normalize();
  return doc.text();
}

export async function getChatbotResponse(message: string): Promise<string> {
  try {
    // Preprocess the message
    const processedMessage = preprocessMessage(message);
    
    // Classify the message
    const category = classifier.classify(processedMessage);
    
    // Get appropriate response
    const response = getRandomResponse(category);
    
    // If message seems to indicate severe distress, add emergency resources
    const doc = nlp(processedMessage);
    if (doc.match('(depressed|suicidal|crisis|emergency)').found) {
      return response + "\n\nIf you're experiencing a crisis, please contact:\n" +
        "• Humber's 24/7 Crisis Line: XXX-XXX-XXXX\n" +
        "• Book an urgent counseling appointment\n" +
        "• Visit the Student Wellness Center";
    }
    
    return response;
  } catch (error) {
    console.error('NLP Error:', error);
    return "I apologize, but I'm having trouble understanding your message. " +
           "Please try rephrasing or consider booking an appointment with one of our counselors.";
  }
}
