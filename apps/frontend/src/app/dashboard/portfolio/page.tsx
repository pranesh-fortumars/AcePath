"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Palette, UploadCloud, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export default function PortfolioGeneratorPage() {
  const [selectedTheme, setSelectedTheme] = useState("dark-minimal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const handlePublish = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPublishedUrl("https://johndoe.resumeai.pro");
      setIsGenerating(false);
    }, 2000);
  };

  const themes = [
    { id: "dark-minimal", name: "Dark Minimal", color: "bg-slate-900" },
    { id: "light-corporate", name: "Light Corporate", color: "bg-slate-100" },
    { id: "vibrant-tech", name: "Vibrant Tech", color: "bg-indigo-600" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Portfolio Generator</h2>
          <p className="text-muted-foreground mt-1">Transform your resume into a stunning personal website instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" /> Choose Theme
            </h3>
            <div className="space-y-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedTheme === theme.id 
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                      : "border-border/50 hover:bg-muted"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full shadow-inner ${theme.color}`} />
                  <span className="font-medium text-sm">{theme.name}</span>
                  {selectedTheme === theme.id && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-lg mb-2">Ready to go live?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We will extract your projects, experience, and skills to generate a fully responsive Next.js static site.
            </p>
            {!publishedUrl ? (
              <Button className="w-full shadow-lg" onClick={handlePublish} disabled={isGenerating}>
                {isGenerating ? "Generating Site..." : <><UploadCloud className="w-4 h-4 mr-2" /> Publish Portfolio</>}
              </Button>
            ) : (
              <div className="space-y-3 animate-in fade-in zoom-in duration-500">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Published Successfully!
                </div>
                <div className="flex gap-2">
                  <input type="text" readOnly value={publishedUrl} className="flex-1 px-3 rounded-md border border-border/50 bg-background text-sm" />
                  <Button variant="outline" size="icon" className="shrink-0"><LinkIcon className="w-4 h-4" /></Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Live Preview Pane */}
        <Card className="lg:col-span-2 overflow-hidden bg-slate-900 border-border/50 relative flex flex-col">
          <div className="h-12 border-b border-white/10 bg-black/40 flex items-center px-4 gap-2">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
               <div className="w-3 h-3 rounded-full bg-green-500/80" />
             </div>
             <div className="mx-auto px-6 py-1 rounded-md bg-white/5 text-xs text-white/50 flex items-center gap-2 font-mono">
               <Globe className="w-3 h-3" /> {publishedUrl || "preview.local"}
             </div>
          </div>
          
          <div className="flex-1 p-8 relative">
            <div className={`absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]`} />
            <div className={`w-full h-full rounded-lg shadow-2xl overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center p-8 text-center
              ${selectedTheme === 'dark-minimal' ? 'bg-black text-white' : ''}
              ${selectedTheme === 'light-corporate' ? 'bg-white text-slate-900' : ''}
              ${selectedTheme === 'vibrant-tech' ? 'bg-indigo-600 text-white' : ''}
            `}>
               <h1 className="text-4xl font-extrabold mb-4">John Doe</h1>
               <p className="text-lg opacity-80 max-w-md">Senior Software Engineer specializing in modern web architecture and artificial intelligence.</p>
               <div className="mt-8 flex gap-4">
                 <div className="px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm font-medium">Projects</div>
                 <div className="px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm font-medium">Experience</div>
               </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
