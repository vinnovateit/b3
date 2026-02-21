# README

# B³ Hackathon Platform

Official hackathon management platform built for **B³ (B Cube)** — a blockchain-based hackathon organized by VinnovateIT.

This platform was developed to manage the complete lifecycle of the event, including participant registration, team management, judge evaluation, and result aggregation through a structured and role-based workflow system.

---

## Overview

The B³ Hackathon Platform is a full-stack web application designed to eliminate manual workflows and replace them with a centralized, scalable system.

The platform handles:

- Participant registration and team creation
- Project submissions
- Role-based authentication
- Judge evaluation dashboards
- Automated score aggregation
- Result generation

It ensures operational efficiency, transparency, and structured coordination between organizers, judges, and participants.

---

## Core Features

### Participant Module

- Secure authentication
- Team creation and management
- Project submission interface
- Dashboard access

### Judge Panel

- Role-based access control
- Structured evaluation rubric
- Score submission system
- Controlled project visibility

### Admin Controls

- Manage participants and teams
- Monitor submissions
- Track evaluation progress
- Generate final results

### Result Engine

- Automated score aggregation
- Ranking logic
- Centralized result publishing

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API routes
- Node.js runtime

### Database

- MongoDB
- Prisma ORM

### Authentication

- NextAuth.js

### Deployment

- Cloudflare (via open-next configuration)

---

## Project Structure

```
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
│   ├── app/              # App Router pages and layouts
│   ├── lib/              # Utility and helper functions
│   ├── auth.ts           # NextAuth configuration
│   └── middleware.ts     # Route protection
│
├── open-next.config.ts   # Cloudflare deployment config
├── next.config.mjs
├── prisma.config.ts
└── package.json
```

---

## System Workflow

1. Participants register and create teams.
2. Teams submit their project details.
3. Admin verifies and manages submissions.
4. Judges evaluate projects using predefined criteria.
5. Scores are aggregated automatically.
6. Final rankings are generated and published.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- MongoDB instance (local or cloud)

Check versions:

```
node -v
npm -v
```

---

### Installation

Clone the repository:

```
git clone https://github.com/vinnovateit/b3.git
cd b3
```

Install dependencies:

```
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory and configure:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

If using OAuth providers, add corresponding credentials.

---

### Prisma Setup

Generate Prisma client:

```
npx prisma generate
```

Push schema to database:

```
npx prisma db push
```

---

### Run Development Server

```
npm run dev
```

Application will be available at:

```
http://localhost:3000
```

---

## Deployment

This project includes `open-next.config.ts` for deployment to Cloudflare Workers.

Build the project:

```
npm run build
```

Follow your Cloudflare deployment workflow accordingly.

---

## Security Considerations

- Role-based route protection using middleware
- Server-side session validation via NextAuth
- Controlled judge access to assigned submissions
- Environment-based secret management

---

## Future Enhancements

- On-chain certificate issuance
- Blockchain-based score verification
- Live leaderboard system
- Email notification automation
- Advanced analytics dashboard

---

## Contributing

Contributions are welcome from the VinnovateIT community.

1. Fork the repository
2. Create a new branch
    
    `git checkout -b feature/feature-name`
    
3. Commit your changes
    
    `git commit -m "Add feature"`
    
4. Push to your branch
    
    `git push origin feature/feature-name`
    
5. Open a Pull Request

Please maintain code structure consistency and follow existing patterns.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.