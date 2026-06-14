import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export default async function DirectoryPage() {

  const supabase = await createClient()
  const { data: alumni } = await supabase.from('alumni').select('*')

  return (
    <main className="min-h-screen bg-white">

      {/* top bar */}
      <div className="flex justify-end p-4">
        <SignOutButton />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* header */}
        <h1 className="text-3xl font-bold text-williams-purple mb-8">
          Alumni Directory
        </h1>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni?.map((person) => (
            <div key={person.id} className="rounded-xl border border-gray-200 p-5">

              {/* avatar + name + year/sport */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-williams-purple flex-shrink-0">
                  {getInitials(person.full_name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{person.full_name}</p>
                  <p className="text-xs text-gray-500">Class of {person.grad_year} · {person.sport}</p>
                </div>
              </div>

              {/* divider */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                <p className="text-sm text-gray-900">{person.company}</p>
                <p className="text-sm text-gray-500">{person.role}</p>
                <p className="text-sm text-gray-500">{person.location}</p>
              </div>

              {/* industry badge */}
              <div className="mt-3">
                <span className="text-xs bg-purple-50 text-williams-purple px-2 py-1 rounded-md">
                  {person.industry}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  )
}