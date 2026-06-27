'use client'

import Link from 'next/link'
import { useEffect } from 'react'

type TeamMember = {
  id: string
  full_name: string
  year: string
  sport: string
  looking_for: string[] | null
}

type Props = {
  firstName: string
  teamMembers: TeamMember[]
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export default function DashboardClient({ firstName, teamMembers }: Props) {
  return (
    <main className="bg-page-bg min-h-screen overflow-x-hidden">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-[18px] bg-purple-dk/0 transition-colors duration-300">
        <nav className="flex items-center gap-7">
          <Link href="/directory" className="text-sm text-white/85 hover:text-white transition-opacity">Directory</Link>
          <Link href="#" className="text-sm text-white/85 hover:text-white transition-opacity">Blog</Link>
          <Link href="#" className="text-sm text-white/85 hover:text-white transition-opacity">Events</Link>
        </nav>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gold text-purple-dk font-[var(--font-slab)] font-bold text-lg">W</span>
          <span className="font-[var(--font-slab)] font-semibold text-lg text-white">Williams Ski Network</span>
        </Link>
        <div className="flex items-center gap-[18px]">
          <Link href="/profile" className="text-sm text-white/85 hover:text-white transition-opacity">Edit Profile</Link>
          <Link href="/login" className="text-[13px] font-semibold text-white px-[18px] py-[9px] border-[1.5px] border-white/50 rounded-full hover:bg-white hover:text-purple-dk transition-all">Sign Out</Link>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3a0068] via-purple-dk to-purple-darker px-10 pt-40 pb-24">
        <div className="relative max-w-[1240px] mx-auto">
          <div className="inline-flex items-center gap-2.5 text-xs tracking-[.22em] font-semibold text-gold mb-6">
            <span className="w-[26px] h-[2px] bg-gold inline-block" />
            WILLIAMS COLLEGE · ALUMNI &amp; ATHLETICS
          </div>
          <h1 className="font-[var(--font-slab)] font-bold text-white leading-[.96] tracking-tight text-[clamp(48px,6.4vw,98px)]">
            Welcome back,<br /><span className="text-gold">{firstName}.</span>
          </h1>
          <p className="text-[19px] leading-[1.55] text-[#d8c8ee] max-w-[430px] mt-6">
            Your ski network — the alumni, the stories, and the next time the Ephs all get on snow together.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            <Link href="/directory" className="inline-flex items-center gap-2 bg-gold text-purple-dk font-bold text-[15px] px-[26px] py-[15px] rounded-full shadow-[0_8px_24px_rgba(255,190,10,.25)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(255,190,10,.38)] transition-all">
              Browse the Directory →
            </Link>
            <Link href="#" className="inline-flex items-center bg-transparent text-white font-semibold text-[15px] px-[26px] py-[15px] rounded-full border-[1.5px] border-white/35 hover:bg-white/10 hover:border-white transition-all">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}