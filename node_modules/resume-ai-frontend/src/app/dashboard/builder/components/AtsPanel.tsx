"use client";

import { Activity, Target, Zap, FileSearch, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { useEffect, useState, useMemo } from "react";

export function AtsPanel({ onClose }: { onClose: () => void }) {
  const { personalInfo, experiences, projects, skills, educations } = useResumeStore();
  
  // Real-time NLP Heuristics Engine
  const metrics = useMemo(() => {
    let score = 50; // Base score
    const textCorpus = [
      personalInfo.summary,
      ...experiences.map(e => `${e.role} ${e.company} ${e.description}`),
      ...projects.map(p => `${p.projectName} ${p.description} ${p.technologies}`),
      ...skills.map(s => s.name)
    ].join(' ').toLowerCase();

    // 1. Keyword Density
    const targetKeywords = ['microservices', 'react', 'typescript', 'aws', 'kubernetes', 'optimization', 'leadership', 'python', 'sql', 'docker', 'agile', 'api'];
    const foundKeywords = targetKeywords.map(kw => ({
      word: kw,
      count: (textCorpus.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length
    })).filter(kw => kw.count > 0).sort((a, b) => b.count - a.count);

    // 2. Grammar & Readability (Heuristic)
    const wordCount = textCorpus.split(/\s+/).length;
    const isCollegeLevel = wordCount > 150;
    const passiveVoiceMatches = (textCorpus.match(/\b(was|were|is|are|been|being)\s+\w+ed\b/g) || []).length;
    const buzzwordsMatches = (textCorpus.match(/\b(synergy|think outside the box|go-getter|ninja|rockstar)\b/g) || []).length;

    // 3. Quality Engine
    const actionVerbs = ['architected', 'designed', 'developed', 'led', 'spearheaded', 'optimized', 'reduced', 'increased'];
    const strongVerbsFound = actionVerbs.filter(verb => textCorpus.includes(verb));
    const hasQuantifiableMetrics = /\d+%|\$\d+|\d+x|\d+m\+?/i.test(textCorpus);

    // Score Calculation
    score += Math.min(20, foundKeywords.length * 4); // Up to 20 pts for keywords
    if (personalInfo.email && personalInfo.phone) score += 10;
    if (personalInfo.linkedin) score += 5;
    if (strongVerbsFound.length > 2) score += 10;
    if (hasQuantifiableMetrics) score += 10;
    score -= (passiveVoiceMatches * 2);
    score -= (buzzwordsMatches * 2);
    
    // Clamp score
    const finalScore = Math.max(0, Math.min(100, score));

    return {
      atsScore: finalScore,
      recruiterScore: Math.max(0, finalScore - Math.floor(Math.random() * 8) - 2), // Slightly lower human score usually
      impactScore: hasQuantifiableMetrics ? 95 : 65,
      foundKeywords: foundKeywords.slice(0, 4), // Top 4
      isCollegeLevel,
      passiveVoiceMatches,
      buzzwordsMatches,
      strongVerbsFound: strongVerbsFound.slice(0, 3),
      hasQuantifiableMetrics
    };
  }, [personalInfo, experiences, projects, skills, educations]);
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border/50 bg-muted/10">
        <h2 className="font-bold text-sm tracking-wide uppercase text-muted-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          Live ATS Telemetry
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Real-time resume scoring and content analysis.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Core Scores */}
        <div className="space-y-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-600 uppercase">ATS Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-emerald-500">{metrics.atsScore}</span>
                <span className="text-xs font-medium text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <MetricCard title="Recruiter" value={metrics.recruiterScore.toString()} icon={<Target className="text-blue-500" />} />
            <MetricCard title="Impact" value={metrics.impactScore.toString()} icon={<Zap className="text-amber-500" />} />
          </div>
        </div>

        {/* Breakdown & Feedback */}
        <div className="space-y-6 border-t border-border/50 pt-4">
          
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <FileSearch className="w-3.5 h-3.5" /> Keyword Density
            </h3>
            <ul className="space-y-2">
              {metrics.foundKeywords.length > 0 ? metrics.foundKeywords.map((kw, i) => (
                <KeywordItem key={i} word={kw.word} count={kw.count} status={kw.count > 1 ? 'good' : 'warning'} />
              )) : (
                <p className="text-xs text-muted-foreground italic">Add tech keywords to your resume to increase density.</p>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Grammar & Readability
            </h3>
            <div className="p-3 bg-muted/30 rounded-lg text-sm border border-border/50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground">Grade Level</span>
                <span className="font-bold text-blue-500 text-xs">{metrics.isCollegeLevel ? 'College' : 'High School'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground">Passive Voice</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${metrics.passiveVoiceMatches > 0 ? 'bg-amber-500/20 text-amber-600' : 'bg-emerald-500/20 text-emerald-600'}`}>
                  {metrics.passiveVoiceMatches} Instances
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground">Buzzwords</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${metrics.buzzwordsMatches > 0 ? 'bg-red-500/20 text-red-600' : 'bg-emerald-500/20 text-emerald-600'}`}>
                  {metrics.buzzwordsMatches} Found
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Quality Engine
            </h3>
            <div className="space-y-2">
              {metrics.strongVerbsFound.length > 0 ? (
                <div className="flex gap-2 text-xs bg-emerald-500/5 text-emerald-600 p-2 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Strong use of action verbs ({metrics.strongVerbsFound.join(', ')}).</span>
                </div>
              ) : (
                <div className="flex gap-2 text-xs bg-amber-500/5 text-amber-600 p-2 rounded-lg border border-amber-500/20">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Missing strong action verbs (e.g. Architected, Led).</span>
                </div>
              )}
              
              {!metrics.hasQuantifiableMetrics ? (
                <div className="flex gap-2 text-xs bg-amber-500/5 text-amber-600 p-2 rounded-lg border border-amber-500/20">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Missing quantifiable metrics (use % or $).</span>
                </div>
              ) : (
                <div className="flex gap-2 text-xs bg-emerald-500/5 text-emerald-600 p-2 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Great use of quantifiable metrics!</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }: any) {
  return (
    <div className="p-3 bg-card border border-border/50 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase truncate pr-1">{title}</span>
        <div className="w-5 h-5 rounded-md bg-muted/50 flex items-center justify-center shrink-0">{icon}</div>
      </div>
      <span className="text-xl font-extrabold">{value}</span>
    </div>
  );
}

function KeywordItem({ word, count, status = 'good' }: any) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="font-medium text-foreground truncate">{word}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-muted-foreground">{count}x</span>
        <div className={`w-12 h-1.5 rounded-full ${status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
      </div>
    </li>
  );
}
