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
  <main className="min-h-screen bg-gray-50">
    <nav className="bg-williams-purple px-8 py-4 flex items-center justify-between">
      <h1 className="text-white font-semibold text-lg">Williams Ski Network</h1>
      <button 
        type="button"
        className="text-white text-sm hover:text-purple-200">
        Sign Out
      </button>
    </nav>
    <div className="max-w-5xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-semibold text-gray-900">
        Welcome, {user?.email}
      </h2>
      <p className="text-gray-500 mt-1">Williams Alpine & Nordic Ski Network</p>
    </div>
  </main>
)
}