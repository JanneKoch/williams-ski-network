import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import OnboardingForm from '@/components/OnboardingForm'

export default async function OnBoardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
    
  const { data: alumniRow } = await supabase
  .from('alumni')
  .select('id')
  .eq('user_id', user.id)
  .single()

  const { data: teamMemberRow } = await supabase
    .from('team_members')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (alumniRow || teamMemberRow) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-white">
      <OnboardingForm userId={user.id} />
    </main>
  )
}