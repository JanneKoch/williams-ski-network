'use client'

import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton' 
import SiteHeader from './SiteHeader'

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
      <SiteHeader />

      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3a0068] via-purple-dk to-purple-darker px-10 pt-40 pb-24">
        {/* floating blobs */}
        <div className="absolute top-[8%] right-[12%] w-[170px] h-[150px] bg-gold opacity-[.16] pointer-events-none rounded-[47%_53%_62%_38%/_56%_47%_53%_44%] animate-[float_9s_ease-in-out_infinite]" />
        <div className="absolute top-[48%] right-[5%] w-[90px] h-[84px] bg-magenta opacity-30 pointer-events-none rounded-[60%_40%_47%_53%/_45%_55%_45%_55%] animate-[float2_11s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-30px] left-[6%] w-[130px] h-[118px] bg-orange opacity-[.16] pointer-events-none rounded-[52%_48%_40%_60%/_50%_56%_44%_50%] animate-[float_13s_ease-in-out_infinite]" />
        <div className="absolute top-[22%] left-[3%] w-[54px] h-[50px] bg-gold opacity-[.22] pointer-events-none rounded-[50%_50%_44%_56%/_56%_44%_56%_44%] animate-[float2_8s_ease-in-out_infinite]" />
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
            <Link href="/blog" className="inline-flex items-center bg-transparent text-white font-semibold text-[15px] px-[26px] py-[15px] rounded-full border-[1.5px] border-white/35 hover:bg-white/10 hover:border-white transition-all">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* current team members */}
      <section className="max-w-[1240px] mx-auto px-10 pt-16 pb-10">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-[20px] tracking-[.2em] font-bold text-eyebrow mb-2.5">THE TEAM</div>
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
      {/* blog — placeholder until blog feature is built */}
<section className="bg-white border-t border-b border-[#eee3f5] mt-6">
  <div className="max-w-[1240px] mx-auto px-10 py-20">
    <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
      <div>
        <div className="text-[20px] tracking-[.2em] font-bold text-eyebrow mb-2.5">FROM THE BLOG</div>
      </div>
      <Link href="/blog" className="text-sm font-semibold text-williams-purple border-b-2 border-gold pb-0.5">
        All posts →
      </Link>
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
      {[
        { cat: 'TYPE', time: 'X min read', title: 'TITLE', byline: "AUTHOR 'XX · Month Day" },
        { cat: 'TYPE', time: 'X min read', title: 'TITLE', byline: "AUTHOR 'XX · Month Day" },
        { cat: 'TYPE', time: 'X min read', title: 'TITLE', byline: "AUTHOR 'XX · Month Day" },
      ].map((post) => (
        <div key={post.title} className="flex flex-col hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
          <div className="aspect-[16/10] rounded-lg bg-[repeating-linear-gradient(135deg,#efe9f6_0_12px,#e6dcf1_12px_24px)] flex items-center justify-center">
            <span className="font-mono text-[11px] tracking-[.1em] text-[#9b86b8]">{post.cat} · IMAGE</span>
          </div>
          <div className="flex items-center gap-2.5 mt-4">
            <span className="text-[11px] font-bold tracking-[.1em] text-eyebrow">{post.cat}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#c9bcda]" />
            <span className="text-[13px] text-[#8a7d9c]">{post.time}</span>
          </div>
          <h3 className="font-[var(--font-slab)] font-semibold text-[22px] leading-tight text-[#241430] tracking-tight mt-2">
            {post.title}
          </h3>
          <div className="text-sm text-[#6b6477] mt-auto pt-2">{post.byline}</div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* gallery — placeholder until photo upload is built */}
<section className="max-w-[1240px] mx-auto px-10 py-16">
  <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
    <div>
      <div className="text-[20px] tracking-[.2em] font-bold text-eyebrow mb-2.5">GALLERY</div>
    </div>
    <span className="text-sm font-semibold text-williams-purple border-b-2 border-gold pb-0.5 cursor-pointer">
      + Add photos
    </span>
  </div>

  <div className="grid grid-cols-4 auto-rows-[150px] gap-3">
    {[
      { label: 'GROUP PHOTO 2026', cols: 2, rows: 2 },
      { label: 'PODIUM · NCAAs', cols: 1, rows: 1 },
      { label: 'NORDIC LOOP', cols: 1, rows: 1 },
      { label: 'ALPINE GS', cols: 2, rows: 1 },
      { label: 'TRAILHEAD', cols: 2, rows: 1 },
    ].map((tile) => (
      <div
        key={tile.label}
        style={{ gridColumn: `span ${tile.cols}`, gridRow: `span ${tile.rows}` }}
        className="rounded-lg overflow-hidden flex items-end p-4 cursor-pointer hover:scale-[.985] transition-transform duration-300 bg-[repeating-linear-gradient(135deg,#efe9f6_0_14px,#e6dcf1_14px_28px)]"
      >
        <span className="font-mono text-[11px] tracking-[.1em] text-[#9b86b8]">{tile.label}</span>
      </div>
    ))}
  </div>
</section>

{/* footer */}
<footer className="bg-purple-dk text-white px-10 pt-[72px] pb-10 relative overflow-hidden">
  <div className="absolute bottom-[-60px] right-[-30px] w-[200px] h-[180px] bg-[#3a0a63] opacity-50 rounded-[47%_53%_62%_38%/_56%_47%_53%_44%] pointer-events-none" />
  <div className="relative max-w-[1240px] mx-auto grid grid-cols-[1.4fr_1fr_1fr] gap-10 items-start">
    <div>
      <div className="font-[var(--font-slab)] font-bold text-[46px] leading-[.95] tracking-tight">Williams</div>
      <div className="font-[var(--font-serif-accent)] italic text-[26px] text-gold mt-0.5">Ski Network</div>
      <p className="text-sm text-[#b89fd6] mt-4 max-w-[280px] leading-relaxed">
        An alumni network for the Williams College Ski Team Ephs — past, present, and future.
      </p>
    </div>
    <div>
      <h4 className="text-xs tracking-[.16em] font-bold text-[#9a7cc4] mb-4">EXPLORE</h4>
      <div className="flex flex-col gap-3">
        <Link href="/directory" className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors">Directory</Link>
        <Link href="/blog" className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors">Blog</Link>
        <Link href="#" className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors">Events</Link>
        <Link href="#" className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors">Gallery</Link>
      </div>
    </div>
    <div>
      <h4 className="text-xs tracking-[.16em] font-bold text-[#9a7cc4] mb-4">ACCOUNT</h4>
      <div className="flex flex-col gap-3">
        <Link href="/profile" className="text-[15px] text-[#e3d6f4] hover:text-gold transition-colors">Edit Profile</Link>
        <SignOutButton variant="footer" />
      </div>
    </div>
  </div>
  <div className="relative max-w-[1240px] mx-auto mt-12 pt-[22px] border-t border-white/[.12] flex justify-between flex-wrap gap-2.5">
    <span className="text-[13px] text-[#9a7cc4]">© 2026 Williams Ski Network · Not an official Williams College site</span>
    <span className="font-[var(--font-serif-accent)] italic text-sm text-gold">Stack Skulls.</span>
  </div>
</footer>
    </main>
  )
}