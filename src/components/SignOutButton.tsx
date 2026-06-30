'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type Props = {
  variant?: 'header' | 'footer'
}

export default function SignOutButton({ variant = 'header' }: Props) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut({ scope: 'global' })
    window.location.href = '/login'
  }

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors text-left">
        Sign Out
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-[13px] font-semibold text-white px-[18px] py-[9px] border-[1.5px] border-white/50 rounded-full hover:bg-white hover:text-purple-dk transition-all">
      Sign Out
    </button>
  )
}