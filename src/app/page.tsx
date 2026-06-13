import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main>
      <p>Supabase connected. User: {user ? user.email : 'not logged in'}</p>
    </main>
  )
}
