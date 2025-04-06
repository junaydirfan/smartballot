'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'; // Use useSearchParams instead of useRouter
import { InteractiveVotingScreenComponent } from '@/components/interactive-voting-screen'

interface Candidate {
  id: string
  name: string
  party: string
  votes: number
}

interface Election {
  liveResults: boolean
  name: string
  status: string // Add status field
}

interface Citizen {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  citizenID?: string;
  streetAddress?: string; 
  city?: string;          
  state?: string;         
  zipcode?: string;       
  dob?: Date;             
}

async function fetchElectionData(electionId: string): Promise<Election | null> {
  const response = await fetch(`http://localhost:3000/elections/${electionId}`)
  if (!response.ok) {
    if (response.status === 404) {
      return null // Election not found or not ongoing
    }
    throw new Error('Failed to fetch election data')
  }
  return response.json()
}

async function fetchCandidates(electionId: string): Promise<Candidate[]> {
  const response = await fetch(`http://localhost:3000/elections/${electionId}/candidates`)
  if (!response.ok) {
    throw new Error('Failed to fetch candidates')
  }
  return response.json()
}

export default function BallotDisplayPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [liveResults, setLiveResults] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [electionName, setElectionName] = useState<string>('')
  const [citizen, setCitizen] = useState<Citizen | null>(null)

  useEffect(() => {
    const loadElectionData = async () => {
      try {
        const electionData = await fetchElectionData(params.id)
        
        if (!electionData) {
          setError('This election is not currently ongoing or does not exist.')
          setLoading(false)
          return
        }

        setLiveResults(electionData.liveResults)
        setElectionName(electionData.name)

        const citizenData = JSON.parse(decodeURIComponent(searchParams?.get('citizen') || '{}'))
        setCitizen(citizenData)

        const candidatesData = await fetchCandidates(params.id)
        setCandidates(candidatesData)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadElectionData()
  }, [params.id, searchParams])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>{electionName || 'Election Name Not Available'}</h1>
      {citizen && (
        <div>
          <h2>Welcome, {citizen.firstName} {citizen.middleName} {citizen.lastName}</h2>
          <p>Citizen ID: {citizen.citizenID}</p>
          <p>Address: {citizen.streetAddress}, {citizen.city}, {citizen.state}, {citizen.zipcode}</p>
          <p>Date of Birth: {citizen.dob ? new Date(citizen.dob).toLocaleDateString() : 'Not available'}</p>
        </div>
      )}
      <InteractiveVotingScreenComponent liveResults={liveResults} candidates={candidates} />
    </div>
  )
}