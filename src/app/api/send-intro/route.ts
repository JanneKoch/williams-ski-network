import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/utils/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const {
    requestId,
    alumniEmail,
    alumniName,
    studentName,
    studentEmail,
    studentBlurb,
    specificAsk
  } = await request.json()

  console.log('send-intro called with:', { requestId, alumniEmail, alumniName })

  // Step 1: send email to the alumni
  const { data, error: emailError } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: alumniEmail,
    subject: `Williams Ski Network — Introduction Request`,
    html: `
      <h2>Hi ${alumniName},</h2>
      <p>A current Williams ski team student would love to connect with you through the Williams Ski Network.</p>
      
      <p><strong>${studentName}</strong> shared a bit about themselves:</p>
      <p style="background:#f9f9f9; padding:12px; border-radius:8px;">${studentBlurb}</p>
      
      <p><strong>What they're hoping to learn or ask:</strong></p>
      <p style="background:#f9f9f9; padding:12px; border-radius:8px;">${specificAsk}</p>
      
      <p>Feel free to reach out directly at <a href="mailto:${studentEmail}">${studentEmail}</a> — and if you do connect, we'd love to hear how it goes!</p>
      
      <p>Thanks for being part of the network!</p>
      <p>— Williams Ski Network</p>
    `
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return NextResponse.json({ success: false, error: emailError }, { status: 500 })
  }

  console.log('Resend success:', data)

  // Step 2: mark the request as approved
  const supabase = await createClient()
  const { error: updateError } = await supabase
    .from('contact_requests')
    .update({ status: 'approved' })
    .eq('id', requestId)

  if (updateError) {
    console.error('Supabase update error:', updateError)
  }

  return NextResponse.json({ success: true })
}