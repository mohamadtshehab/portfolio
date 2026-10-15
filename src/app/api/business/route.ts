import { Resend } from 'resend';
import { budgetValues, sizeValues, validateApplication } from '@/lib/businessApplication';
import { content } from '@/app/business/content';

export async function POST(request: Request) {
  let body;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid application.' }, { status: 400 }); }
  const application = validateApplication(body);
  if (!application) return Response.json({ error: 'Please check your application and contact details.' }, { status: 400 });
  const selectedProblems = body.selectedProblems ?? [];
  if (!Array.isArray(selectedProblems) || selectedProblems.length > content.en.problems.length ||
    !selectedProblems.every((index: unknown) => typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < content.en.problems.length) ||
    new Set(selectedProblems).size !== selectedProblems.length) {
    return Response.json({ error: 'Invalid challenge selections.' }, { status: 400 });
  }
  // Silently discard submissions to the hidden honeypot field.
  if (body.companyFax) return Response.json({ success: true });
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.EMAIL_TO;
  if (!apiKey || !recipient) return Response.json({ error: 'Applications are temporarily unavailable.' }, { status: 503 });
  const rows = Object.entries(application).map(([key, value]) => `${content.en.labels[key as keyof typeof application]}: ${key === 'budget' ? content.en.budgets[budgetValues.findIndex(item => item === value)] : key === 'size' ? content.en.sizes[sizeValues.findIndex(item => item === value)] : value || '(not provided)'}`);
  if (selectedProblems.length) rows.push(`Selected challenges: ${selectedProblems.map((index: number) => content.en.problems[index].title).join(', ')}`);
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: 'Business Applications <onboarding@resend.dev>',
      to: [recipient],
      subject: 'New AI Transformation Application via Portfolio',
      ...(application.email ? { replyTo: application.email } : {}),
      text: `Business application\nBudget ranges are in USD.\nLanguage: ${body.language === 'en' ? 'English' : 'Arabic'}\n\n${rows.join('\n\n')}`,
    });
    if (error) return Response.json({ error: 'Unable to send application.' }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Unable to send application.' }, { status: 502 });
  }
}
