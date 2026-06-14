import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  
  // Step 1: create a supabase client
  const supabase = await createClient()
  // Step 2: get the current user
  const { data: { user } } = await supabase.auth.getUser()
  // Step 3: if no user, redirect to /login
  if (!user) {
      redirect('/login')
    }
  
  const { data: alumniRow } = await supabase
    .from('alumni')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!alumniRow) redirect('/onboarding')
    
  return (
  <main className="min-h-screen bg-white">
    {/* Sign out button top right */}
    <div className="flex justify-end p-4">
      <SignOutButton />
    </div>

    {/* Centered content */}
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-4xl font-bold text-williams-purple">Williams Ski Network</h1>
      <p className="text-lg text-gray-500 mt-2">Welcome, {user?.email}</p>
    </div>
  </main>
)
} 