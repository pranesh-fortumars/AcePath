"use client";

import { useResumeStore, ResumeSection } from "@/store/useResumeStore";

export function EditorPanel() {
  const { sections, personalInfo, experiences, projects, educations, skills, designConfig } = useResumeStore();

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
            <h1 className="text-4xl font-bold tracking-tight" style={{ color: designConfig.primaryColor, fontFamily: designConfig.fontFamily }}>
              {personalInfo.fullName || "Jane Doe"}
            </h1>
            <p className="text-lg text-slate-700 mt-1">{personalInfo.jobTitle || "Software Engineer"}</p>
            <div className="flex justify-center gap-4 text-sm text-slate-500 mt-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• LinkedIn</span>}
            </div>
          </div>
        );

      case 'SUMMARY':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {personalInfo.summary || "A passionate professional with extensive experience in the industry. Track record of delivering high-quality solutions and driving business growth through technical innovation."}
            </p>
          </div>
        );

      case 'EXPERIENCE':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <div className="space-y-4">
              {experiences.length > 0 ? experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1">{exp.company}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              )) : (
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">Senior Software Engineer</h3>
                    <span className="text-sm font-medium text-slate-500">2021 - Present</span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1">Tech Innovations Inc.</p>
                  <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                    <li>Architected scalable microservices supporting 1M+ daily active users.</li>
                    <li>Reduced latency by 45% through aggressive caching strategies.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case 'PROJECTS':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <div className="space-y-4">
              {projects.length > 0 ? projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{proj.projectName}</h3>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1">Technologies: {proj.technologies}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{proj.description}</p>
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
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <div className="space-y-4">
              {educations.length > 0 ? educations.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-sm text-slate-700">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-500">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p className="text-sm text-slate-500">GPA: {edu.gpa}</p>}
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
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {skills.length > 0 ? skills.map(s => s.name).join(', ') : "JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker"}
            </p>
          </div>
        );

      default:
        return (
          <div className="mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-900 mb-2 pb-1" style={{ color: designConfig.primaryColor }}>
              {section.title}
            </h2>
            <div className="min-h-[40px] text-sm text-slate-400 italic border border-dashed border-slate-300 p-2 rounded">
              Content for {section.type}... (Editable)
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
