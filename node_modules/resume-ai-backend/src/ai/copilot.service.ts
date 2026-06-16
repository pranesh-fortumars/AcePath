import { Injectable } from '@nestjs/common';

@Injectable()
export class CopilotService {
  
  /**
   * Generates feedback from multiple recruiter personas locally using heuristic analysis.
   * No external LLM API required.
   */
  public generatePersonaFeedback(resumeText: string, targetRole: string) {
    const textLower = resumeText.toLowerCase();
    
    // Calculate basic heuristic stats
    const hasNumbers = /\d+/.test(resumeText);
    const hasLeadership = /(led|managed|spearheaded|directed|team size)/i.test(resumeText);
    const hasCloud = /(aws|azure|gcp|cloud)/i.test(resumeText);
    const sentenceCount = textLower.split('.').length;

    return {
      hrRecruiter: this.generateHrFeedback(hasNumbers, sentenceCount),
      technicalManager: this.generateTechnicalFeedback(hasCloud, targetRole),
      ctoReview: this.generateCtoFeedback(hasLeadership, hasNumbers)
    };
  }

  private generateHrFeedback(hasNumbers: boolean, sentenceCount: number) {
    let feedback = "Your resume formatting looks solid and easily parsable. ";
    if (!hasNumbers) {
      feedback += "However, you are missing quantifiable metrics. Try to add numbers to your achievements (e.g. 'Increased sales by 20%'). ";
    }
    if (sentenceCount > 40) {
      feedback += "It looks a bit lengthy. Consider condensing your bullet points so they are easier to scan in 6 seconds.";
    }
    return feedback;
  }

  private generateTechnicalFeedback(hasCloud: boolean, targetRole: string) {
    let feedback = `For a ${targetRole || 'technical'} position, your foundational skills are clear. `;
    if (!hasCloud) {
      feedback += "I highly recommend adding specific Cloud Architecture experience or DevOps tools you've used, as that is highly sought after right now.";
    } else {
      feedback += "Great job highlighting modern cloud technologies. Make sure you specify the exact scope of your deployment responsibilities.";
    }
    return feedback;
  }

  private generateCtoFeedback(hasLeadership: boolean, hasNumbers: boolean) {
    if (hasLeadership && hasNumbers) {
      return "Excellent executive presence. You've clearly demonstrated both leadership capability and measurable business impact. This is exactly what I look for in senior engineering hires.";
    } else if (hasLeadership && !hasNumbers) {
      return "You show good leadership experience, but I need to see the ROI. What was the business impact of your leadership? How much money did you save the company?";
    } else {
      return "To reach the next level, you need to frame your work in terms of business value, not just technical tasks. Start mentioning team collaboration, cross-functional communication, and strategic project ownership.";
    }
  }
}
