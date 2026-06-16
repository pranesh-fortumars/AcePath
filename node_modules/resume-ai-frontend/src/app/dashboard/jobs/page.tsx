"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileSearch, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function JobAnalyzerPage() {
  const [jdText, setJdText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults({
        matchScore: 82,
        matchedSkills: ["React", "TypeScript", "Node.js"],
        missingSkills: ["GraphQL", "Docker", "AWS"],
        suggestions: [
          "Highlight your experience with cloud deployments to match the AWS requirement.",
          "Add Docker to your skills section if you have experience with containerization."
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Description Analyzer</h2>
          <p className="text-muted-foreground mt-1">Paste a JD to see how well your resume matches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Input Section */}
        <Card className="p-6 flex flex-col shadow-sm border-border/50">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Briefcase className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Job Description</h3>
          </div>
          <textarea
            className="flex-1 w-full p-4 rounded-xl border border-border/50 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed"
            placeholder="Paste the job description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
          <Button 
            className="w-full mt-4 shadow-md" 
            onClick={handleAnalyze} 
            disabled={!jdText || isAnalyzing}
          >
            {isAnalyzing ? (
              <><Sparkles className="w-4 h-4 mr-2 animate-pulse" /> Analyzing Fit...</>
            ) : (
              <><FileSearch className="w-4 h-4 mr-2" /> Analyze Match</>
            )}
          </Button>
        </Card>

        {/* Results Section */}
        <Card className="p-6 bg-muted/20 border-border/50 relative overflow-hidden flex flex-col">
          {!results ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <Target className="w-16 h-16 mb-4" />
              <p>Analysis results will appear here</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/50">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Match Score</h4>
                  <span className="text-4xl font-extrabold text-primary">{results.matchScore}%</span>
                </div>
                <Progress value={results.matchScore} className="w-32 h-3" />
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3 text-green-600">
                  <CheckCircle2 className="w-4 h-4" /> Matched Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.matchedSkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-green-500/10 text-green-600 text-sm font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3 text-destructive">
                  <XCircle className="w-4 h-4" /> Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.missingSkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-semibold mb-3">AI Suggestions</h4>
                <ul className="space-y-2">
                  {results.suggestions.map((sug: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {sug}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
