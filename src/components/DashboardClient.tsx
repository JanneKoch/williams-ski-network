'use client'

import Link from 'next/link'

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

      {/* current team members */}
      <section className="max-w-[1240px] mx-auto px-10 pt-16 pb-10">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs tracking-[.2em] font-bold text-eyebrow mb-2.5">THE TEAM</div>
            <h2 className="font-[var(--font-slab)] font-bold text-[clamp(30px,3.6vw,46px)] tracking-tight text-[#241430] leading-none">
              Current team members
            </h2>
          </div>
          <Link href="/team" className="text-sm font-semibold text-williams-purple border-b-2 border-gold pb-0.5">
            View full roster →
          </Link>
        </div>

        <div className="flex gap-[18px] overflow-x-auto py-1.5 px-1 pb-[22px] mt-6" style={{ scrollSnapType: 'x mandatory' }}>
          {teamMembers.map((person) => (
            <div
              key={person.id}
              style={{ scrollSnapAlign: 'start' }}
              className="flex-none w-[288px] bg-white border border-[#ece4f4] rounded-[10px] p-[22px] hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(80,0,130,.14)] hover:border-williams-purple transition-all duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex-none w-[50px] h-[50px] rounded-full bg-[#f0e7f9] flex items-center justify-center font-[var(--font-slab)] font-bold text-lg text-williams-purple">
                  {getInitials(person.full_name)}
                </div>
                <div>
                  <div className="font-[var(--font-slab)] font-semibold text-lg text-[#241430] leading-tight">
                    {person.full_name}
                  </div>
                  <div className="text-[13px] text-[#8a7d9c] mt-0.5">
                    {person.year} · {person.sport}
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#f0eaf6] my-4.5" />

              <div className="flex flex-wrap gap-1.5">
                {person.looking_for?.map((item) => (
                  <span
                    key={item}
                    className="inline-block bg-[#f4ecfb] text-[#7a2ba0] text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}