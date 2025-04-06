'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from 'next/navigation';

interface Candidate {
  id: string
  name: string
  party: string
  votes: number
}

interface InteractiveVotingScreenProps {
  liveResults: boolean
  candidates: Candidate[]
  citizen: Citizen
}

export function InteractiveVotingScreenComponent({ liveResults, candidates: initialCandidates, citizen }: InteractiveVotingScreenProps & { citizen: Citizen }) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)

  const { id: electionId } = useParams();

  useEffect(() => {
    setTotalVotes(candidates.reduce((sum, candidate) => sum + candidate.votes, 0))
  }, [candidates])

  const handleVote = () => {
    if (!selectedCandidate) {
      setError('Please select a candidate before submitting your vote.')
      return
    }
    setError(null)
    setIsDialogOpen(true)
  }

  const confirmVote = async () => {
    try {
      const response = await fetch('http://localhost:3000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          electionId: Number(electionId),
          citizenId: citizen.citizenID,
          candidateId: selectedCandidate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cast vote');
      }

      setIsDialogOpen(false);
      setIsVoteSubmitted(true);

      // Update vote counts if live results are enabled
      if (liveResults) {
        const updatedCandidates = await Promise.all(
          candidates.map(async (candidate) => {
            const voteCount = await fetch(`http://localhost:3000/vote/${electionId}/${candidate.id}`).then(res => res.json());
            return { ...candidate, votes: voteCount };
          })
        );
        setCandidates(updatedCandidates);
      }
    } catch (error) {
      setError('Failed to cast vote. Please try again.');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Cast Your Vote</CardTitle>
          <CardDescription>Select your preferred candidate and submit your vote</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={setSelectedCandidate}
            className="space-y-4"
            value={selectedCandidate || undefined}
          >
            {candidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                className="flex items-center space-x-2 border p-4 rounded-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem 
                  value={candidate.id} 
                  id={candidate.id}
                />
                <Label 
                  htmlFor={candidate.id} 
                  className="flex-grow cursor-pointer"
                >
                  <span className="font-medium">{candidate.name}</span>
                  <span className="ml-2 text-gray-500">({candidate.party})</span>
                </Label>
                {liveResults && (
                  <>
                    <span className="text-sm font-semibold">
                      {candidate.votes} votes
                    </span>
                    <div 
                      className="w-1 h-6 bg-primary"
                      style={{
                        transform: `scaleY(${candidate.votes / (totalVotes || 1)})`,
                        transformOrigin: 'bottom',
                        transition: 'transform 0.5s ease-out'
                      }}
                    />
                  </>
                )}
              </motion.div>
            ))}
          </RadioGroup>
          {!liveResults && (
            <div className="mt-4 flex items-center justify-center text-gray-500">
              <EyeOff className="mr-2 h-5 w-5" />
              <span>Live results are not available for this election</span>
            </div>
          )}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center text-red-500"
              >
                <AlertCircle className="mr-2 h-5 w-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button 
            onClick={handleVote} 
            className="mt-6 w-full"
            disabled={isVoteSubmitted}
          >
            {isVoteSubmitted ? 'Vote Submitted' : 'Submit Vote'}
          </Button>
          {isVoteSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center text-green-500"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Your vote has been recorded. Thank you for participating!</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Are you sure you want to cast your vote for {candidates.find(c => c.id === selectedCandidate)?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmVote}>Confirm Vote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}