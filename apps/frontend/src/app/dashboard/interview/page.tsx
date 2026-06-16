"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Video, VideoOff, MicOff, PlayCircle, StopCircle, Award, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MockInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    "Tell me about a time you had to optimize a slow-performing application. What was your approach?",
    "How do you handle disagreements with a senior engineer regarding system architecture?",
    "Explain the concept of microservices and when you would choose them over a monolith."
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mock Interview System</h2>
          <p className="text-muted-foreground mt-1">Practice with our AI Recruiter and receive real-time feedback.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Interview Progress</p>
            <p className="text-xs text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
        
        {/* Video & Controls Area */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 bg-black/95 border-border/50 overflow-hidden relative group rounded-2xl flex items-center justify-center">
            {videoEnabled ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
                {/* Simulated Camera Feed Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center">
                  <div className="text-center animate-pulse">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm font-medium">Camera Feed Active</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Camera is disabled</p>
              </div>
            )}

            {/* AI Waveform Overlay */}
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-primary" />
              <div className="flex gap-1 h-3 items-center">
                <div className="w-1 h-full bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-2/3 bg-primary rounded-full animate-pulse delay-75" />
                <div className="w-1 h-full bg-primary rounded-full animate-pulse delay-150" />
              </div>
              <span className="text-xs font-medium text-white ml-1">AI Recruiter</span>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500/20 text-red-500 px-3 py-1 rounded-full border border-red-500/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider">REC</span>
              </div>
            )}
          </Card>

          {/* Controls */}
          <div className="flex justify-center gap-4 py-2">
            <Button variant={videoEnabled ? "outline" : "destructive"} size="icon" className="w-12 h-12 rounded-full" onClick={() => setVideoEnabled(!videoEnabled)}>
              {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button variant={micEnabled ? "outline" : "destructive"} size="icon" className="w-12 h-12 rounded-full" onClick={() => setMicEnabled(!micEnabled)}>
              {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            
            <div className="w-px h-12 bg-border mx-2" />

            {!isRecording ? (
              <Button className="h-12 px-8 rounded-full shadow-lg shadow-primary/20" onClick={() => setIsRecording(true)}>
                <PlayCircle className="w-5 h-5 mr-2" /> Start Answer
              </Button>
            ) : (
              <Button variant="destructive" className="h-12 px-8 rounded-full shadow-lg shadow-destructive/20" onClick={() => setIsRecording(false)}>
                <StopCircle className="w-5 h-5 mr-2" /> Finish Answer
              </Button>
            )}
          </div>
        </div>

        {/* Question & Scorecard Area */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border-border/50 bg-primary/5 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Current Question</h3>
            <p className="text-lg font-medium leading-relaxed text-foreground">
              "{questions[currentQuestionIndex]}"
            </p>
          </Card>

          <Card className="p-6 flex-1 border-border/50 overflow-auto">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" /> Live Scorecard
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Confidence</span>
                  <span className="text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Clarity & Pace</span>
                  <span className="text-yellow-600">60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Suggestion: You are speaking a bit too quickly. Try to pace your words.</p>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Technical Accuracy</span>
                  <span className="text-primary">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
               <h4 className="text-sm font-semibold mb-3">Live Transcription</h4>
               <p className="text-sm text-muted-foreground italic bg-muted/30 p-3 rounded-lg border border-border/50">
                 {isRecording ? "Listening to your response..." : "Transcription will appear here when you start recording."}
               </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
