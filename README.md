# 🗳️ SmartBallot

**SmartBallot** is a modern, blockchain-based voting platform built to ensure **security**, **transparency**, **accessibility**, and **privacy** in electoral processes. Designed with emerging technologies like **Zero Knowledge Proofs** and **blockchain**, SmartBallot is a scalable and compliant solution that redefines how digital voting systems can work in the real world.

> 🏆 This project was awarded **Runner-Up** at the **Eviden & Bishop's University SecureVote Hackathon 2024**.

---

## 📌 Table of Contents

- [Introduction](#introduction)
- [Vision](#vision)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
  - [App Flow](#app-flow)
  - [Zero Knowledge Proofs (ZKP)](#zero-knowledge-proofs-zkp)
- [Data Protection & Privacy](#data-protection--privacy)
- [Voter Assistance](#voter-assistance)
- [Compliance](#compliance)
- [Hackathon Achievement](#hackathon-achievement)
- [Diagrams](#diagrams)
- [License](#license)

---

## 🧭 Introduction

Elections are the backbone of any democratic system. To ensure their integrity, voting systems must be:

- ✅ **Secure**
- ✅ **Accessible**
- ✅ **Scalable**
- ✅ **Anonymous**
- ✅ **Compliant**

SmartBallot leverages modern cryptographic and blockchain tools to meet all these requirements while keeping the user experience simple and intuitive.

---

## 🌍 Vision

SmartBallot aims to **revolutionize voting** by:
- Enhancing **security** and **transparency**
- Ensuring **accessibility** for all eligible voters
- Eliminating **voter fraud**
- Respecting **data privacy** and legal **compliance**
- Continuously evolving with emerging technologies and best practices

---

## 🚀 Key Features

- 🔐 **User Authentication & Admin Management**
- ⏱️ **Real-time Voting**
- 🔗 **Blockchain Integration** for immutability and trust
- 🧠 **Zero Knowledge Proofs** to preserve voter privacy
- 🧾 **External Voter Verification** with secure APIs
- ♿ **Comprehensive Accessibility Options**

---

## 🛠️ Technology Stack

| Layer         | Tech Used |
|---------------|-----------|
| **Frontend**  | Next.js (App Router) |
| **Backend**   | NestJS + TypeORM |
| **Blockchain**| Hardhat (Smart Contracts) |
| **Database**  | SQLite |
| **Authorization** | Cerbos (Policy-Based Access Control) |
| **External APIs** | Secure integration with government databases for voter verification |

---

## 🔄 App Flow

1. **Voter signs in** through MFA and verification APIs
2. **Eligibility verified** via ZKPs
3. **Ballot displayed** — voter selects candidate
4. **ZKP generated off-chain** to confirm eligibility without revealing identity
5. **Vote cast** on-chain, anonymously
6. **Result tallying** in real-time via blockchain

---

## 🧩 Zero Knowledge Proofs (ZKP)

ZKPs are used to validate that a voter is eligible **without revealing any personal data or vote choice**.

- Voters generate a ZKP off-chain
- The ZKP proves eligibility
- Vote is then submitted on-chain, fully anonymized

**Key Libraries:**
- `@openzeppelin/contracts/access/Ownable.sol`
- `@openzeppelin/contracts/utils/cryptography/ECDSA.sol`

---

## 🔐 Data Protection & Privacy

- ❌ No storage of vote-candidate relationships
- 🔒 Cryptographic hashing (SHA-256) of voter identities
- 🔐 HTTPS/TLS for data in transit + at-rest encryption

---

## 🧑‍🦽 Voter Assistance

- 📞 **Request Assistance** via in-app button
- ✅ **Trusted Assistant Option** for physical help
- ⚠️ Emergency handling protocols maintain flow and integrity

---

## 📋 Compliance

- ✅ Multi-Factor Authentication
- ✅ One Vote Per Eligible Voter (enforced with blockchain + ZKP)
- ✅ Minimal, lawful data retrieval for identity checks

---

## 🏅 Hackathon Achievement

> 🎉 **SmartBallot** was awarded **Runner-Up** at the **Eviden & Bishop's University SecureVote Hackathon 2024**, recognizing its strong implementation of secure and accessible voting technologies.

---

## 🖼️ Diagrams

This project includes detailed diagrams to demonstrate:

- App Flow
- Frontend Architecture
- Backend Architecture
- Smart Contract Design
- ZKP Verification Flow

You can find them in the [`/diagrams`](./diagrams) folder.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

**Made with ❤️**
