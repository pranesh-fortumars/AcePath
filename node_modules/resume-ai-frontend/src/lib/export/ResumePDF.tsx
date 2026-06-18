import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeState } from '../../store/useResumeStore';

// Register standard fonts for clean ATS parsing
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#111827',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
  },
  contact: {
    fontSize: 9,
    color: '#4b5563',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  itemBlock: {
    marginBottom: 10,
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#374151',
  },
  dateLocation: {
    fontSize: 9,
    color: '#4b5563',
  },
  description: {
    marginTop: 4,
    fontSize: 10,
  },
  skillsBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillItem: {
    fontSize: 10,
  }
});

export const ResumePDFDocument = ({ data }: { data: ResumeState }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || "Candidate Name"}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</Text>
        </View>
        <View style={styles.contact}>
          {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          {data.personalInfo.github && <Text> • {data.personalInfo.github}</Text>}
          {data.personalInfo.portfolioUrl && <Text> • {data.personalInfo.portfolioUrl}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.description}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experiences.map((exp) => (
            <View key={exp.id} style={styles.itemBlock}>
              <View style={styles.itemHeader}>
                <Text style={styles.title}>{exp.role}</Text>
                <Text style={styles.dateLocation}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={styles.subtitle}>{exp.company} {exp.location ? `• ${exp.location}` : ""}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Projects</Text>
          {data.projects.map((proj) => (
            <View key={proj.id} style={styles.itemBlock}>
              <View style={styles.itemHeader}>
                <Text style={styles.title}>{proj.projectName} {proj.link ? `| ${proj.link}` : ""}</Text>
                <Text style={styles.dateLocation}>{proj.role}</Text>
              </View>
              <Text style={styles.subtitle}>Technologies: {proj.technologies}</Text>
              <Text style={styles.description}>{proj.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.educations.map((edu) => (
            <View key={edu.id} style={styles.itemBlock}>
              <View style={styles.itemHeader}>
                <Text style={styles.title}>{edu.institution}</Text>
                <Text style={styles.dateLocation}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <Text style={styles.subtitle}>{edu.degree} in {edu.fieldOfStudy}</Text>
              {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsBlock}>
            <Text style={styles.skillItem}>
              {data.skills.map(s => s.name).join(' • ')}
            </Text>
          </View>
        </View>
      )}

    </Page>
  </Document>
);
