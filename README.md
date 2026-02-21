B³ Hackathon Platform
<p align="center"> <img src="https://raw.githubusercontent.com/vinnovateit/b3/main/public/images/logo.png" alt="B3 Logo" width="160"/> </p> <p align="center"> <strong>Official Management Platform for B³ — A Blockchain Hackathon by VinnovateIT</strong> </p> <p align="center"> <a href="https://github.com/vinnovateit/b3/blob/main/LICENSE"> <img src="https://img.shields.io/badge/license-MIT-black" /> </a> <img src="https://img.shields.io/badge/Next.js-14-black" /> <img src="https://img.shields.io/badge/Prisma-ORM-blue" /> <img src="https://img.shields.io/badge/Database-MongoDB-green" /> <img src="https://img.shields.io/badge/Auth-NextAuth-purple" /> <img src="https://img.shields.io/badge/Deployment-Cloudflare-orange" /> </p>
About The Project

B³ is a full-stack hackathon management system built to handle the complete operational lifecycle of a blockchain-based hackathon.

The platform was developed to replace fragmented tools like Google Forms, spreadsheets, and manual scoring systems with a structured, scalable, and secure web application.

It enables:

Participant registration and team creation

Project submission management

Role-based authentication

Judge evaluation dashboards

Automated score aggregation

Final result generation

This system ensures transparency, efficiency, and smooth coordination between participants, judges, and organizers.

Platform Preview

Replace the image paths below with your actual screenshots.

<p align="center"> <img src="https://raw.githubusercontent.com/vinnovateit/b3/main/public/images/landing-preview.png" width="85%" /> </p> <p align="center"> <img src="https://raw.githubusercontent.com/vinnovateit/b3/main/public/images/dashboard-preview.png" width="85%" /> </p>
Architecture Overview
Participants → Registration System → Database
Judges       → Evaluation Dashboard → Score Engine
Admin        → Management Panel → Result Generator

Built using a modular full-stack architecture powered by Next.js App Router and Prisma ORM.

Core Modules
1. Participant System

Secure authentication

Team creation and management

Project submission interface

Submission status tracking

2. Judge Dashboard

Role-based access control

Structured scoring rubric

Score submission and editing

Controlled visibility of assigned teams

3. Admin Panel

Manage teams and participants

Assign judges

Monitor evaluation progress

Trigger result aggregation

4. Result Engine

Automatic score calculation

Ranking logic

Structured result publishing

Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

Backend

Next.js API routes

Node.js runtime

Database

MongoDB

Prisma ORM

Authentication

NextAuth.js

Deployment

Cloudflare (via open-next configuration)

Folder Structure
b3/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   ├── images/
│   ├── fonts/
│   ├── svgs/
│   └── backgrounds/
│
├── src/
│   ├── app/
│   ├── lib/
│   ├── auth.ts
│   └── middleware.ts
│
├── open-next.config.ts
├── prisma.config.ts
├── next.config.mjs
└── package.json
Getting Started
Prerequisites

Node.js v18+

MongoDB instance

npm

Installation
git clone https://github.com/vinnovateit/b3.git
cd b3
npm install
Environment Variables

Create a .env file:

DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
Prisma Setup
npx prisma generate
npx prisma db push
Run Development Server
npm run dev

Visit:
http://localhost:3000

Security Model

Role-based route protection using middleware

Server-side session validation via NextAuth

Database access abstraction through Prisma

Environment-based secret management

Future Roadmap

Blockchain-based certificate issuance

On-chain score verification

Live leaderboard

Automated email workflows

Advanced analytics dashboard

Contributing

We welcome contributions from the VinnovateIT community.

Fork the repository

Create a branch

Commit changes

Submit a Pull Request

Maintain modular architecture and follow project structure conventions.

License

This project is licensed under the MIT License. See the LICENSE file for details.
