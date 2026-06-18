'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const INDUSTRIES = [
  'Finance / Investment', 'Consulting', 'Technology',
  'Outdoors / Ski Industry', 'Medicine / Healthcare', 'Law',
  'Real Estate', 'Marketing / Media', 'Education / Academia',
  'Government / Nonprofit', 'Other'
]

type Alumni = {
  id: string
  user_id: string
  full_name: string
  grad_year: number
  sport: string
  company: string
  role: string
  industry: string
  location: string
  contact_email: string
  linkedin: string
  bio: string
  willing_to_contact: boolean
  avatar_url: string | null
}

type Props = {
  alumni: Alumni
}

export default function ProfileEditForm({ alumni }: Props) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // Pre-fill all fields with existing data
  const [fullName, setFullName] = useState(alumni.full_name ?? '')
  const [gradYear, setGradYear] = useState(String(alumni.grad_year) ?? '')
  const [sport, setSport] = useState(alumni.sport ?? '')
  const [company, setCompany] = useState(alumni.company ?? '')
  const [role, setRole] = useState(alumni.role ?? '')
  const [industry, setIndustry] = useState(alumni.industry ?? '')
  const [location, setLocation] = useState(alumni.location ?? '')
  const [linkedin, setLinkedin] = useState(alumni.linkedin ?? '')
  const [bio, setBio] = useState(alumni.bio ?? '')
  const [willingToContact, setWillingToContact] = useState(alumni.willing_to_contact ?? false)
  const [contactEmail, setContactEmail] = useState(alumni.contact_email ?? '')

  async function handleSave() {
    if (!fullName || !gradYear || !sport || !company || !role || !industry || !location) {
      setError('Please fill in all required fields.')
      return
    }

    setSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('alumni')
      .update({
        full_name: fullName,
        grad_year: gradYear,
        sport: sport,
        company: company,
        role: role,
        industry: industry,
        location: location,
        contact_email: contactEmail,
        linkedin: linkedin,
        bio: bio,
        willing_to_contact: willingToContact
      })
      .eq('id', alumni.id)

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-md mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-williams-purple mb-8">Edit Profile</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Graduation year"
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
          <input
            type="text"
            placeholder="Company"
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
            type="email"
            placeholder="Contact email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
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

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-williams-purple text-white py-2 text-sm font-medium hover:bg-williams-light transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="w-full rounded-lg border border-gray-300 text-gray-600 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </main>
  )
}