import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as VotingContractABI from './VotingContract.json';

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // Update with your provider URL
    const contractAddress = '0x...'; // Replace with your deployed contract address
    const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', this.provider); // Replace with your wallet's private key
    this.contract = new ethers.Contract(contractAddress, VotingContractABI.abi, signer);
  }

  async createElection(electionId: number, startTime: number, endTime: number): Promise<void> {
    const tx = await this.contract.createElection(electionId, startTime, endTime);
    await tx.wait();
  }

  async castVote(
    electionId: number,
    candidateId: string,
    hashedCitizenId: string,
    zkProof: any // Replace 'any' with the appropriate type for your ZK proof
  ): Promise<void> {
    const tx = await this.contract.castVote(
      electionId,
      candidateId,
      hashedCitizenId,
      zkProof.a,
      zkProof.b,
      zkProof.c,
      zkProof.input
    );
    await tx.wait();
  }

  async getVoteCount(electionId: number, candidateId: string): Promise<number> {
    const count = await this.contract.getVoteCount(electionId, candidateId);
    return count.toNumber();
  }
}
