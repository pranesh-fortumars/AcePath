"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripHorizontal, MoreHorizontal, Building2 } from "lucide-react";

export default function ApplicationTrackerPage() {
  const columns = [
    { id: "applied", title: "Applied", count: 3, color: "border-blue-500" },
    { id: "screening", title: "Screening", count: 2, color: "border-yellow-500" },
    { id: "interview", title: "Interview", count: 1, color: "border-purple-500" },
    { id: "offer", title: "Offer", count: 1, color: "border-green-500" },
    { id: "rejected", title: "Rejected", count: 4, color: "border-slate-500" },
  ];

  const applications = [
    { id: 1, company: "Google", role: "Senior Frontend Engineer", status: "interview", date: "Oct 12" },
    { id: 2, company: "Stripe", role: "Full Stack Developer", status: "screening", date: "Oct 14" },
    { id: 3, company: "Netflix", role: "UI Engineer", status: "applied", date: "Oct 15" },
    { id: 4, company: "Meta", role: "React Developer", status: "offer", date: "Oct 10", salary: "$180k" },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Application Tracker</h2>
          <p className="text-muted-foreground mt-1">Manage your job hunt pipeline with a visual Kanban board.</p>
        </div>
        <Button className="shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Add Application
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
            <div className={`flex items-center justify-between bg-card p-3 rounded-xl border-t-4 shadow-sm border-border/50 ${col.color}`}>
              <h3 className="font-semibold">{col.title}</h3>
              <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-bold text-muted-foreground">{col.count}</span>
            </div>
            
            <div className="flex-1 space-y-3">
              {applications.filter(app => app.status === col.id).map(app => (
                <Card key={app.id} className="p-4 cursor-grab hover:shadow-md transition-shadow border-border/50 bg-card group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-3 h-3 text-primary" />
                      </div>
                      {app.company}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium mb-3">{app.role}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Applied {app.date}</span>
                    {app.salary && <span className="font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded">{app.salary}</span>}
                  </div>
                </Card>
              ))}
              
              {/* Drop Zone Placeholder */}
              <button className="w-full h-24 border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
