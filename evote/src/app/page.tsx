'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-20 w-20 text-blue-600" />
        <h1 className="mb-4 mt-8 text-4xl font-bold text-gray-900 sm:text-5xl">smartBallot</h1>
        <p className="mb-8 text-xl text-gray-600 max-w-[300px] mx-auto">Secure, transparent, auditable, and anonymous voting system</p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/voter-auth">
            <Button className="w-full sm:w-auto">
              Start Voting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/admin-login">
            <Button variant="outline" className="w-full sm:w-auto">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}