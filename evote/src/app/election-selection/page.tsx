'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

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

interface Election {
    electionID: number;
    electionName: string;
    startAt: Date;
    endsAt: Date;
    city?: string;
    state?: string;
    electionType: string;
}

export default function ElectionSelectionComponent() {
  const [elections, setElections] = useState([]); // State to hold elections
  const [citizen, setCitizen] = useState(null); // State to hold citizen data
  const [error, setError] = useState(null); // State to hold error messages
  const searchParams = useSearchParams();
  const citizenID = searchParams?.get("citizenID"); // Retrieve the citizenID from search parameters
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchCitizenData = async () => {
      if (citizenID) {
        try {
          const response = await fetch(`http://localhost:3000/citizen/${citizenID}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCitizen(data);

          const votersResponse = await fetch('/voters.json');
          const votersData = await votersResponse.json();

          const isRegisteredVoter = votersData.some((voter: { citizenID: string }) => voter.citizenID === data.citizenID);
          if (!isRegisteredVoter) {
            setError("You are not a registered voter.");
            return;
          }

          // Fetch federal elections
          const federalElectionsResponse = await fetch('http://localhost:3000/elections/federal');
          const federalElectionsData = await federalElectionsResponse.json();

          // Fetch city elections
          const cityElectionsResponse = await fetch(`http://localhost:3000/elections/by-city?city=${data.city}`);
          const cityElectionsData = await cityElectionsResponse.json();

          // Fetch province elections
          const provinceElectionsResponse = await fetch(`http://localhost:3000/elections/by-province?province=${data.state}`);
          const provinceElectionsData = await provinceElectionsResponse.json();

          // Combine all elections
          const allElections = [...federalElectionsData, ...cityElectionsData, ...provinceElectionsData];
          setElections(allElections);
        } catch (error) {
          console.error('Error fetching citizen data:', error);
          setError(error.message);
        }
      } else {
        setError("Citizen ID is missing.");
      }
    };

    fetchCitizenData();
  }, [citizenID]);

  return (
    <div className="container mx-auto px-4 py-8">
      {citizen && ( // Display citizen info if available
        <div className="mb-4 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl">
            Hello, <span className="font-semibold">{citizen.firstName} {citizen.middleName} {citizen.lastName}</span>!
          </h2>
          <p className="text-gray-500">Citizen ID: {citizen.citizenID}</p>
        </div>
      )}
      <h1 className="mt-10 mb-8 text-3xl font-bold">Available Elections</h1>
      {error && <p className="text-red-500">Error: {error}</p>} {/* Display error message */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {elections.length > 0 ? (
          elections.map((election) => (
            <Card key={election.electionID}>
              <CardHeader>
                <CardTitle>{election.electionName}</CardTitle>
                <CardDescription>Select to proceed to voting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Start: {new Date(election.startAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>End: {new Date(election.endsAt).toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push(`/ballot-display/${election.electionID}?election=${encodeURIComponent(JSON.stringify(election))}&citizen=${encodeURIComponent(JSON.stringify(citizen))}`)}
                >
                  Select Election
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No elections available for you.</p> // Message if no elections found
        )}
      </div>
    </div>
  )
}