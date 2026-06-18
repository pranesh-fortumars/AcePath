import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { ResumeState } from "../../store/useResumeStore";

export async function generateDocx(data: ResumeState) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: data.personalInfo.fullName || "Candidate Name",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun(`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun(data.personalInfo.linkedin ? `${data.personalInfo.linkedin} ` : ""),
              new TextRun(data.personalInfo.github ? `| ${data.personalInfo.github} ` : ""),
              new TextRun(data.personalInfo.portfolioUrl ? `| ${data.personalInfo.portfolioUrl}` : ""),
            ],
          }),
          new Paragraph({ text: "" }), // Spacing

          // Executive Summary
          ...(data.personalInfo.summary
            ? [
                new Paragraph({ text: "EXECUTIVE SUMMARY", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: data.personalInfo.summary }),
                new Paragraph({ text: "" }),
              ]
            : []),

          // Experience
          ...(data.experiences.length > 0
            ? [
                new Paragraph({ text: "PROFESSIONAL EXPERIENCE", heading: HeadingLevel.HEADING_2 }),
                ...data.experiences.flatMap((exp) => [
                  new Paragraph({
                    children: [
                      new TextRun({ text: exp.role, bold: true }),
                      new TextRun(`\t\t${exp.startDate} - ${exp.endDate}`),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: exp.company, italics: true }),
                      new TextRun(exp.location ? ` | ${exp.location}` : ""),
                    ],
                  }),
                  new Paragraph({ text: exp.description }),
                  new Paragraph({ text: "" }),
                ]),
              ]
            : []),

          // Projects
          ...(data.projects.length > 0
            ? [
                new Paragraph({ text: "TECHNICAL PROJECTS", heading: HeadingLevel.HEADING_2 }),
                ...data.projects.flatMap((proj) => [
                  new Paragraph({
                    children: [
                      new TextRun({ text: proj.projectName, bold: true }),
                      new TextRun(proj.link ? ` | ${proj.link}` : ""),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Role: ", italics: true }),
                      new TextRun(proj.role),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Technologies: ", italics: true }),
                      new TextRun(proj.technologies),
                    ],
                  }),
                  new Paragraph({ text: proj.description }),
                  new Paragraph({ text: "" }),
                ]),
              ]
            : []),

          // Education
          ...(data.educations.length > 0
            ? [
                new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }),
                ...data.educations.flatMap((edu) => [
                  new Paragraph({
                    children: [
                      new TextRun({ text: edu.institution, bold: true }),
                      new TextRun(`\t\t${edu.startDate} - ${edu.endDate}`),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${edu.degree} in ${edu.fieldOfStudy}`, italics: true }),
                    ],
                  }),
                  ...(edu.gpa ? [new Paragraph({ text: `GPA: ${edu.gpa}` })] : []),
                  new Paragraph({ text: "" }),
                ]),
              ]
            : []),

          // Skills
          ...(data.skills.length > 0
            ? [
                new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({
                  children: [
                    new TextRun(data.skills.map(s => s.name).join(" • ")),
                  ],
                }),
              ]
            : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.docx`);
}
