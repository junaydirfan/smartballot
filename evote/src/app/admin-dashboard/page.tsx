'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, BarChart3, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardComponent() {
  const [elections, setElections] = useState([])

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('http://localhost:3000/elections') // Update this URL as needed
        const data = await response.json()
        setElections(data)
      } catch (error) {
        console.error("Error fetching elections:", error)
      }
    }

    fetchElections()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "ongoing":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "over":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "over":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold text-center">Admin Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-1"> {/* Change to a single column layout */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Create New Election</CardTitle>
            <CardDescription className="text-sm text-gray-600">Set up a new election with custom parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/election-setup">
              <Button className="w-full py-3 text-lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Election
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monitor Elections</CardTitle>
            <CardDescription className="text-sm text-gray-600">View and manage existing elections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {elections.map((election: any) => (
                <div key={election.electionID} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div>
                    <h3 className="font-semibold text-lg">{election.electionName}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Start:</span> {new Date(new Date(election.startAt).getTime() + 4 * 60 * 60 * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} {/* Adjusted for timezone */}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Ends:</span> {new Date(new Date(election.endsAt).getTime() + 4 * 60 * 60 * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} {/* Adjusted for timezone */}
                    </p>
                    {election.city && election.city !== "Sample City" && election.province && election.province !== "Sample Province" ? (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Location:</span> {election.city}, {election.province}
                      </p>
                    ) : (
                      election.city && election.city !== "Sample City" ? (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">City:</span> {election.city}
                        </p>
                      ) : (
                        election.province && election.province !== "Sample Province" && (
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Province:</span> {election.province}
                          </p>
                        )
                      )
                    )}
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Type:</span> {election.electionType}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className={getStatusColor(election.status)}>
                      {getStatusIcon(election.status)}
                      <span className="ml-1 capitalize">{election.status}</span>
                    </Badge>
                    <Link href={`/election-details/${election.electionID}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}