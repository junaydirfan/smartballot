'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, PlusCircle } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cityData from './canadacities.csv';

type CityData = {
  city: string;
  province_name: string;
};

export default function ElectionSetupComponent() {
  const [electionName, setElectionName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [candidates, setCandidates] = useState([{ name: "", party: "" }])
  const [electionType, setElectionType] = useState("")
  const [provinces, setProvinces] = useState<string[]>([])
  const [cities, setCities] = useState<{ [key: string]: string[] }>({})
  const [selectedProvince, setSelectedProvince] = useState("")
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState("")
  const [liveResults, setLiveResults] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [electionDetails, setElectionDetails] = useState<any>(null)

  useEffect(() => {
    // Set default start and end times
    const currentTime = new Date();
    const adjustedCurrentTime = new Date(currentTime.getTime() - 4 * 60 * 60 * 1000); // Subtract 4 hours

    const startTimeDefault = new Date(adjustedCurrentTime.getTime() + 10 * 60 * 1000); // Current time + 10 minutes
    const endTimeDefault = new Date(startTimeDefault.getTime() + 60 * 60 * 1000); // Start time + 1 hour

    setStartTime(startTimeDefault.toISOString().slice(0, 16)); // Format to 'YYYY-MM-DDTHH:MM'
    setEndTime(endTimeDefault.toISOString().slice(0, 16)); // Format to 'YYYY-MM-DDTHH:MM'

    const provinceSet = new Set<string>();
    const cityMap: { [key: string]: string[] } = {};

    // Parse the imported CSV data
    const rows = cityData.trim().split('\n').map(row => row.split(',').map(cell => cell.replace(/"/g, '').trim()));
    const headers = rows[0]; // Assuming the first row contains headers

    const validProvinces = [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Nova Scotia", "Ontario",
      "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories",
      "Yukon", "Nunavut"
    ];

    rows.slice(1).forEach((row) => {
      const city = row[headers.indexOf('city')];
      const province = row[headers.indexOf('province_name')];

      // Only add valid province names to the set
      if (province && validProvinces.includes(province)) {
        provinceSet.add(province);
      }

      // Add city to the corresponding province
      if (!cityMap[province]) {
        cityMap[province] = [];
      }
      cityMap[province].push(city);
    });

    // Update state with unique provinces and cities
    const uniqueProvinces = Array.from(provinceSet);
    setProvinces(uniqueProvinces);
    setCities(cityMap);

    // Log the parsed data
    console.log("Unique Provinces:", uniqueProvinces);
    console.log("City Map:", cityMap);
  }, [])

  const handleElectionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setElectionType(type);
    
    // Reset selected city and province when changing to Provincial/Territorial
    if (type === "Provincial/Territorial") {
      setSelectedCity(""); // Reset selected city
      setSelectedProvince(""); // Reset selected province
    }
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setFilteredCities(cities[province] || []); // Update filtered cities based on selected province
    
    // Reset selected city when province changes
    setSelectedCity(""); // Reset selected city
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value)
  }

  const addCandidate = () => {
    setCandidates([...candidates, { name: "", party: "" }])
  }

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  const updateCandidate = (index: number, field: "name" | "party", value: string) => {
    const updatedCandidates = [...candidates]
    updatedCandidates[index][field] = value
    setCandidates(updatedCandidates)
  }

  const createElection = async () => {
    try {
      // Adjust startAt and endsAt to be 4 hours behind
      const startTimeUTC = new Date(new Date(startTime).getTime() - 4 * 60 * 60 * 1000).toISOString(); // Subtract 4 hours
      const endTimeUTC = new Date(new Date(endTime).getTime() - 4 * 60 * 60 * 1000).toISOString(); // Subtract 4 hours

      const electionData = {
        electionName,
        startAt: startTimeUTC,
        endsAt: endTimeUTC,
        province: selectedProvince,
        city: selectedCity,
        electionType,
        liveResults,
        candidates: candidates.map(candidate => ({
          name: candidate.name,
          party: candidate.party,
        })),
        organizerID: 1,
      };

      console.log("Sending election data:", electionData);

      const response = await fetch('http://localhost:3000/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(electionData),
      });

      console.log("Response status:", response.status);
      // Read the response body only once
      const responseText = await response.text(); // Read as text first
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to create election: ${responseText}`);
      }

      const result = JSON.parse(responseText); // Parse the text to JSON
      setElectionDetails(result); // Store the election details
      setPopupVisible(true); // Show the popup

      // Redirect to admin dashboard after 3 seconds
      setTimeout(() => {
        window.location.href = '/admin-dashboard'; // Redirect to admin dashboard
      }, 3000);

      return result;
    } catch (error) {
      console.error("Error creating election:", error);
      const errorMessage = (error as Error).message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    const currentTime = new Date();
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);

    // Check if start time is in the past
    if (startTimeDate < currentTime) {
      toast.error("Start time cannot be in the past.");
      return;
    }

    // Check if start time is more than 10 years in the future
    const tenYearsFromNow = new Date();
    tenYearsFromNow.setFullYear(currentTime.getFullYear() + 10);
    if (startTimeDate > tenYearsFromNow) {
      toast.error("Start time cannot be more than 10 years in the future.");
      return;
    }

    // Check if end time is after start time
    if (endTimeDate <= startTimeDate) {
      toast.error("End time must be after the start time.");
      return;
    }

    // Check if a city is selected for Municipal/Local elections
    if (electionType === "Municipal/Local" && !selectedCity) {
      toast.error("Please select a city.");
      return;
    }

    // Validate candidates
    const validCandidates = candidates.filter(candidate => candidate.name && candidate.party);
    if (validCandidates.length < 2) {
      toast.error("Please enter at least two candidates with valid names and parties.");
      return;
    }

    // Ensure selectedCity and selectedProvince are null for Provincial elections
    if (electionType === "Provincial/Territorial") {
      setSelectedCity(""); // Ensure selected city is reset
      setSelectedProvince(""); // Ensure selected province is reset
    }

    try {
      const result = await createElection();
      if (result) {
        toast.success("Election created successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while creating the election.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <Card className="mx-auto max-w-2xl shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Election Setup</CardTitle>
          <CardDescription className="text-gray-500">Create a new election by filling out the details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="electionType" className="block text-sm font-medium text-gray-700">Election Type</Label>
              <select
                id="electionType"
                value={electionType}
                onChange={handleElectionTypeChange} // Updated to use the new handler
                required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              >
                <option value="">Select Election Type</option>
                <option value="Federal">Federal</option>
                <option value="Provincial/Territorial">Provincial/Territorial</option>
                <option value="Municipal/Local">Municipal/Local</option>
              </select>
            </div>

            {electionType === "Provincial/Territorial" && (
              <div className="space-y-2">
                <Label htmlFor="province" className="block text-sm font-medium text-gray-700">Select Province</Label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            )}

            {electionType === "Municipal/Local" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="province" className="block text-sm font-medium text-gray-700">Select Province</Label>
                  <select
                    id="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="block text-sm font-medium text-gray-700">Select City</Label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  >
                    <option value="">Select City</option>
                    {filteredCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="electionName">Election Name</Label>
              <Input
                id="electionName"
                value={electionName}
                onChange={(e) => setElectionName(e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Candidates</Label>
              {candidates.map((candidate, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Candidate Name"
                    value={candidate.name}
                    onChange={(e) => updateCandidate(index, "name", e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                  <Input
                    placeholder="Party"
                    value={candidate.party}
                    onChange={(e) => updateCandidate(index, "party", e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                  <Button type="button" variant="ghost" onClick={() => removeCandidate(index)}>
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addCandidate} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Candidate
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="liveResults"
                  type="checkbox"
                  checked={liveResults}
                  onChange={(e) => setLiveResults(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
                />
                <Label htmlFor="liveResults" className="text-sm font-medium text-gray-700">
                  Enable Live Results
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
              Create Election
            </Button>
          </form>
        </CardContent>
      </Card>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Election Created!</h2>
            <p>ID: {electionDetails?.id}</p>
            <p>Name: {electionDetails?.electionName}</p>
            <p>Start Time: {electionDetails?.startAt}</p>
            <p>End Time: {electionDetails?.endsAt}</p>
            <p>Province: {electionDetails?.province}</p>
            <p>City: {electionDetails?.city}</p>
            <button onClick={() => setPopupVisible(false)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}