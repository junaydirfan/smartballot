'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function VoteConfirmationComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Vote Cast Successfully</CardTitle>
          <CardDescription>Your vote has been securely recorded on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <p className="mt-4 text-lg">Thank you for participating in the democratic process!</p>
          <div className="mt-6 space-y-4">
            <Link href="/election-results">
              <Button variant="outline" className="w-full">
                View Election Results
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}