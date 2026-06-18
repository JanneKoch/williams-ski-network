'use client'

import { useState } from 'react'

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

export default function AdminRequestsClient({ requests: initialRequests }: Props) {
  const [requests, setRequests] = useState(initialRequests)
  const [sendingId, setSendingId] = useState<string | null>(null)

  async function handleSend(request: ContactRequest) {
    setSendingId(request.id)

    const res = await fetch('/api/send-intro', {
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

    const data = await res.json()

    if (data.success) {
      // remove it from the visible list immediately
      setRequests((prev) => prev.filter((r) => r.id !== request.id))
    }

    setSendingId(null)
  }

  async function handleReject(requestId: string) {
    await fetch('/api/reject-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId })
    })

    setRequests((prev) => prev.filter((r) => r.id !== requestId))
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold text-williams-purple mb-6">Contact Requests</h1>

      <div className="flex flex-col gap-4">
        {requests.map((req) => (
          <div key={req.id} className="rounded-xl border border-gray-200 p-5">

            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">
                  {req.student_name} → {req.alumni.full_name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(req.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-yellow-50 text-yellow-700">
                pending
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Background:</span> {req.student_blurb}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Asking for:</span> {req.specific_ask}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSend(req)}
                disabled={sendingId === req.id}
                className="flex-1 rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors disabled:opacity-50">
                {sendingId === req.id ? 'Sending...' : 'Send to Alumni'}
              </button>
              <button
                type="button"
                onClick={() => handleReject(req.id)}
                className="flex-1 rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>

          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-gray-400 text-center py-12">No pending requests.</p>
        )}
      </div>
    </div>
  )
}