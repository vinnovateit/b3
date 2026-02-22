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
    <br /><br />
    <a href="https://github.com/vinnovateit/b3"><strong>Explore the Repository »</strong></a>
    <br /><br />
    <a href="https://github.com/vinnovateit/b3">View Repository</a>
    ·
    <a href="https://github.com/vinnovateit/b3/issues">Report Bug</a>
    ·
    <a href="https://github.com/vinnovateit/b3/issues">Request Feature</a>
  </p>
</div>

---

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
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

---

## About The Project

**B³** is a full-stack hackathon management system built to handle the complete operational lifecycle of a blockchain-based hackathon.

The platform replaces fragmented tools like Google Forms, spreadsheets, and manual scoring systems with a structured, scalable, and secure web application.

It enables:

- Participant Registration and team creation  
- Project Submission management  
- Role-based Authentication (Admin, Judge, User)  
- Judge Dashboards for rubric-based evaluation  
- Automated Scoring and result generation  

---

<details>
  <summary><b>Screenshots</b></summary>

<br/>

| Landing Page |
|:-------------:|
| <img width="100%" alt="Landing Page" src="public/images/b3.vinnovateit.com_ (1).png">

</details>

---

## Architecture

```mermaid
%%{
  init: {
    'theme': 'base',
    'flowchart': {
        'htmlLabels': true,
        'padding': 20,
        'nodeSpacing': 50,
        'rankSpacing': 50,
        'curve': 'basis' 
    },
    'themeVariables': {
      'background': '#ffffff',
      'primaryColor': '#ffffff',
      'primaryTextColor': '#111111',
      'primaryBorderColor': '#00E676',
      'lineColor': '#00E676',
      'secondaryColor': '#F8F9FA',
      'tertiaryColor': '#F8F9FA',
      'fontFamily': 'Inter, Segoe UI, sans-serif',
      'fontSize': '14px'
    }
  }
}%%

flowchart LR


    %% NODE STYLES
    classDef neon fill:#ffffff,stroke:#00E676,stroke-width:2px,color:#111111,rx:5,ry:5;
    classDef solid fill:#00E676,stroke:#00E676,stroke-width:1px,color:#000000,font-weight:bold,rx:5,ry:5;
    classDef db fill:#ffffff,stroke:#00E676,stroke-width:2px,color:#111111;


    %% USERS
    subgraph USERS [Users]
        direction TB
        P[" Participants "]:::neon
        J[" Judges "]:::neon
        A[" Admin "]:::neon
    end

    style USERS fill:none,stroke:#E5E7EB,stroke-width:1px,rx:10,ry:10


    %% PLATFORM
    subgraph PLATFORM [" B³ Platform "]
        direction TB
        Reg[" Registration <br/> System "]:::neon
        Eval[" Evaluation <br/> Dashboard "]:::neon
        Auth[" NextAuth <br/> Security "]:::solid
        Engine[" Score <br/> Engine "]:::solid
    end
    style PLATFORM fill:#F8F9FA,stroke:#E5E7EB,stroke-width:1px,rx:10,ry:10


    %% DATA
    subgraph DATA [Data Layer]
        DB[(" MongoDB ")]:::db
    end

    style DATA fill:none,stroke:#E5E7EB,stroke-width:1px,rx:10,ry:10


    %% FLOW

    P --> Reg
    J --> Eval
    A --> Eval

    Reg --> Auth
    Eval --> Auth

    Eval --> Engine
    Auth --> DB
```

---

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Cloudflare](https://cloudflare.com/)

---


## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (Local or Atlas)
- npm

Update npm (optional):

```bash
npm install -g npm@latest
```

---

### Installation

Clone the repository:

```bash
git clone https://github.com/vinnovateit/b3.git
cd b3
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

Sync database:

```bash
npx prisma generate
npx prisma db push
```

Run development server:

```bash
npm run dev
```

Visit:  
http://localhost:3000

---

## Contributing

We welcome contributions from the VinnovateIT community.

1. Fork the repository  
2. Create a branch  
   `git checkout -b feature/AmazingFeature`  
3. Commit changes  
   `git commit -m "Add AmazingFeature"`  
4. Push to branch  
   `git push origin feature/AmazingFeature`  
5. Open a Pull Request  

---

## Contributors

<a href="https://github.com/vinnovateit/b3/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vinnovateit/b3" alt="contributors" />
</a>

---

## Acknowledgments

- VinnovateIT Core Team  
- B³ Hackathon Organizers  

---

<p align="center">
Made with ❤️ by <a href="https://vinnovateit.com">VinnovateIT</a>
</p>
