// app/login/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SignIn, useUser } from '@clerk/nextjs'

export default function LoginPage() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [isSignedIn, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignIn redirectUrl="/admin/dashboard" />
      </div>
    </div>
  )
}