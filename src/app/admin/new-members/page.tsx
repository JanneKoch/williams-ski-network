import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminNewMembersClient from '@/components/AdminNewMembersClient'

export default async function AdminNewMembersPage() {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: pendingAlumni } = await supabase
    .from('alumni')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const { data: pendingStudents } = await supabase
    .from('team_members')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-white">
      <AdminNewMembersClient
        alumniPending={pendingAlumni ?? []}
        teamPending={pendingStudents ?? []}
      />
    </main>
  )
}