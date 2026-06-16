"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ExperienceEditor() {
  const { experiences, addExperience, updateExperience, removeExperience, reorderExperiences } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = experiences.findIndex((exp) => exp.id === active.id);
      const newIndex = experiences.findIndex((exp) => exp.id === over.id);
      reorderExperiences(oldIndex, newIndex);
    }
  };

  const handleAdd = () => {
    addExperience({
      id: Date.now().toString(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between border-b pb-3 mb-4 border-border/50">
        <h3 className="font-semibold text-lg">Experience</h3>
        <Button size="sm" variant="ghost" className="h-8 text-primary" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border/50">
          No experience added yet.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <SortableExperienceItem
                  key={exp.id}
                  experience={exp}
                  update={updateExperience}
                  remove={removeExperience}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </Card>
  );
}

function SortableExperienceItem({ experience, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-muted/30 border border-border/50 rounded-lg p-4 relative group">
      <div className="absolute left-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="ml-6 space-y-3">
        <div className="flex justify-between gap-2">
          <input
            type="text"
            placeholder="Company"
            className="flex-1 h-9 px-3 rounded-md bg-background border border-border/50 text-sm font-medium"
            value={experience.company}
            onChange={(e) => update(experience.id, { company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="flex-1 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
            value={experience.role}
            onChange={(e) => update(experience.id, { role: e.target.value })}
          />
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10" onClick={() => remove(experience.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Start Date"
            className="w-1/2 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
            value={experience.startDate}
            onChange={(e) => update(experience.id, { startDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="End Date"
            className="w-1/2 h-9 px-3 rounded-md bg-background border border-border/50 text-sm"
            value={experience.endDate}
            onChange={(e) => update(experience.id, { endDate: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Description / Achievements"
          className="w-full min-h-[80px] p-3 rounded-md bg-background border border-border/50 text-sm resize-y"
          value={experience.description}
          onChange={(e) => update(experience.id, { description: e.target.value })}
        />
      </div>
    </div>
  );
}
