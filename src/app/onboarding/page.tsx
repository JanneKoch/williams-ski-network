import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function OnBoardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
    
  const { data: alumniRow } = await supabase
    .from('alumni')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (alumniRow) redirect('/dashboard')
  return (
    <main className="min-h-screen bg-white">
      <p>Onboarding form goes here</p>
    </main>
  )
}