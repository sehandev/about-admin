import Link from 'next/link'

export function SMSLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href={`sms:${children}`} className="underline underline-offset-4">
      {children}
    </Link>
  )
}
