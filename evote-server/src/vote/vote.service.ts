import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
import * as snarkjs from 'snarkjs';
import { ethers } from 'ethers';

@Injectable()
export class VoteService {
	constructor(
		@InjectRepository(Vote)
		private voteRepository: Repository<Vote>,
		private blockchainService: BlockchainService
	) {}

	async castVote(electionId: number, citizenId: string, candidateId: string): Promise<boolean> {
		// Generate ZKP
		const { proof, publicSignals } = await this.generateZKP(citizenId, electionId);

		// Hash the citizen ID
		const hashedCitizenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(citizenId));

		// Submit vote to blockchain
		await this.blockchainService.castVote(electionId, candidateId, hashedCitizenId, {
			a: proof.pi_a,
			b: proof.pi_b,
			c: proof.pi_c,
			input: publicSignals
		});

		// Save vote in local database
		const vote = new Vote();
		vote.election = { id: electionId } as any;
		vote.hashedCitizenID = hashedCitizenId;
		await this.voteRepository.save(vote);

		return true;
	}

	private async generateZKP(citizenId: string, electionId: number): Promise<any> {
		const input = {
			citizenId: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(citizenId)),
			electionId: electionId,
			salt: Math.floor(Math.random() * 1000000),
		};

		const { proof, publicSignals } = await snarkjs.groth16.fullProve(
			input,
			'path/to/circuit.wasm',
			'path/to/circuit_final.zkey'
		);

		return { proof, publicSignals };
	}

	async getVoteCount(electionId: number, candidateId: string): Promise<number> {
		return this.blockchainService.getVoteCount(electionId, candidateId);
	}
}
