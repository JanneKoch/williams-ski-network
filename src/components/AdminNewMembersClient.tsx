'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type AlumniPending = {
  id: string
  full_name: string
  grad_year: number
  company: string
  role: string
}

type TeamMemberPending = {
  id: string
  full_name: string
  year: string
  sport: string
}

type Props = {
  alumniPending: AlumniPending[]
  teamPending: TeamMemberPending[]
}


export default function AdminNewMembersClient({ alumniPending, teamPending }: Props) {
  const router = useRouter()

  async function handleApprove(table: 'alumni' | 'team_members', id: string) {
    const supabase = createClient()
    await supabase.from(table).update({ status: 'approved' }).eq('id', id)
    
    router.refresh()
  }

  async function handleReject(table: 'alumni' | 'team_members', id: string) {
    const supabase = createClient()
    await supabase.from(table).update({ status: 'rejected' }).eq('id', id)

    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
        <h1 className="text-2xl font-bold text-williams-purple mb-6">New Member Requests</h1>

        {/* pending alumni */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Alumni</h2>
        <div className="flex flex-col gap-4 mb-10">
        {alumniPending.map((person) => (
            <div key={person.id} className="rounded-xl border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">{person.full_name}</p>
                <p className="text-xs text-gray-500">
                  Class of {person.grad_year} · {person.company} · {person.role}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-yellow-50 text-yellow-700">
                pending
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleApprove('alumni', person.id)}
                className="flex-1 rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleReject('alumni', person.id)}
                className="flex-1 rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                Reject
              </button>
            </div>
          </div>
        ))}

        {alumniPending.length === 0 && (
          <p className="text-gray-400 text-sm py-4">No pending alumni.</p>
      )}
    </div>

        {/* pending students */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Students</h2>
        <div className="flex flex-col gap-4">
          {teamPending.map((person) => (
          <div key={person.id} className="rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium text-gray-900">{person.full_name}</p>
              <p className="text-xs text-gray-500">
                {person.year} · {person.sport}
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-yellow-50 text-yellow-700">
              pending
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleApprove('team_members', person.id)}
              className="flex-1 rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
              Approve
            </button>
            <button
              type="button"
              onClick={() => handleReject('team_members', person.id)}
              className="flex-1 rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Reject
            </button>
          </div>
        </div>
      ))}

      {teamPending.length === 0 && (
        <p className="text-gray-400 text-sm py-4">No pending students.</p>
      )}
    </div>
  </div>
)
}