'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type ContactRequest = {
  id: string
  student_name: string
  student_email: string
  student_blurb: string
  specific_ask: string
  status: string
  created_at: string
  alumni: {
  full_name: string
  contact_email: string
  }
}

type Props = {
  requests: ContactRequest[]
}

export default function AdminRequestsClient({ requests }: Props) {
  const router = useRouter()
  const [sendingId, setSendingId] = useState<string | null>(null)

  async function handleSend(request: ContactRequest) {
    setSendingId(request.id)

    // call the API route to send the email
    await fetch('/api/send-intro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: request.id,
        alumniEmail: request.alumni.contact_email,
        alumniName: request.alumni.full_name,
        studentName: request.student_name,
        studentEmail: request.student_email,
        studentBlurb: request.student_blurb,
        specificAsk: request.specific_ask
      })
    })

    setSendingId(null)
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold text-williams-purple mb-6">Contact Requests</h1>

      <div className="flex flex-col gap-4">
        {requests.map((req) => (
          <div key={req.id} className="rounded-xl border border-gray-200 p-5">

            {/* header: who and status */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">
                  {req.student_name} → {req.alumni.full_name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(req.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md ${
                req.status === 'approved' ? 'bg-green-50 text-green-700' :
                req.status === 'rejected' ? 'bg-red-50 text-red-700' :
                'bg-yellow-50 text-yellow-700'
              }`}>
                {req.status}
              </span>
            </div>

            {/* student's info */}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Background:</span> {req.student_blurb}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Asking for:</span> {req.specific_ask}
              </p>
            </div>

            {/* send button */}
            <button
              type="button"
              onClick={() => handleSend(req)}
              disabled={sendingId === req.id || req.status === 'approved'}
              className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors disabled:opacity-50">
              {sendingId === req.id ? 'Sending...' : req.status === 'approved' ? 'Already Sent' : 'Send to Alumni'}
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}