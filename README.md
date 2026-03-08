<div align="center">
  <img src="https://via.placeholder.com/150x50/4f46e5/ffffff?text=CloudLens" alt="CloudLens Logo" width="200" />
  <h1>The Unified Cloud Cost Intelligence Platform</h1>
  <p>Stop guessing about your cloud bills. See every dollar, stop every leak, and optimize your multicloud spend in one beautiful dashboard.</p>
</div>

---

## 🚀 The Problem We're Solving

Modern software relies on dozens of cloud services across multiple providers (GCP, AWS, Azure). As engineering teams move fast, cloud costs often spiral out of control. Reading native AWS or GCP billing reports requires a PhD, and most companies don't realize they are bleeding money until the invoice arrives.

**CloudLens** solves this by pulling data directly from your cloud provider's billing exports (like GCP BigQuery) and translating millions of rows of raw billing data into actionable, human-readable insights.

## ✨ Key Features

- 🔭 **Granular Visibility**: Drill down from the highest Account level, through Projects, down to individual Services (Compute, Spanner) and SKUs.
- ⚡ **Zero Setup Tax**: Connect your cloud accounts in seconds using secure Service Account JSON keys. No agents to install.
- 🛡️ **Enterprise Security**: All credentials are encrypted with AES-256 before being stored in MongoDB Atlas. We only request read-only access.
- 📊 **Beautiful, Native Dashboards**: Built with Next.js, Tailwind CSS, and Recharts, the UI is fast, responsive, and features a frictionless developer experience.
- 🚨 **Anomaly Detection (Upcoming)**: Get alerted instantly on Slack or Email when a specific service spikes above normal daily usage.

## 🛠️ Tech Stack

### Frontend (This Repository)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: React, Lucide Icons, Recharts (for data visualization)
- **Authentication**: Firebase Auth (Integration in progress)
- **Hosting**: Firebase Hosting / Vercel

### Backend (Separate Repository)
- **Framework**: Node.js & Express.js
- **Database**: MongoDB Atlas (Mongoose ORM)
- **Data Integration**: Google Cloud BigQuery SDK
- **Security**: Crypto (AES-256-CBC)
- **Task Scheduling**: `node-cron` for automated data syncing

---

## 📸 Sneak Peek

*Our modern, SaaS-grade UI designed to make cloud finance enjoyable.*

(Add screenshots of your dashboard, settings page, and charts here!)

---

## 🏃 Getting Started (Local Development)

1. Clone this repository
   ```bash
   git clone https://github.com/your-username/cloudlens-frontend.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set your environment variables
   ```bash
   cp .env.example .env.local
   # Set NEXT_PUBLIC_API_URL to your backend URL
   ```
4. Run the development server
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's adding support for a new cloud provider (AWS Cost Explorer, Azure Cost Management) or improving the UI, feel free to open a PR.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
