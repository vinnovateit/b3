<div align="center">
  <a href="https://github.com/vinnovateit/b3">
    <img src="./public/images/logo.png" alt="B3 Logo" width="180" height="auto" />
  </a>

  <h1 align="center">B³ Hackathon Platform</h1>

  <p align="center">
    <strong>The Official Blockchain Hackathon Management System by VinnovateIT</strong>
  </p>

  <p align="center">
    <i>Structured. Scalable. Secure.</i>
    <br />
    <br />
    <a href="https://github.com/vinnovateit/b3/issues">Report Bug</a>
    ·
    <a href="https://github.com/vinnovateit/b3/issues">Request Feature</a>
  </p>

  <p align="center">
    <a href="https://github.com/vinnovateit/b3/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Auth-NextAuth-purple?style=for-the-badge&logo=next.js&logoColor=white" alt="Auth" />
    <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
  </p>
</div>

<br />

## ⚡ About The Project

> **No more Google Forms. No more spreadsheets.**

**B³** is a specialized, full-stack management system designed to handle the operational chaos of a blockchain hackathon. We built this to replace fragmented tools with a single source of truth.

### 🎯 Key Capabilities
* 🔐 **Role-Based Auth**: Secure gateways for Participants, Judges, and Admins.
* 👥 **Team Management**: Real-time team creation and dynamic member handling.
* ⚖️ **Judge Dashboard**: A dedicated interface for scoring projects against rubrics.
* 📊 **Automated Results**: Instant score aggregation and ranking logic.

---

## 📸 Platform Preview

<div align="center"> 
  <table>
    <tr>
      <td align="center"><strong>Landing Page</strong></td>
      <td align="center"><strong>Judge Dashboard</strong></td>
    </tr>
    <tr>
      <td><img src="./public/images/landing-preview.png" width="100%" alt="Landing Page" /></td>
      <td><img src="./public/images/dashboard-preview.png" width="100%" alt="Dashboard" /></td>
    </tr>
  </table>
</div>

---

## 🏗 Architecture & Workflow

We utilize a modular full-stack architecture powered by the **Next.js App Router**.

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
            Mgmt[Management Panel]
        end
        
        Engine[Score Engine & Result Generator]
    end

    subgraph Data
        DB[(MongoDB)]
    end

    P -->|Register/Submit| Reg
    J -->|Score Projects| Eval
    A -->|Manage| Mgmt
    
    Reg --> Auth
    Eval --> Auth
    Mgmt --> Auth
    
    Auth --> DB
    Eval --> Engine
    Engine --> DB
🛠 Tech Stack<div align="center">LayerTechnologyDescriptionFrontendApp Router, Tailwind CSS, Framer MotionBackendServer Actions, API RoutesDatabaseNoSQL Data Store with Type-safe ORMAuthSession management & Middleware protectionDevOpsDeployed via open-next config</div>📂 Folder Structure<details><summary>Click to expand file tree</summary>Bashb3/
├── prisma/
│   └── schema.prisma      # Database Schema
├── public/                # Static Assets
│   ├── images/
│   ├── fonts/
│   └── svgs/
├── src/
│   ├── app/               # Next.js App Router Pages
│   ├── lib/               # Utility functions
│   ├── auth.ts            # Auth Configuration
│   └── middleware.ts      # Route Protection
├── open-next.config.ts    # Deployment Config
├── next.config.mjs
└── package.json
</details>🚀 Getting StartedFollow these steps to set up the project locally.PrerequisitesNode.js v18+MongoDB (Local or Atlas URL)npm or yarnInstallationClone the RepoBashgit clone [https://github.com/vinnovateit/b3.git](https://github.com/vinnovateit/b3.git)
cd b3
Install DependenciesBashnpm install
Configure EnvironmentCreate a .env file in the root directory:Code snippetDATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your_super_secret_key"
NEXTAUTH_URL="http://localhost:3000"
Database SyncGenerate Prisma client and push schema:Bashnpx prisma generate
npx prisma db push
Run Dev ServerBashnpm run dev
Access the app at http://localhost:3000🔮 Future Roadmap[ ] On-Chain Verification: Store scores on a public ledger.[ ] NFT Certificates: Automated minting for winners.[ ] Live Leaderboard: WebSocket-enabled real-time ranking.[ ] Analytics: Advanced visualization for admin data.🤝 ContributingContributions from the VinnovateIT community are welcome!Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📝 LicenseDistributed under the MIT License. See LICENSE for more information.<div align="center"><br /><p>Made with ❤️ by <strong>VinnovateIT</strong></p></div>
