import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileEditForm from '@/components/ProfileEditForm'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: alumniRow } = await supabase
    .from('alumni')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!alumniRow) redirect('/onboarding')

  return (
    <main className="min-h-screen bg-white">
      <ProfileEditForm alumni={alumniRow} />
    </main>
  )
}