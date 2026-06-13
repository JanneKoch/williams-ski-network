'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    // Step 1: create supabase client
    const supabase = createClient()
    
    // Step 2: call supabase sign out
    await supabase.auth.signOut()

    // Step 3: redirect to /login
    router.push('/login')
  }

  return (
  <button
    type="button"
    onClick={handleSignOut}
    className="text-williams-purple text-sm">
    Sign Out
  </button>
)
}