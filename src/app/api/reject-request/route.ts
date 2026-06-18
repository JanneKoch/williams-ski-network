import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  const { requestId } = await request.json()

  const supabase = await createClient()
  await supabase
    .from('contact_requests')
    .update({ status: 'rejected' })
    .eq('id', requestId)

  return NextResponse.json({ success: true })
}