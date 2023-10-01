import Link from 'next/link'

export function SMSLink({ children }: { children: string }) {
  if (!isPhoneNumberValid(children)) {
    return <span>{children}</span>
  }

  return (
    <Link href={`sms:${children}`} className="underline underline-offset-4">
      {children}
    </Link>
  )
}

function isPhoneNumberValid(phoneNumber: string): boolean {
  return /^\d+$/.test(phoneNumber)
}
