import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminRequestsClient from '@/components/AdminRequestsClient'

export default async function AdminRequestPage() {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: requests } = await supabase
    .from('contact_requests')
    .select('*, alumni(full_name, contact_email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-white">
      <AdminRequestsClient requests={requests ?? []} />
    </main>
  )
}