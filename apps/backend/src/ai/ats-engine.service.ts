import { Injectable } from '@nestjs/common';

@Injectable()
export class AtsEngineService {
  
  // High-impact action verbs dictionary
  private readonly actionVerbs = [
    'spearheaded', 'architected', 'optimized', 'developed', 'managed',
    'increased', 'reduced', 'implemented', 'designed', 'orchestrated',
    'driven', 'achieved', 'transformed', 'accelerated', 'pioneered'
  ];

  // Weak/passive verbs to avoid
  private readonly passiveVerbs = [
    'helped', 'assisted', 'worked on', 'responsible for', 'handled',
    'was involved in', 'duties included', 'participated'
  ];

  /**
   * Scans the resume completely locally using heuristics and regex.
   * Calculates the 10+ metrics requested for ATS 2.0.
   */
  public analyzeResumeLocally(resumeText: string, jobDescription: string) {
    const textLower = resumeText.toLowerCase();
    const jdLower = jobDescription.toLowerCase();

    // 1. Keyword Extraction (TF-IDF simulation)
    const keywords = this.extractKeywords(jdLower);
    let matchedKeywords = 0;
    const missingKeywords: string[] = [];
    
    keywords.forEach(kw => {
      if (textLower.includes(kw)) {
        matchedKeywords++;
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordScore = keywords.length > 0 ? Math.round((matchedKeywords / keywords.length) * 100) : 100;

    // 2. Action Verb & Impact Metric Analysis
    let actionVerbCount = 0;
    let passiveVerbCount = 0;
    
    this.actionVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'g');
      const matches = textLower.match(regex);
      if (matches) actionVerbCount += matches.length;
    });

    this.passiveVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'g');
      const matches = textLower.match(regex);
      if (matches) passiveVerbCount += matches.length;
    });

    // Detect numbers and percentages (Metrics/Impact)
    const impactMatches = textLower.match(/\d+%|\$\d+|\d+x|\b\d+\b/g) || [];
    const impactScore = Math.min(100, impactMatches.length * 5); // 20 metrics = 100%

    // 3. Readability & Formatting (Simulating ATS safety)
    const readabilityScore = this.calculateReadability(resumeText);
    const atsCompatibilityScore = 100 - (passiveVerbCount * 2); // Penalize passive language

    // 4. Aggregate Scores
    const recruiterScore = Math.round((impactScore * 0.6) + (readabilityScore * 0.4));
    const overallScore = Math.round((keywordScore + atsCompatibilityScore + recruiterScore + impactScore) / 4);

    return {
      overallScore,
      atsCompatibilityScore: Math.max(0, atsCompatibilityScore),
      recruiterScore,
      keywordScore,
      impactScore,
      readabilityScore,
      executiveScore: Math.min(100, Math.round(actionVerbCount * 8 + impactScore * 0.5)),
      diagnostics: {
        actionVerbsDetected: actionVerbCount,
        passiveVerbsDetected: passiveVerbCount,
        quantifiableMetrics: impactMatches.length,
        missingKeywords: missingKeywords.slice(0, 10)
      }
    };
  }

  private extractKeywords(text: string): string[] {
    // Basic heuristic: Extract nouns and known tech terms (Mocked for brevity)
    const techDictionary = ['react', 'node.js', 'typescript', 'aws', 'docker', 'kubernetes', 'sql', 'agile', 'ci/cd', 'python'];
    return techDictionary.filter(term => text.includes(term));
  }

  private calculateReadability(text: string): number {
    // Simulated Flesch-Kincaid / Formatting check
    const words = text.split(' ').length;
    const sentences = text.split('.').length;
    if (sentences === 0) return 0;
    
    const wordsPerSentence = words / sentences;
    // Optimal words per sentence for scanning is around 15-20
    if (wordsPerSentence > 10 && wordsPerSentence < 25) return 95;
    if (wordsPerSentence >= 25) return 70; // Too dense
    return 80;
  }
}
