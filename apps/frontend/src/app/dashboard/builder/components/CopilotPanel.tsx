"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { 
  Bot, Sparkles, Wand2, Target, Briefcase, 
  GraduationCap, MessageSquare, Zap, CheckCircle2 
} from "lucide-react";
import { motion } from "framer-motion";

export function CopilotPanel() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const handleAiAction = (action: string) => {
    if (!inputText) return;
    setIsProcessing(true);
    
    // Simulate AI Latency
    setTimeout(() => {
      let result = "";
      if (action === "quantify") {
        result = "Designed and implemented scalable backend services supporting over 100,000 requests daily while reducing API response time by 38%.";
      } else if (action === "executive") {
        result = "Spearheaded enterprise-wide digital transformation initiatives, optimizing core infrastructure to deliver a 38% reduction in latency and supporting robust 100k+ daily transaction volumes.";
      } else {
        result = "Optimized backend microservices to handle 100k+ daily requests, improving overall system latency by 38% through aggressive caching.";
      }
      setSuggestion(result);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border/50 bg-muted/10">
        <h2 className="font-bold text-sm tracking-wide uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          AI Writing Copilot
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Select text or type below to generate optimized bullet points.</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Input Text</label>
          <Textarea 
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            placeholder="e.g. Worked on backend."
            className="min-h-[100px] text-sm resize-none bg-muted/50 border-border/50 focus-visible:ring-purple-500"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase">Transformations</label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAiAction('improve')} className="justify-start gap-2 h-9 text-xs" disabled={isProcessing || !inputText}>
              <Wand2 className="w-3.5 h-3.5 text-blue-500" /> Improve
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAiAction('quantify')} className="justify-start gap-2 h-9 text-xs" disabled={isProcessing || !inputText}>
              <Target className="w-3.5 h-3.5 text-emerald-500" /> Quantify Impact
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAiAction('executive')} className="justify-start gap-2 h-9 text-xs" disabled={isProcessing || !inputText}>
              <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Executive Tone
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAiAction('technical')} className="justify-start gap-2 h-9 text-xs" disabled={isProcessing || !inputText}>
              <Zap className="w-3.5 h-3.5 text-cyan-500" /> Technical Tone
            </Button>
          </div>
        </div>

        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground animate-pulse gap-2">
            <Bot className="w-8 h-8 text-purple-500" />
            <p className="text-sm font-medium">Generating optimizations...</p>
          </div>
        )}

        {suggestion && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> AI Suggestion
            </label>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-foreground leading-relaxed relative group">
              {suggestion}
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background shadow-md rounded-md border border-border/50 p-1">
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-emerald-500">Accept</Button>
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-red-500" onClick={() => setSuggestion("")}>Reject</Button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
