import { createClient } from '@/utils/supabase/server'
import DirectoryClient from '@/components/DirectoryClient'

export default async function DirectoryPage() {
  const supabase = await createClient()
  const { data: alumni } = await supabase.from('alumni').select('*')

  return <DirectoryClient alumni={alumni ?? []} />
}