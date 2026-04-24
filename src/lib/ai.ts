/**
 * AI utilities for client projects.
 * Uses Anthropic Claude API scoped to the client's business.
 *
 * SETUP:
 * 1. Add ANTHROPIC_API_KEY to CF Pages env vars
 * 2. Customize BUSINESS_CONTEXT with client details from brand questionnaire
 * 3. Create API routes in src/pages/api/ai/ for each feature
 *
 * See: 00-skills/build/skill-ai-client-integration.md for full guide
 */

const MODEL = 'claude-sonnet-4-6'

interface AIOptions {
  system: string
  prompt: string
  maxTokens?: number
}

/**
 * Generate text using Claude API via raw fetch (no SDK dependency needed).
 * Uses the raw API to keep the base template dependency-light.
 */
export async function generateText(
  apiKey: string,
  opts: AIOptions
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: opts.maxTokens ?? 512,
      system: opts.system,
      messages: [{ role: 'user', content: opts.prompt }],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    console.error('[ai] Anthropic error:', errText)
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json() as { content: Array<{ type: string; text: string }> }
  return data.content?.[0]?.text ?? ''
}

// ─── Business-Scoped System Prompt ───────────────────
// CUSTOMIZE THIS PER CLIENT using their brand questionnaire responses.
// Replace all [PLACEHOLDERS] with real business details.

export const BUSINESS_CONTEXT = `You are a helpful assistant for [BUSINESS_NAME], a [BUSINESS_TYPE] in [CITY], [STATE].

About the business:
- [What they do — 2-3 sentences]
- Services: [list services]
- Hours: [business hours]
- Location: [address]
- Phone: [phone]

Brand voice:
- [Tone from brand questionnaire — friendly/professional/casual]

Rules:
- ONLY answer questions about [BUSINESS_NAME] and their services.
- If asked about competitors, unlisted pricing, or off-topic subjects, politely redirect.
- Never make up information. If unsure, say "Please contact us directly at [phone/email]."
- Keep responses concise — 2-4 sentences for simple questions.
- Be warm and helpful, like a knowledgeable team member.`

// ─── Feature-Specific Prompts ────────────────────────
// Uncomment and customize the features you're adding for this client.

/*
export const CONTACT_AUTO_REPLY = `${BUSINESS_CONTEXT}

Additional rules for auto-replies:
- Thank the person by name for reaching out.
- Acknowledge what they asked about in one sentence.
- Set expectations: "We typically respond within [TIMEFRAME]."
- Keep it to 3-4 sentences. Sign off with the business name.`
*/

/*
export const CONTENT_WRITER = `${BUSINESS_CONTEXT}

You are writing website content for this business.
- Write in the brand voice described above.
- Include relevant local context for SEO.
- Output format depends on request (service description, blog post, social caption).`
*/
