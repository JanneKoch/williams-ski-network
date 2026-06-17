import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { studentName, studentBlurb, specificAsk, alumniName } = await request.json()

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'jannekoch04@gmail.com',
  subject: `New contact request for ${alumniName}`,
  html: `
    <h2>New Contact Request</h2>
    <p><strong>From:</strong> ${studentName}</p>
    <p><strong>Alumni:</strong> ${alumniName}</p>
    <p><strong>Student's background:</strong> ${studentBlurb}</p>
    <p><strong>Specific ask:</strong> ${specificAsk}</p>
    `
  })

  return NextResponse.json({ success: true })
}