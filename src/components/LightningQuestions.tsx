
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Bot, Crown } from "lucide-react";

const questionCategories = [
  {
    title: "Founder's Mindset",
    icon: Brain,
    color: "bg-purple-100 text-purple-800",
    questions: [
      {
        question: "What's a contrarian opinion you hold about our industry that most others disagree with?",
        purpose: "Checks visionary thinking and willingness to challenge status-quo."
      },
      {
        question: "Tell me about a time you had to create something from nothing.",
        purpose: "Reveals initiative and entrepreneurial drive – true founders have a story here."
      }
    ]
  },
  {
    title: "Execution Grit",
    icon: Zap,
    color: "bg-orange-100 text-orange-800",
    questions: [
      {
        question: "What's the hardest project you've ever seen through to completion, and what kept you going?",
        purpose: "Tests perseverance and passion – do they embrace tough challenges or avoid them?"
      },
      {
        question: "Have you ever failed to achieve a goal? What did you do next?",
        purpose: "Uncovers resilience and learning – a gritty person will own the failure and show growth."
      }
    ]
  },
  {
    title: "AI Leverage",
    icon: Bot,
    color: "bg-blue-100 text-blue-800",
    questions: [
      {
        question: "How have you used AI or automation in your work to get an edge?",
        purpose: "Assesses innovative thinking and adaptability to new tech. Look for specific examples, not just buzzwords."
      },
      {
        question: "If you had an AI assistant for a day, what problem would you have it solve for you?",
        purpose: "Gives insight into pain points they perceive and creativity in using new tools."
      }
    ]
  },
  {
    title: "Leadership Clarity",
    icon: Crown,
    color: "bg-green-100 text-green-800",
    questions: [
      {
        question: "What's the most unpopular decision you've made, and how did you communicate it?",
        purpose: "Shows whether they can lead through adversity and be transparent – great leaders stand by tough calls."
      },
      {
        question: "How would your former team describe your leadership style in one word? Why?",
        purpose: "Reveals self-awareness and whether they value clarity and communication."
      }
    ]
  }
];

export const LightningQuestions = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">⚡ Lightning Round Questions</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Quick hits to reveal character. These pointed questions cut through the fluff 
          and expose a candidate's true mindset and attitude.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {questionCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <Badge className={category.color}>
                    {category.questions.length} Questions
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-2">
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300">
                    <p className="font-medium text-slate-800 mb-2">"{q.question}"</p>
                    <p className="text-sm text-slate-600 italic">{q.purpose}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">Remember</h3>
            <p className="text-slate-600">
              The goal isn't to stump or trick the candidate, but to invite them to share something real. 
              Often, a surprised pause followed by a genuine, unrehearsed answer is where the gold is.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
