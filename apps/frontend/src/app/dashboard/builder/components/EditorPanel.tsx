"use client";

import { useResumeStore, ResumeSection } from "@/store/useResumeStore";

export function EditorPanel() {
  const { sections, personalInfo, experiences, projects, educations, skills, designConfig, setPersonalInfo, updateExperience, updateProject, updateEducation, updateSection } = useResumeStore();

  // Sort by order and filter visible
  const visibleSections = [...sections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  // Render logic for different section types
  const renderSectionContent = (section: ResumeSection) => {
    switch (section.type) {
      case 'PERSONAL_INFO':
        return (
          <div className="text-center pb-4 mb-4 border-b border-slate-300">
            <h1 
              className="text-4xl font-bold tracking-tight outline-none focus:bg-primary/5 rounded px-2 -mx-2 transition-colors" 
              style={{ color: designConfig.primaryColor, fontFamily: designConfig.fontFamily }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => setPersonalInfo({ fullName: e.currentTarget.textContent || "" })}
            >
              {personalInfo.fullName || "Jane Doe"}
            </h1>
            <p 
              className="text-lg text-slate-700 mt-1 outline-none focus:bg-primary/5 rounded px-2 -mx-2 transition-colors"
              contentEditable suppressContentEditableWarning
              onBlur={(e) => setPersonalInfo({ jobTitle: e.currentTarget.textContent || "" })}
            >
              {personalInfo.jobTitle || "Software Engineer"}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-2">
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ email: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 rounded px-1 transition-colors">{personalInfo.email || "jane@example.com"}</span>
              <span className="hidden sm:inline">•</span>
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ phone: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 rounded px-1 transition-colors">{personalInfo.phone || "+1 234 567 890"}</span>
              <span className="hidden sm:inline">•</span>
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ location: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 rounded px-1 transition-colors">{personalInfo.location || "New York, NY"}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-blue-600 mt-1">
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ linkedin: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 hover:underline rounded px-1 transition-colors">{personalInfo.linkedin || "linkedin.com/in/janedoe"}</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ github: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 hover:underline rounded px-1 transition-colors">{personalInfo.github || "github.com/janedoe"}</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span contentEditable suppressContentEditableWarning onBlur={e => setPersonalInfo({ portfolioUrl: e.currentTarget.textContent || "" })} className="outline-none focus:bg-primary/5 hover:underline rounded px-1 transition-colors">{personalInfo.portfolioUrl || "janedoe.com"}</span>
            </div>
          </div>
        );

      case 'SUMMARY':
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <p 
              className="text-sm text-slate-700 leading-relaxed outline-none focus:bg-primary/5 rounded p-1 -mx-1"
              contentEditable suppressContentEditableWarning
              onBlur={(e) => setPersonalInfo({ summary: e.currentTarget.textContent || "" })}
            >
              {personalInfo.summary || "A passionate professional with extensive experience in the industry. Track record of delivering high-quality solutions and driving business growth through technical innovation."}
            </p>
          </div>
        );

      case 'EXPERIENCE':
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <div className="space-y-4">
              {experiences.length > 0 ? experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 outline-none focus:bg-primary/5 px-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateExperience(exp.id, { role: e.currentTarget.textContent || "" })}>{exp.role}</h3>
                    <div className="text-sm font-medium text-slate-500 outline-none focus:bg-primary/5 px-1 rounded flex gap-1">
                      <span contentEditable suppressContentEditableWarning onBlur={e => updateExperience(exp.id, { startDate: e.currentTarget.textContent || "" })}>{exp.startDate || 'YYYY'}</span>
                      <span>-</span>
                      <span contentEditable suppressContentEditableWarning onBlur={e => updateExperience(exp.id, { endDate: e.currentTarget.textContent || "" })}>{exp.endDate || 'Present'}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1 outline-none focus:bg-primary/5 px-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateExperience(exp.id, { company: e.currentTarget.textContent || "" })}>{exp.company}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap outline-none focus:bg-primary/5 p-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateExperience(exp.id, { description: e.currentTarget.textContent || "" })}>{exp.description}</p>
                </div>
              )) : (
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">Senior Software Engineer</h3>
                    <span className="text-sm font-medium text-slate-500">2021 - Present</span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1">Tech Innovations Inc.</p>
                  <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                    <li contentEditable suppressContentEditableWarning className="outline-none focus:bg-primary/5 px-1 rounded">Architected scalable microservices supporting 1M+ daily active users.</li>
                    <li contentEditable suppressContentEditableWarning className="outline-none focus:bg-primary/5 px-1 rounded">Reduced latency by 45% through aggressive caching strategies.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case 'PROJECTS':
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <div className="space-y-4">
              {projects.length > 0 ? projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 outline-none focus:bg-primary/5 px-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateProject(proj.id, { projectName: e.currentTarget.textContent || "" })}>{proj.projectName}</h3>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1 outline-none focus:bg-primary/5 px-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateProject(proj.id, { technologies: e.currentTarget.textContent || "" })}>Technologies: {proj.technologies}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap outline-none focus:bg-primary/5 p-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateProject(proj.id, { description: e.currentTarget.textContent || "" })}>{proj.description}</p>
                </div>
              )) : (
                <p className="text-sm text-slate-600 italic">No projects added yet.</p>
              )}
            </div>
          </div>
        );

      case 'EDUCATION':
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <div className="space-y-4">
              {educations.length > 0 ? educations.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 outline-none focus:bg-primary/5 px-1 -ml-1 rounded">
                      <span contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { degree: e.currentTarget.textContent || "" })}>{edu.degree}</span> in <span contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { fieldOfStudy: e.currentTarget.textContent || "" })}>{edu.fieldOfStudy}</span>
                    </h3>
                    <p className="text-sm text-slate-700 outline-none focus:bg-primary/5 px-1 -ml-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { institution: e.currentTarget.textContent || "" })}>{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-500 outline-none focus:bg-primary/5 px-1 rounded flex justify-end gap-1">
                      <span contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { startDate: e.currentTarget.textContent || "" })}>{edu.startDate}</span>
                      <span>-</span>
                      <span contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { endDate: e.currentTarget.textContent || "" })}>{edu.endDate}</span>
                    </p>
                    {edu.gpa && <p className="text-sm text-slate-500 outline-none focus:bg-primary/5 px-1 rounded" contentEditable suppressContentEditableWarning onBlur={e => updateEducation(edu.id, { gpa: e.currentTarget.textContent || "" })}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              )) : (
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">B.S. Computer Science</h3>
                    <p className="text-sm text-slate-700">University of Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-500">2016 - 2020</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'SKILLS':
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed outline-none focus:bg-primary/5 rounded p-1 -mx-1" contentEditable suppressContentEditableWarning>
              {skills.length > 0 ? skills.map(s => s.name).join(', ') : "JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker"}
            </p>
          </div>
        );

      default:
        return (
          <div className="mb-4">
            <h2 
              className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1 outline-none focus:bg-primary/5 rounded px-1 -mx-1" 
              style={{ color: designConfig.primaryColor }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => updateSection(section.id, { title: e.currentTarget.textContent || "" })}
            >
              {section.title}
            </h2>
            <div 
              className="min-h-[40px] text-sm text-slate-600 p-2 rounded outline-none focus:bg-primary/5 hover:bg-slate-50 transition-colors cursor-text"
              contentEditable suppressContentEditableWarning
            >
              Start typing content for {section.title}...
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-muted/10 relative">
      <div className="flex justify-center p-8 min-w-max">
        
        {/* A4 Paper Container */}
        <div 
          className="bg-white shadow-2xl shadow-black/10 rounded-sm p-12 shrink-0 relative transition-all duration-300"
          style={{
            width: '210mm',
            minHeight: '297mm',
            fontFamily: designConfig.fontFamily
          }}
        >
          {visibleSections.map(section => (
            <div key={section.id} className="group relative">
              {renderSectionContent(section)}
              
              {/* Context Menu Overlay */}
              <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                {/* Visual indicator of hover block */}
                <div className="w-1 h-full bg-primary/20 absolute -right-2 top-0 bottom-0 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
