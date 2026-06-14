'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const INDUSTRIES = [
  'Finance / Investment', 'Consulting', 'Technology',
  'Outdoors / Ski Industry', 'Medicine / Healthcare', 'Law',
  'Real Estate', 'Marketing / Media', 'Education / Academia',
  'Government / Nonprofit', 'Other'
]

type Props = {
  userId: string
}

export default function OnboardingForm({ userId }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const [userType, setUserType] = useState<'alumni' | 'student' | ''>('')
  const [fullName, setFullName] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [sport, setSport] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [bio, setBio] = useState('')
  const [willingToContact, setWillingToContact] = useState(false)
  const [lookingFor, setLookingFor] = useState<string[]>([])

  async function handleSubmit() {
    const supabase = createClient()
  
    const { error } = await supabase.from('alumni').insert({
      user_id: userId,
      full_name: fullName,
      grad_year: gradYear,
      sport: sport,
      company: company,
      role: role,
      industry: industry,
      location: location,
      linkedin: linkedin,
      bio: bio,
      willing_to_contact: willingToContact
    })

    if (error) {
      console.error(error)
      return
    }

    router.push('/dashboard')
  }

  // Step 0 — alumni or student
  if (step === 0) return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-8">
        <h1 className="text-3xl font-bold text-williams-purple text-center mb-2">
          Welcome to Williams Ski Network
        </h1>
        <p className="text-gray-500 text-center mb-8">Are you a current student or alumni?</p>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => { setUserType('alumni'); setStep(1) }}
            className="w-full rounded-xl border-2 border-williams-purple text-williams-purple font-medium py-4 hover:bg-williams-purple hover:text-white transition-colors">
            I'm an alumni
          </button>
          <button
            type="button"
            onClick={() => { setUserType('student'); setStep(1) }}
            className="w-full rounded-xl border-2 border-gray-300 text-gray-600 font-medium py-4 hover:bg-gray-50 transition-colors">
            I'm a current student
          </button>
        </div>
      </div>
    </main>
  )

  // Step 1 — basic info (both alumni and students)
  if (step === 1) return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-8 py-16">
        <p className="text-sm text-gray-400 mb-2">Step 1 of 3</p>
        <h1 className="text-2xl font-bold text-williams-purple mb-8">Basic Info</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name e.g. Janne Koch"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Graduation year e.g. 2026"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">Select sport</option>
            <option value="Alpine">Alpine</option>
            <option value="Nordic">Nordic</option>
            <option value="Both">Both</option>
          </select>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
            Next
          </button>
        </div>
      </div>
    </main>
  )

  // Step 2a — alumni professional info
  if (step === 2 && userType === 'alumni') return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-8 py-16">
        <p className="text-sm text-gray-400 mb-2">Step 2 of 3</p>
        <h1 className="text-2xl font-bold text-williams-purple mb-8">Professional Info</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Role e.g. Analyst"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location e.g. New York, NY"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
            Next
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
        </div>
      </div>
    </main>
  )

  // Step 2b — student looking for
  if (step === 2 && userType === 'student') return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-8 py-16">
        <p className="text-sm text-gray-400 mb-2">Step 2 of 3</p>
        <h1 className="text-2xl font-bold text-williams-purple mb-8">What are you looking for?</h1>
        <div className="flex flex-col gap-3">
          {['Internship', 'Full-time job', 'Mentorship', 'Career advice'].map((option) => (
            <label key={option} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={lookingFor.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) setLookingFor([...lookingFor, option])
                  else setLookingFor(lookingFor.filter(o => o !== option))
                }}
              />
              {option}
            </label>
          ))}
          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors mt-4">
            Next
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
        </div>
      </div>
    </main>
  )

  // Step 3 — bio + preferences + submit
  if (step === 3) return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-8 py-16">
        <p className="text-sm text-gray-400 mb-2">Step 3 of 3</p>
        <h1 className="text-2xl font-bold text-williams-purple mb-8">Almost done</h1>
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="Short bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none"
          />
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={willingToContact}
              onChange={(e) => setWillingToContact(e.target.checked)}
            />
            I'm willing to be contacted by current students
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors">
            Complete Profile
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
        </div>
      </div>
    </main>
  )
}