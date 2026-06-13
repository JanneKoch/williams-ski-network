import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  
  // Step 1: create a supabase client
  const supabase = await createClient()
  
  // Step 2: get the current user
  const { data: { user } } = await supabase.auth.getUser()

  // Step 3: if no user, redirect to /login
  if (!user) {
      redirect('/login')
    }

  return (
  <main className="p-8">
    <h1 className="text-2xl font-semibold text-white">
      Welcome, {user?.email}
    </h1>
    <button
      type="button"
      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
      Sign Out
    </button>
  </main>
)
}