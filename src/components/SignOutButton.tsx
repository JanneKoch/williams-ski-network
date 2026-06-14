'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-williams-purple text-williams-purple text-sm px-4 py-2 hover:bg-williams-purple hover:text-white transition-colors">
      Sign Out
    </button>
  )
}