'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, end, className, children }) {
  const pathname = usePathname()

  const isActive = end
    ? pathname === href
    : pathname.startsWith(href)

  const computedClassName = typeof className === 'function'
    ? className({ isActive })
    : className

  return (
    <Link href={href} className={computedClassName}>
      {children}
    </Link>
  )
}
