'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'


type Alumni = {
  id: string
  full_name: string
}

type Props = {
  alumni: Alumni
  onClose: () => void
}

export default function ContactRequestModal({ alumni, onClose }: Props) {
  const [blurb, setBlurb] = useState('')
  const [specificAsk, setSpecificAsk] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [studentName, setStudentName] = useState('')

  async function handleSubmit() {
  if (!studentName || !blurb || !specificAsk) {
    setError('Please fill in all required fields.')
    return
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    setError('You must be logged in.')
    return
  }

  const { error: insertError } = await supabase.from('contact_requests').insert({
    student_user_id: user.id,
    student_name: studentName,
    alumni_id: alumni.id,
    student_blurb: blurb,
    specific_ask: specificAsk
  })

  if (insertError) {
    setError(insertError.message)
    return
  }

  await fetch('/api/notify-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentName,
      studentBlurb: blurb,
      specificAsk,
      alumniName: alumni.full_name
    })
  })
  
  setSubmitted(true)
}

// Show success state after submit
if (submitted) return (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
      <p className="text-williams-purple font-semibold text-lg mb-2">Request sent!</p>
      <p className="text-gray-500 text-sm mb-6">
        We'll review your request and follow up soon.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
        Close
      </button>
    </div>
  </div>
)

  return (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg">
      <h1 className="text-xl font-bold text-williams-purple mb-6">
        Request introduction to {alumni.full_name}
      </h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Tell them a bit about yourself..."
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
          rows={3}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none"
        />
        <textarea
          placeholder="What specifically would you like to ask or learn?"
          value={specificAsk}
          onChange={(e) => setSpecificAsk(e.target.value)}
          rows={3}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  </div>
)
}
