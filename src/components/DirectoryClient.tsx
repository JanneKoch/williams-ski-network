'use client'

import { useState } from 'react'
import SignOutButton from '@/components/SignOutButton'

type Alumni = {
  id: string
  full_name: string
  grad_year: number
  sport: string
  company: string
  role: string
  industry: string
  location: string
  linkedin: string
  bio: string
  willing_to_contact: boolean
  avatar_url: string | null
}

type Props = {
  alumni: Alumni[]
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export default function DirectoryClient({ alumni }: Props) {
  const [search, setSearch] = useState('')
  const [sport, setSport] = useState('')
  const [industry, setIndustry] = useState('')

  const filtered = alumni.filter((person) => {
    const matchesSearch = search === '' ||
      person.full_name.toLowerCase().includes(search.toLowerCase())
    const matchesSport = sport === '' || person.sport === sport
    const matchesIndustry = industry === '' || person.industry === industry
    return matchesSearch && matchesSport && matchesIndustry
  })

  return (
    <main className="min-h-screen bg-white">
      <div className="flex justify-end p-4">
        <SignOutButton />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-williams-purple mb-8">
          Alumni Directory
        </h1>

        {/* filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm flex-1 min-w-48"
          />

          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">All sports</option>
            <option value="Alpine">Alpine</option>
            <option value="Nordic">Nordic</option>
            <option value="Both">Both</option>
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">All industries</option>
            <option value="Finance / Investment">Finance / Investment</option>
            <option value="Consulting">Consulting</option>
            <option value="Technology">Technology</option>
            <option value="Outdoors / Ski Industry">Outdoors / Ski Industry</option>
            <option value="Medicine / Healthcare">Medicine / Healthcare</option>
            <option value="Law">Law</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Marketing / Media">Marketing / Media</option>
            <option value="Education / Academia">Education / Academia</option>
            <option value="Government / Nonprofit">Government / Nonprofit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* results count */}
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length} {filtered.length === 1 ? 'alumni' : 'alumni'} found
        </p>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((person) => (
            <div key={person.id} className="rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-williams-purple flex-shrink-0">
                  {getInitials(person.full_name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{person.full_name}</p>
                  <p className="text-xs text-gray-500">Class of {person.grad_year} · {person.sport}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                <p className="text-sm text-gray-900">{person.company}</p>
                <p className="text-sm text-gray-500">{person.role}</p>
                <p className="text-sm text-gray-500">{person.location}</p>
              </div>
              <div className="mt-3">
                <span className="text-xs bg-purple-50 text-williams-purple px-2 py-1 rounded-md">
                  {person.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No alumni match your filters.</p>
            <button
              onClick={() => { setSearch(''); setSport(''); setIndustry('') }}
              className="mt-3 text-sm text-williams-purple hover:underline">
              Clear filters
            </button>
          </div>
        )}

      </div>
    </main>
  )
}