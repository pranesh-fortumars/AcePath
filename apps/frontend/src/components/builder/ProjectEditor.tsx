"use client";

import { useResumeStore, Project } from "@/store/useResumeStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2, Code } from "lucide-react";

export function ProjectEditor() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();

  const handleAdd = () => {
    addProject({
      id: Date.now().toString(),
      projectName: "",
      role: "",
      technologies: "",
      description: "",
      link: ""
    });
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between border-b pb-3 mb-4 border-border/50">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" /> Projects
        </h3>
        <Button size="sm" variant="ghost" className="h-8 text-primary" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border/50">
          No projects added yet. Showcase your technical depth!
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-muted/30 border border-border/50 rounded-lg p-4 relative group">
              <div className="absolute left-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="ml-6 space-y-3">
                <div className="flex justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="flex-1 h-9 px-3 rounded-md bg-background border border-border/50 text-sm font-medium"
                    value={proj.projectName}
                    onChange={(e) => updateProject(proj.id, { projectName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Your Role (e.g. Lead Dev)"
                    className="flex-1 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                  />
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10" onClick={() => removeProject(proj.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Technologies (e.g. React, Node.js, PostgreSQL)"
                    className="w-2/3 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
                    value={proj.technologies}
                    onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Live Link / GitHub"
                    className="w-1/3 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Objective, Challenges Solved, and Results Achieved"
                  className="w-full min-h-[80px] p-3 rounded-md bg-background border border-border/50 text-sm resize-y"
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
