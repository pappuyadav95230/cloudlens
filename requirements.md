# CloudLens Project - Completed Requirements & Tasks

This document tracks the tasks and requirements that have been successfully completed in the project so far.

## 1. UI Consistency & Theming
- **Fixing UI Mismatches**: Unified the design scale across the application. Ensured consistent spacing, typography, color palettes, and component styling to create a cohesive and premium user experience.
- **Dark Mode Implementation**: Added a theme toggle button for switching between light and dark modes. Ensured all components are responsive and visually appealing in both themes.

## 2. Navigation Styling & Fixes
- **Navbar UI Fixes**: Resolved the positioning of the logo. Ensured proper spacing and alignment across different screen sizes, adhering to standard SaaS navbar patterns.
- **Refining Navbar**: Updated public-facing navigation links to "Features", "Our Process", "Pricing", and "Clients".
- **Enhanced Interactions**: Applied modern, bolder styling to the navigation links with animated hover effects.
- **Layout Adjustments**: Adjusted the Hero section's padding to properly accommodate the fixed navbar.

## 3. Authenticated Sections & Dashboards
- **Login Page**: Implemented the authentication entry point.
- **User Dashboard**: Built the main user-facing portal including the following sections (integrated with dummy data):
  - Overview
  - Projects
  - Billing
  - Alerts
  - Settings
- **Admin Panel**: Built the administrative dashboard including:
  - Admin Overview
  - User Management
  - Client Management
- **Dashboard Layout Refinements**: Improved the dashboard layout for a smoother user experience. Addressed how content width adjusts when the sidebar collapses, ensuring content dynamically fills available space rather than being constrained by fixed maximum widths.

## 4. Pending & Upcoming Tasks
- **Public Pages Creation**: 
  - Create the **About Our Service** page.
  - Create the **Pricing** page.
  - Create the **Client Section** page.

## 5. Backend & Cloud Integration (GCP Billing)
- **Architecture Planning**: GCP has a nested hierarchy: **Billing Account -> Projects -> Services (e.g., Spanner, Cloud Run) -> Resources**. To capture this granular cost data across all projects under a single billing account, we will use **Google Cloud Billing Data Export to BigQuery**.
- **User Connection Flow (How users connect real data)**:
  1. **UI Dashboard**: User navigates to `Settings -> Cloud Accounts`.
  2. **Add Connection**: User clicks "Connect GCP Billing".
  3. **Credentials Setup**: User is prompted to upload a **Service Account JSON Key** that has read access (`BigQuery Data Viewer` and `BigQuery Job User`) to their billing export dataset.
  4. **Dataset Configuration**: User inputs the BigQuery Project ID and Dataset Name where their billing data is exported.
  5. **Validation**: The backend runs a quick `SELECT 1` or highly limited `COUNT` query to validate the credentials and dataset existence before saving.
- **Backend Data Ingestion Tasks (Node.js + Express + TypeScript + MongoDB Atlas)**:
  - **Microservice Architecture**: Build a dedicated backend service using **Node.js, Express.js, and TypeScript** for robust, strongly-typed data processing.
  - **Secure Vault**: Encrypt and store the Service Account JSON keys in a secure collection in **MongoDB Atlas**.
  - **Data Worker/CronJob**: A scheduled Node.js worker (using `node-cron`) or dedicated API endpoint triggered externally.
  - **SQL Aggregation (BigQuery)**: The Express backend will use the `@google-cloud/bigquery` client to execute standard SQL queries against the BigQuery export table to fetch costs, grouping the data to map exactly to the GCP hierarchy:
    - **Level 1**: Billing Account ID
    - **Level 2**: Project ID / Project Name
    - **Level 3**: Service Description (e.g., "Cloud Spanner", "Vertex AI")
    - **Level 4**: SKU / Resource Description (e.g., "Spanner Database Storage", "Compute Engine N1 Core")
  - **Database Sync (MongoDB Atlas)**: The aggregated hierarchical data will be saved into **MongoDB Atlas** using structured documents. Each document groups cost arrays recursively (Projects -> Services -> Resources) ensuring fast, hierarchical data retrieval suitable for modern NoSQL architectures.
- **API Development**: The strongly-typed Express backend will serve REST endpoints (`/api/billing`) for the Next.js frontend to securely fetch this hierarchical data. The frontend can then allow users to drill down from Client -> Project Cost -> Service Cost -> Resource Cost.
