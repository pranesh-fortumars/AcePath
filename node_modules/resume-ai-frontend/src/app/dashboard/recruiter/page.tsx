"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Briefcase, Plus, Users } from "lucide-react";

export default function RecruiterDashboardPage() {
  const candidates = [
    { id: 1, name: "Alice Chen", role: "Senior Frontend Engineer", match: 94, location: "Remote", experience: "6 yrs" },
    { id: 2, name: "Marcus Johnson", role: "Full Stack Developer", match: 88, location: "New York, NY", experience: "4 yrs" },
    { id: 3, name: "Sarah Williams", role: "React Developer", match: 82, location: "San Francisco, CA", experience: "3 yrs" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recruiter Portal</h2>
          <p className="text-muted-foreground mt-1">Discover top talent using AI-powered vector search matching.</p>
        </div>
        <Button className="shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Post a Job
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        
        {/* Filters Sidebar */}
        <Card className="p-5 flex flex-col gap-6 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2 border-b pb-3 border-border/50">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Smart Filters</h3>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Role / Keyword</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input type="text" className="w-full h-9 pl-9 pr-3 rounded-md border border-border/50 bg-background text-sm" placeholder="e.g. React Developer" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Minimum ATS Match</label>
            <input type="range" className="w-full accent-primary" min="0" max="100" defaultValue="80" />
            <div className="text-right text-xs text-muted-foreground">80%+</div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input type="text" className="w-full h-9 pl-9 pr-3 rounded-md border border-border/50 bg-background text-sm" placeholder="Anywhere" />
            </div>
          </div>

          <Button className="w-full mt-4">Search Talent</Button>
        </Card>

        {/* Candidate Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5" /> AI Recommended Candidates
            </h3>
            <span className="text-sm text-muted-foreground">Showing top 3 matches</span>
          </div>

          {candidates.map((candidate) => (
            <Card key={candidate.id} className="p-5 hover:border-primary/50 transition-colors cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{candidate.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {candidate.role}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {candidate.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-border/50">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Match</p>
                  <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-green-600">
                    {candidate.match}%
                  </div>
                </div>
                <Button variant="outline">View Resume</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
