'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import SignOutButton from '@/components/SignOutButton'

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      if (!headerRef.current) return
      headerRef.current.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-[18px] transition-all duration-300 [&.scrolled]:bg-purple-dk [&.scrolled]:shadow-[0_1px_0_rgba(255,255,255,.08)] [&.scrolled]:[backdrop-filter:blur(10px)]"
    >
      <nav className="flex items-center gap-7">
        <Link href="/directory" className="text-sm text-white/85 hover:text-white transition-opacity">Directory</Link>
        <Link href="/blog" className="text-sm text-white/85 hover:text-white transition-opacity">Blog</Link>
        <Link href="#" className="text-sm text-white/85 hover:text-white transition-opacity">Events</Link>
      </nav>
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gold text-purple-dk font-[var(--font-slab)] font-bold text-lg">W</span>
        <span className="font-[var(--font-slab)] font-semibold text-lg text-white">Williams Ski Network</span>
      </Link>
      <div className="flex items-center gap-[18px]">
        <Link href="/profile" className="text-sm text-white/85 hover:text-white transition-opacity">Edit Profile</Link>
        <SignOutButton variant="header" />
      </div>
    </header>
  )
}