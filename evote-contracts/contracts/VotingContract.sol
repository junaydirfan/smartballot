// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract VotingContract is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {
        // You can add any additional initialization logic here if needed
    }

    using ECDSA for bytes32;

    struct Election {
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(bytes32 => bool)) public hasVoted;
    mapping(uint256 => mapping(string => uint256)) public voteCounts;

    event ElectionCreated(uint256 indexed electionId, uint256 startTime, uint256 endTime);
    event VoteCast(uint256 indexed electionId, string indexed candidateId);

    function createElection(uint256 electionId, uint256 startTime, uint256 endTime) public onlyOwner {
        require(elections[electionId].isActive == false, "Election already exists");
        require(startTime < endTime, "Invalid election time range");

        elections[electionId] = Election(startTime, endTime, true);
        emit ElectionCreated(electionId, startTime, endTime);
    }

    function castVote(
        uint256 electionId,
        string memory candidateId,
        bytes32 hashedCitizenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        require(elections[electionId].isActive, "Election does not exist or is not active");
        require(block.timestamp >= elections[electionId].startTime && block.timestamp <= elections[electionId].endTime, "Election is not currently open");
        require(!hasVoted[electionId][hashedCitizenId], "Citizen has already voted in this election");

        // Verify ZKP
        require(verifyProof(a, b, c, input), "Invalid zero-knowledge proof");

        // Record vote
        hasVoted[electionId][hashedCitizenId] = true;
        voteCounts[electionId][candidateId]++;

        emit VoteCast(electionId, candidateId);
    }

    function getVoteCount(uint256 electionId, string memory candidateId) public view returns (uint256) {
        return voteCounts[electionId][candidateId];
    }

    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) internal view returns (bool) {
        // Implement ZKP verification logic here
        // This is a placeholder and should be replaced with actual verification
        return true;
    }
}