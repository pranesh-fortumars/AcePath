"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Loader2, Check } from "lucide-react";

interface CopilotProps {
  initialText: string;
  onApply: (text: string) => void;
}

export function CopilotAssistant({ initialText, onApply }: CopilotProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleRewrite = () => {
    setIsGenerating(true);
    // Simulating API call to OpenAI/Claude
    setTimeout(() => {
      setSuggestion("Spearheaded the development of a scalable Next.js application, improving load times by 45% and driving a 20% increase in user retention over 6 months.");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 mt-2">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-primary">AI Copilot</h4>
      </div>
      
      {!suggestion && !isGenerating && (
        <p className="text-sm text-muted-foreground mb-3">
          Want to make this bullet point sound more impactful for recruiters? Let AI rewrite it with metrics and strong action verbs.
        </p>
      )}

      {isGenerating && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Analyzing and rewriting...
        </div>
      )}

      {suggestion && !isGenerating && (
        <div className="mb-3">
          <div className="text-sm bg-white p-3 rounded-lg border border-primary/30 shadow-sm relative">
            <span className="text-xs font-bold text-primary absolute -top-2 left-3 bg-primary/10 px-2 rounded-full">Suggestion</span>
            <p className="mt-1 text-slate-700">{suggestion}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {!suggestion ? (
          <Button size="sm" onClick={handleRewrite} disabled={isGenerating} className="w-full shadow-sm">
            Rewrite with AI
          </Button>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => setSuggestion(null)} className="flex-1">
              Discard
            </Button>
            <Button size="sm" onClick={() => { onApply(suggestion); setSuggestion(null); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4 mr-1" /> Apply
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
