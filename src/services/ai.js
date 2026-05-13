import { sleep } from '@/utils';

const API_BASE = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

async function callClaude(systemPrompt, userMessage, maxTokens = 1000) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.content?.[0]?.text ?? '';
}

// Personalized job match summary
export async function generateJobSummary(job, userSkills) {
  const system = `You are TalentFlow AI, an intelligent career assistant. 
Analyze job listings and provide concise, insightful summaries tailored to a candidate's profile.
Be direct, honest, and specific. Highlight genuine strengths and gaps.
Respond in 2-3 sentences max. No bullet points. No markdown.`;

  const user = `Job: ${job.title} at ${job.company}
Required skills: ${job.requirements?.slice(0, 3).join(', ')}
Candidate skills: ${userSkills.join(', ')}

Write a personalized match analysis for this candidate.`;

  return callClaude(system, user, 300);
}

// Skill improvement recommendations
export async function analyzeSkillGaps(job, userSkills) {
  const system = `You are a career coach AI. Identify 3 specific skills the candidate should develop for this role.
Return ONLY a JSON array of strings, no markdown, no explanation.
Example: ["Skill 1", "Skill 2", "Skill 3"]`;

  const user = `Job requires: ${job.requirements?.join('; ')}
Candidate has: ${userSkills.join(', ')}
What are the top 3 skill gaps?`;

  const text = await callClaude(system, user, 200);
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return job.skillGaps ?? ['Advanced TypeScript', 'System Design', 'Cloud Architecture'];
  }
}

// Smart cover letter suggestions
export async function generateCoverLetterDraft(job, profile) {
  const system = `You are an expert career coach writing concise, compelling cover letter openings.
Write 2-3 powerful sentences that open a cover letter. Be specific, confident, authentic.
No generic phrases. No "I am writing to apply". Focus on value proposition.`;

  const user = `Role: ${job.title} at ${job.company}
My background: ${profile.title} with ${profile.experience} experience in ${profile.skills.slice(0,4).join(', ')}
Write the opening paragraph.`;

  return callClaude(system, user, 400);
}

// Extract quick insights from job descriptions
export async function extractJobInsights(job) {
  const system = `You are a job market analyst. Extract 3 key insights from a job description.
Return ONLY a JSON object:
{"culture": "one sentence", "growth": "one sentence", "challenge": "one sentence"}
No markdown. No extra text.`;

  const user = `Job: ${job.title} at ${job.company}
Description: ${job.description}
Benefits: ${job.benefits?.join(', ')}`;

  const text = await callClaude(system, user, 300);
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return {
      culture: `${job.company} values innovation and ownership in a fast-moving environment.`,
      growth: 'Strong opportunity for technical and leadership growth with direct ownership.',
      challenge: 'High performance bar with complex technical problems at scale.',
    };
  }
}

// Local mock responses for demo mode
export const mockServices = {
  async generateJobSummary(job) {
    await sleep(1200);
    return job.aiSummary;
  },
  async analyzeSkillGaps(job) {
    await sleep(900);
    return job.skillGaps ?? [];
  },
  async generateCoverLetterDraft(job, profile) {
    await sleep(1500);
    return `With ${profile.experience} building high-impact products at the intersection of ${profile.skills.slice(0,2).join(' and ')}, I've been following ${job.company}'s trajectory closely — particularly your approach to ${job.tags[0].toLowerCase()}. The ${job.title} role represents exactly the kind of ambitious, high-ownership challenge where I thrive.`;
  },
  async extractJobInsights(job) {
    await sleep(800);
    return {
      culture: `${job.company} is known for high autonomy and a strong engineering-first culture.`,
      growth: 'Significant runway for advancement given the company\'s growth trajectory.',
      challenge: 'Complex technical problems requiring deep expertise and cross-team collaboration.',
    };
  },
};
