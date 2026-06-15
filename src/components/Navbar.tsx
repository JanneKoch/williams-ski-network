'use client'

import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-8 py-4 border-b border-gray-100">
      
      {/* left: nav links */}
      <div className="flex items-center gap-6">
        <Link href="/directory" className="text-sm text-gray-600 hover:text-williams-purple transition-colors">
          Directory
        </Link>
        {/*<Link href="/events" className="text-sm text-gray-600 hover:text-williams-purple transition-colors">
          Events
        </Link> */}
        <Link href="/blog" className="text-sm text-gray-600 hover:text-williams-purple transition-colors">
          Blog
        </Link>
      </div>

      {/* center: logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/dashboard">
          <span className="text-williams-purple font-bold text-lg tracking-wide">
            Williams Ski Network
          </span>
        </Link>
      </div>

      {/* right: sign out */}
      <div>
        <SignOutButton />
      </div>

    </nav>
  )
}