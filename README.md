<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/vinnovateit/b3">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vinnovateit/.github/main/assets/whiteLogoViit.svg">
      <img alt="VinnovateIT Logo" src="https://raw.githubusercontent.com/vinnovateit/.github/main/assets/blackLogoViit.svg" width="200">
    </picture>
  </a>

<h3 align="center">B³ Hackathon Platform</h3>

  <p align="center">
    The Official Blockchain Hackathon Management System by VinnovateIT
    <br />
    <i>Structured. Scalable. Secure.</i>
    <br />
    <br />
    <a href="https://github.com/vinnovateit/b3"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vinnovateit/b3">Visit</a>
    &middot;
    <a href="https://github.com/vinnovateit/b3/issues/new?labels=bug&template=bug-report.md">Report Bug</a>
    &middot;
    <a href="https://github.com/vinnovateit/b3/issues/new?labels=enhancement&template=feature-request.md">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About The Project

<img alt="B3 Logo" src="./public/images/logo.png" width="200" align="right">

**B³** is a full-stack hackathon management system built to handle the complete operational lifecycle of a blockchain-based hackathon. 

The platform was developed to replace fragmented tools like Google Forms, spreadsheets, and manual scoring systems with a structured, scalable, and secure web application.

It enables:
* ✅ **Participant Registration** and team creation.
* ✅ **Project Submission** management.
* ✅ **Role-based Authentication** (Admin, Judge, User).
* ✅ **Judge Dashboards** for rubric-based evaluation.
* ✅ **Automated Scoring** and result generation.

<details>
  <summary><b>📸 Screenshots (Click to Expand)</b></summary>
  
  <br />

  | Landing Page | Judge Dashboard |
  | :--------------: | :--------: |
  | <img width="100%" alt="Landing Page" src="./public/images/landing-preview.png"> | <img width="100%" alt="Dashboard" src="./public/images/dashboard-preview.png"> |

</details>

<br/>

### Architecture 

```mermaid
graph TD
    subgraph Users
        P[Participants]
        J[Judges]
        A[Admin]
    end
    subgraph "B³ Platform"
        Auth[NextAuth Security]
        subgraph Modules
            Reg[Registration System]
            Eval[Evaluation Dashboard]
        end
        Engine[Score Engine]
    end
    subgraph Data
        DB[(MongoDB)]
    end
    P --> Reg
    J --> Eval
    Reg --> Auth
    Eval --> Auth
    Auth --> DB
    Eval --> Engine
Built With
[][Next-url]
[][React-url]
[][Tailwind-url]
[][Node-url]
[][Mongo-url]
[][Prisma-url]
[][NextAuth-url]
[][Cloudflare-url]

Roadmap
[ ] Blockchain-based certificate issuance

[ ] On-chain score verification

[ ] Live leaderboard (WebSocket)

[ ] Automated email workflows

[ ] Advanced analytics dashboard

See the open issues for a full list of proposed features (and known issues).

Getting Started
To get a local copy up and running follow these simple example steps.

Prerequisites
Node.js v18+

MongoDB Instance (Local or Atlas)

npm

Bash
npm install npm@latest -g
Installation
Clone the repo

Bash
git clone [https://github.com/vinnovateit/b3.git](https://github.com/vinnovateit/b3.git)
cd b3
Install NPM packages

Bash
npm install
Set up your Environment Variables inside a .env file:

Code snippet
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
Sync Database

Bash
npx prisma generate
npx prisma db push
Run Development Server

Bash
npm run dev
Contributing
We welcome contributions from the VinnovateIT community.

Fork the repository

Create a branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Submit a Pull Request

Top contributors:
<a href="https://www.google.com/search?q=https://github.com/vinnovateit/b3/graphs/contributors">
<img src="https://www.google.com/search?q=https://contrib.rocks/image%3Frepo%3Dvinnovateit/b3" alt="contrib.rocks image" />
</a>

Acknowledgments
VinnovateIT Core Team

B³ Hackathon Organizers

<p align="center">
Made with :heart: by <a href="https://vinnovateit.com">VinnovateIT</a>
</p>

[]: #
[next-url]: https://nextjs.org/
[]: #
[react-url]: https://reactjs.org/
[]: #
[tailwind-url]: https://www.google.com/search?q=https://tailwindcss.com/
[]: #
[node-url]: https://www.google.com/search?q=https://nodejs.org/
[]: #
[mongo-url]: https://www.google.com/search?q=https://www.mongodb.com/
[]: #
[prisma-url]: https://www.google.com/search?q=https://www.prisma.io/
[]: #
[nextauth-url]: https://www.google.com/search?q=https://next-auth.js.org/
[]: #
[cloudflare-url]: https://www.google.com/search?q=https://cloudflare.com
