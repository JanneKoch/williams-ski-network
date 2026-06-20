import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: alumniRow } = await supabase
    .from('alumni')
    .select('id, full_name, status')
    .eq('user_id', user.id)
    .single()

  const { data: teamMemberRow } = await supabase
    .from('team_members')
    .select('id, full_name, status')
    .eq('user_id', user.id)
    .single()

  // if neither exists, they haven't onboarded yet
  if (!alumniRow && !teamMemberRow) redirect('/onboarding')

  const status = alumniRow?.status ?? teamMemberRow?.status
  const displayName = alumniRow?.full_name ?? teamMemberRow?.full_name

  if (status === 'pending') {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
          <div className="flex flex-col items-center justify-center mt-32 text-center px-8">
            <h1 className="text-2xl font-bold text-williams-purple mb-3">Almost there, {displayName}</h1>
            <p className="text-gray-500">
              Your profile is under review. We'll let you know once it's approved — usually within a day or two.
            </p>
          </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl font-bold text-williams-purple">Williams Ski Network</h1>
        <p className="text-lg text-gray-500 mt-2">Welcome, {displayName}</p>
      </div>
    </main>
  )
}