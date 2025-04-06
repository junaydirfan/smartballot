'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Download, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import voterData from '../../../../public/voters.json';

interface Candidate {
  candidate: string;
  party: string;
  votes: number;
}

async function fetchCandidates(electionId: string): Promise<Candidate[]> {
  const response = await fetch(`http://localhost:3000/elections/${electionId}/candidates`)
  if (!response.ok) {
    throw new Error('Failed to fetch candidates')
  }
  return response.json()
}

export default function ElectionDetailsComponent() {
  console.log("ElectionDetailsComponent mounted"); // Log when the component mounts
  const [activeTab, setActiveTab] = useState('overview');
  const { id } = useParams<{ id: string }>() || { id: '' };
  console.log("Retrieved ID:", id); // Log the retrieved ID
  const [electionData, setElectionData] = useState<any>(null); // Initialize as null
  const [totalVoters, setTotalVoters] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]); // Initialize candidates state

  useEffect(() => {
    console.log("useEffect triggered with ID:", id); // Log when useEffect is triggered
    if (id) {
      console.log("Valid ID, proceeding with fetch..."); // Log if ID is valid
      console.log("About to fetch election data..."); // Log before fetch
      fetch(`http://localhost:3000/elections/${id}`)
        .then(response => {
          console.log("Response Status:", response.status); // Log the response status
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(async (data: any) => {
          console.log("Fetched election data:", data); // Log the fetched data
          setElectionData({
            name: data.electionName, // Update to match backend response
            totalVoters: 0, // Initialize as needed
            votesCast: 0, // Initialize as needed
            voterTurnout: 0, // Initialize as needed
            startDate: data.startAt, // Update to match backend response
            endDate: data.endsAt, // Update to match backend response
            status: data.status, // Update to match backend response
            province: data.province, // Add if needed
            city: data.city, // Add if needed
            electionType: data.electionType, // Add if needed
            results: data.results // Add results from the backend
          });
          const candidatesData = await fetchCandidates(id);
          setCandidates(candidatesData);
          console.log("Election Data Set:", electionData); // Log the election data after setting
          calculateTotalVoters(data); // Ensure this function is called with the fetched data
        })
        .catch((error: any) => {
          console.error("Error fetching election data:", error);
          setError(error);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("Invalid ID, skipping fetch."); // Log if ID is invalid
    }
  }, [id]);

  const calculateTotalVoters = (electionData: any) => {
    if (!electionData || !electionData.electionType) return; // Exit early if no election data is available or election type is missing

    try {
      let votersCount = 0; // Initialize a counter for total voters
      console.log("Election Type:", electionData.electionType); // Log election type
      console.log("Province:", electionData.province); // Log province being used
      console.log("City:", electionData.city); // Log city being used

      if (electionData.electionType === 'Federal') {
        votersCount = voterData.length; // Count all instances for Presidential elections
      } else if (electionData.electionType === 'Provincial/Territorial') {
        console.log("Filtering by Province:", electionData.province); // Log province being used
        const filteredVoters = voterData.filter(voter => voter.state === electionData.province);
        votersCount = filteredVoters.length; // Match by province
        console.log("Filtered Provincial Voters:", filteredVoters); // Log filtered voters
      } else if (electionData.electionType === 'Municipal/Local') {
        console.log("Filtering by City:", electionData.city); // Log city being used
        const filteredVoters = voterData.filter(voter => voter.city === electionData.city);
        votersCount = filteredVoters.length; // Match by city
        console.log("Filtered Municipal Voters:", filteredVoters); // Log filtered voters
      }

      setTotalVoters(votersCount); // Set total voters based on the calculated count
      console.log("Total Voters Count:", votersCount); // Log the total voters count
    } catch (error) {
      console.error("Error fetching voter data:", error instanceof Error ? error.message : error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "ongoing":
        return <BarChart className="h-5 w-5 text-green-500" />
      case "over":
        return <CheckCircle className="h-5 w-5 text-gray-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "text-blue-700 bg-blue-100"
      case "ongoing":
        return "text-green-700 bg-green-100"
      case "over":
        return "text-gray-700 bg-gray-100"
      default:
        return "text-red-700 bg-red-100"
    }
  }

  const handleDownloadReport = () => {
    console.log("Downloading election report...")
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }
  if (error) {
    return <div>Error: {error}</div>; // Handle errors by displaying an error message
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{electionData?.name || 'Election Name'}</h1>
        <div className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(electionData?.status || 'unknown')}`}>
          {getStatusIcon(electionData?.status || 'unknown')}
          <span className="ml-2 capitalize">{electionData?.status || 'Unknown'}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registered Voters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVoters?.toLocaleString() || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{electionData.votesCast?.toLocaleString() || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{electionData.voterTurnout}%</div>
                <Progress value={electionData.voterTurnout} className="h-2" />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Election Timeline</CardTitle>
              <CardDescription>Start and end times for the election</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Start Time:</span>
                <span>{new Date(new Date(electionData.startDate).getTime() + 4 * 60 * 60 * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span> {/* Adjusted for timezone */}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Time:</span>
                <span>{new Date(new Date(electionData.endDate).getTime() + 4 * 60 * 60 * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span> {/* Adjusted for timezone */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Election Results</CardTitle>
              <CardDescription>Current standing of candidates</CardDescription>
            </CardHeader>
            <CardContent>
              {candidates.length > 0 ? (
                candidates.map((result, index) => (
                  <div key={index} className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">
                        {result.name} <span className="text-gray-600">({result.party})</span> {/* Display party name without extra spacing */}
                      </span>
                      <span>{result.votes?.toLocaleString() || 0} votes</span> {/* Display votes */}
                    </div>
                    <Progress value={result.votes} className="h-2 w-full" />
                  </div>
                ))
              ) : (
                <div>No results available</div> // Fallback message if no candidates
              )}
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={handleDownloadReport}>
              Download Report
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}