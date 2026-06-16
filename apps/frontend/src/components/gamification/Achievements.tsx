"use client";

import { Card } from "@/components/ui/card";
import { Award, Flame, Star, Trophy, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Achievements() {
  const badges = [
    { icon: <Trophy className="w-5 h-5 text-yellow-500" />, name: "Profile Master", desc: "Achieved 100% profile completion.", unlocked: true },
    { icon: <Target className="w-5 h-5 text-blue-500" />, name: "ATS Conqueror", desc: "Scored 90+ on the ATS Analyzer.", unlocked: true },
    { icon: <Star className="w-5 h-5 text-purple-500" />, name: "Top Talent", desc: "Received an interview offer.", unlocked: false },
  ];

  return (
    <Card className="p-6 col-span-1 md:col-span-1 border-border/50 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -z-10" />
      
      <div className="flex items-center justify-between border-b pb-4 border-border/50 mb-4">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" /> Achievements
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Level 4 Candidate</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm font-bold border border-orange-500/20">
          <Flame className="w-4 h-4" /> 7 Day Streak
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
            <span>2,400 XP</span>
            <span>3,000 XP (Level 5)</span>
          </div>
          <Progress value={80} className="h-2 bg-muted/50 [&>div]:bg-orange-500" />
        </div>

        <div className="space-y-3 mt-6">
          {badges.map((badge) => (
            <div key={badge.name} className={`flex items-center gap-3 p-3 rounded-lg border ${badge.unlocked ? 'bg-background border-border/50' : 'bg-muted/30 border-dashed border-border/50 opacity-60 grayscale'}`}>
              <div className={`p-2 rounded-full ${badge.unlocked ? 'bg-muted' : 'bg-transparent'}`}>
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
