'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fingerprint } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { faker } from '@faker-js/faker/locale/en_CA' // Set locale to en_CA
import './styles.css' // Import your CSS file for animations
import { useEffect } from 'react'; // Import useEffect for fetching data

// Define the type for citizen data
type CitizenData = {
    citizenID: number;
    firstName: string;
    middleName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    dob: Date;
};

export default function VoterAuthComponent() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [fakeCitizen, setFakeCitizen] = useState<CitizenData | null>(null); // Allow null or CitizenData
  const [showData, setShowData] = useState(false); // New state to control visibility
  const [voterData, setVoterData] = useState<CitizenData[]>([]); // Array to hold voter data
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [issingleUserData, setIsSingleUserData] = useState(false);
  const [issingleUserDatad, setIsSingleUserDatad] = useState(false);

  const singleUserData = {
    "citizenID": 696969,
    "city": "Sherbrooke",
    "dob": "2007-08-01",
    "firstName": "Junaid",
    "lastName": "Irfan",
    "middleName": "",
    "state": "Quebec",
    "streetAddress": "4990 Carroll Junctions",
    "zipcode": "K3O 9O3"
};

  const generateFakeCitizenData = () => {
    return {
      citizenID: faker.number.int({ min: 1, max: 1000000 }), // Ensure a positive integer
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      streetAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipcode: faker.location.zipCode(),
      dob: faker.date.past({ years: 30 }) // Adjust age as needed
    };
  };

  // Fetch voter data from JSON file
  useEffect(() => {
    const fetchVoterData = async () => {
      const response = await fetch('/voters.json'); // Adjust the path if necessary
      const data = await response.json();
      setVoterData(data);
    };

    fetchVoterData();
  }, []); // Fetch data on component mount

  const handleAuthentication = async () => {
      setIsAuthenticating(true);
      
      // Generate fake citizen data immediately
      const citizenData: CitizenData = generateFakeCitizenData();
      console.log('Citizen Data to be sent:', citizenData); // Log the data

      // Send data to backend
      try {
          const response = await fetch('http://localhost:3000/citizen', { // Adjust the URL if necessary
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(citizenData),
          });

          console.log('Response status:', response.status); // Log the response status

          if (!response.ok) {
              throw new Error('Failed to save citizen data');
          }

          const responseData = await response.json(); // Log the response data
          console.log('Response from backend:', responseData);

          // Convert dob to a Date object if it's a string
          if (typeof responseData.dob === 'string') {
              responseData.dob = new Date(responseData.dob);
          }

          // Set the fake citizen data to state
          setFakeCitizen(responseData); // Assuming responseData contains the citizen data
          setShowData(true); // Show data after successful authentication

          // Pass only the citizenID to the election-selection page
          router.push(`/election-selection?citizenID=${responseData.citizenID}`);
      } catch (error) {
          console.error('Error:', error);
      }

      // Simulate authentication delay
      setTimeout(() => {
          setIsAuthenticating(false);
          setIsAuthenticated(true);
      }, 1000); // Reduced delay for faster feedback
  }

  const generateRandomVoterData = async () => {
    setIsGenerating(true);
    if (voterData.length === 0) return; // Check if voter data is available
    const randomIndex = Math.floor(Math.random() * voterData.length);
    const randomVoter = voterData[randomIndex];
    
    // Send the random voter data to the backend
    try {
        const response = await fetch('http://localhost:3000/citizen', { // Adjust the URL if necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(randomVoter), // Send the random voter data
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Failed to save citizen data');
        }

        const responseData = await response.json(); // Log the response data
        console.log('Response from backend:', responseData);

        // Convert dob to a Date object if it's a string
        if (typeof responseData.dob === 'string') {
            responseData.dob = new Date(responseData.dob);
        }

        // Set the fake citizen data to state
        setFakeCitizen(responseData); // Assuming responseData contains the citizen data
        setShowData(true); // Show data after successful authentication

        // Pass the random voter's citizenID to the election-selection page
        router.push(`/election-selection?citizenID=${responseData.citizenID}`);
    } catch (error) {
        console.error('Error:', error);
    }
	
	// Simulate authentication delay
      setTimeout(() => {
          setIsGenerating(false);
          setIsGenerated(true);
      }, 1000); // Reduced delay for faster feedback
  };

  const sendSingleUserData = async () => {
    setIsSingleUserData(true); // Set loading state
    try {
        const response = await fetch('http://localhost:3000/citizen', { // Adjust the URL if necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(singleUserData), // Send the single user data
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Failed to save single user data');
        }

        const responseData = await response.json(); // Log the response data
        console.log('Response from backend:', responseData);

        // Convert dob to a Date object if it's a string
        if (typeof responseData.dob === 'string') {
            responseData.dob = new Date(responseData.dob);
        }

        // Set the fake citizen data to state
        setFakeCitizen(responseData); // Assuming responseData contains the citizen data
        setShowData(true); // Show data after successful sending
        // Pass the single user's citizenID to the election-selection page
        router.push(`/election-selection?citizenID=${responseData.citizenID}`);
    } catch (error) {
        console.error('Error:', error);
    }

    setTimeout(() => {
        setIsSingleUserData(false);
        setIsSingleUserDatad(true);
    }, 1000); // Reduced delay for faster feedback
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <Card className="w-full max-w-md">
              <CardHeader>
                  <CardTitle>Voter Authentication</CardTitle>
                  <CardDescription>Please complete the biometric verification process</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                  {!isAuthenticated ? (
                      <Button
                          onClick={handleAuthentication}
                          disabled={isAuthenticating}
                          size="lg"
                          className="mt-4"
                      >
                          {isAuthenticating ? (
                              "Authenticating..."
                          ) : (
                              <>
                                  <Fingerprint className="mr-2 h-5 w-5" />
                                  Generate Random Data
                              </>
                          )}
                      </Button>
                  ) : (
                      <div className={`fade-in ${showData ? 'animate' : ''} transition-all duration-700 ease-out`}>
                          <h2 className="text-lg font-semibold">Generated Citizen Data:</h2>
                          {fakeCitizen && (
                              <ul className="mt-4">
                                  <li className="transition-opacity duration-300 delay-100">Citizen ID: {fakeCitizen.citizenID}</li>
                                  <li className="transition-opacity duration-300 delay-200">First Name: {fakeCitizen.firstName}</li>
                                  <li className="transition-opacity duration-300 delay-300">Middle Name: {fakeCitizen.middleName}</li>
                                  <li className="transition-opacity duration-300 delay-400">Last Name: {fakeCitizen.lastName}</li>
                                  <li className="transition-opacity duration-300 delay-500">Address: {fakeCitizen.streetAddress}, {fakeCitizen.city}, {fakeCitizen.state}, {fakeCitizen.zipcode}</li>
                                  <li className="transition-opacity duration-300 delay-600">Date of Birth: {fakeCitizen.dob.toLocaleDateString()}</li>
                              </ul>
                          )}
                      </div>
                  )}
                  {!isGenerated? (
                   <Button
                          onClick={generateRandomVoterData}
                          disabled={isGenerating}
                          size="lg"
                          className="mt-4"
                      >
                          {isGenerating ? (
                              "Generating..."
                          ) : (
                              <>
                                  <Fingerprint className="mr-2 h-5 w-5" />
                                  Generate Random Voter Data
                              </>
                          )}
                      </Button>
                  ) : (
                      <div className={`fade-in ${showData ? 'animate' : ''} transition-all duration-700 ease-out`}>
                          <h2 className="text-lg font-semibold">Generated Citizen Data:</h2>
                          {fakeCitizen && (
                              <ul className="mt-4">
                                  <li className="transition-opacity duration-300 delay-100">Citizen ID: {fakeCitizen.citizenID}</li>
                                  <li className="transition-opacity duration-300 delay-200">First Name: {fakeCitizen.firstName}</li>
                                  <li className="transition-opacity duration-300 delay-300">Middle Name: {fakeCitizen.middleName}</li>
                                  <li className="transition-opacity duration-300 delay-400">Last Name: {fakeCitizen.lastName}</li>
                                  <li className="transition-opacity duration-300 delay-500">Address: {fakeCitizen.streetAddress}, {fakeCitizen.city}, {fakeCitizen.state}, {fakeCitizen.zipcode}</li>
                                  <li className="transition-opacity duration-300 delay-600">Date of Birth: {fakeCitizen.dob.toLocaleDateString()}</li>
                              </ul>
                          )}
                      </div>
                  )}
                  {!issingleUserDatad ? (
                    <Button
                      onClick={sendSingleUserData}
                      size="lg"
                      className="mt-4"
                  >
                    {issingleUserData ? (
                      "Sending Single User Data..."
                    ) : (
                      <>
                        <Fingerprint className="mr-2 h-5 w-5" />
                        Send Single User Data
                      </>
                    )}
                  </Button>
                  ) : (
                    <div className={`fade-in ${showData ? 'animate' : ''} transition-all duration-700 ease-out`}>
                        <h2 className="text-lg font-semibold">Generated Citizen Data:</h2>
                        {fakeCitizen && (
                            <ul className="mt-4">
                                <li className="transition-opacity duration-300 delay-100">Citizen ID: {fakeCitizen.citizenID}</li>
                                <li className="transition-opacity duration-300 delay-200">First Name: {fakeCitizen.firstName}</li>
                                <li className="transition-opacity duration-300 delay-300">Middle Name: {fakeCitizen.middleName}</li>
                                <li className="transition-opacity duration-300 delay-400">Last Name: {fakeCitizen.lastName}</li>
                                <li className="transition-opacity duration-300 delay-500">Address: {fakeCitizen.streetAddress}, {fakeCitizen.city}, {fakeCitizen.state}, {fakeCitizen.zipcode}</li>
                                <li className="transition-opacity duration-300 delay-600">Date of Birth: {fakeCitizen.dob.toLocaleDateString()}</li>
                            </ul>
                        )}
                    </div>
                  )}
              </CardContent>
          </Card>
      </div>
  )
}