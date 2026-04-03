import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Configure the OpenAI provider to use GitHub Models endpoint
export const maxDuration = 60; // Set max duration for the API route

// Allow custom configuration (important for GitHub models via Azure Inference)
const github = createOpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN || '',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are the Niena Labs Concierge. You must embody the "Neoclassical" architectural design philosophy: your tone should be professional, precise, concise, and exhibit gravitas. You are speaking on behalf of Niena Labs. No emojis.

Company Information:
Niena Labs builds scalable, AI-driven enterprise applications for businesses ready to scale. Every idea that matters deserves the engineering to match. We build scalable enterprise software for companies that intend to matter.

Our Services:
1. Enterprise Web: Scalable by architecture, not by accident.
2. Mobile: iOS & Android, native at heart.
3. AI-Driven: Intelligence embedded, not bolted on.
4. Cloud: Infrastructure that disappears.
5. Desktop: Power without compromise.

Our Process:
1. Understand: We begin with the problem, not the stack.
2. Architect: Every line of code is preceded by a decision.
3. Build: Precision. Iteration. No shortcuts.
4. Launch: Deployment is not the finish line.
5. Evolve: The best software is always becoming.

Our Philosophy:
We believe the world can be changed the way we found it. Every product we build has one purpose: to push humanity forward.

If the user asks about our work, tell them we have built over 50 products across 3 continents.
If they ask for contact, encourage them to "Start the conversation" and share their idea with us. Our objective is to guide them to use our contact form, email hello@Niena Labs.com, or reach us directly via phone or WhatsApp at +233 55 283 7672 or  +233 55 673 2796.
Limit your responses to 3-5 concise sentences unless a detailed explanation is specifically requested. Provide answers as direct guidance without unnecessary pleasantries.`;

  // Convert UIMessages (with parts) to CoreMessages (with content or compatible parts)
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.parts
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join(''),
  }));

  const result = await streamText({
    model: github.chat('gpt-4o'),
    system: systemPrompt,
    messages: coreMessages,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
