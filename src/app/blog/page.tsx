import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <SiteHeader />
      <div className="flex flex-col items-center justify-center pt-40 text-center px-8">
        <div className="text-sm tracking-[.2em] font-bold text-eyebrow mb-4">FROM THE BLOG</div>
        <h1 className="font-[var(--font-slab)] font-bold text-[clamp(36px,5vw,64px)] text-[#241430] leading-tight mb-4">
          Coming soon.
        </h1>
        <p className="text-[#8a7d9c] text-lg max-w-md">
          Stories, trip reports, and career dispatches from the Williams ski community. Check back soon.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center gap-2 bg-gold text-purple-dk font-bold text-[15px] px-[26px] py-[15px] rounded-full hover:-translate-y-0.5 transition-all">
          ← Back to home
        </Link>
      </div>
    </main>
  )
}