// ─── User Dashboard Mock Data ───

export const currentUser = {
    name: "Pappu Kumar Yadav",
    email: "pappu@cloudlens.dev",
    avatar: "PY",
    role: "admin" as const,
    plan: "Pro",
    joinedAt: "2025-08-15",
};

// Summary cards
export const dashboardStats = {
    totalSpend: 12847.32,
    totalSpendChange: 8.2,
    activeProjects: 7,
    activeProjectsChange: 2,
    alertsTriggered: 4,
    alertsTriggeredChange: -25,
    savingsIdentified: 3420.0,
    savingsIdentifiedChange: 15.3,
};

// 30-day spending trend
export const spendingTrend = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const base = 350 + Math.sin(i / 5) * 80;
    const noise = Math.random() * 60 - 30;
    const spike = i === 22 ? 250 : 0; // anomaly spike
    return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        amount: Math.round((base + noise + spike) * 100) / 100,
    };
});

// Cost breakdown by service
export const costByService = [
    { service: "Compute Engine", amount: 4820, color: "#6366f1" },
    { service: "Cloud Storage", amount: 2340, color: "#3b82f6" },
    { service: "BigQuery", amount: 1980, color: "#8b5cf6" },
    { service: "Cloud SQL", amount: 1650, color: "#06b6d4" },
    { service: "Networking", amount: 1200, color: "#10b981" },
    { service: "Cloud Functions", amount: 857, color: "#f59e0b" },
];

// Projects
export const projects = [
    {
        id: "proj-1",
        name: "E-Commerce Platform",
        provider: "GCP" as const,
        monthlySpend: 4250.0,
        budget: 5000,
        status: "healthy" as const,
        services: 12,
        lastUpdated: "2 hours ago",
    },
    {
        id: "proj-2",
        name: "Data Analytics Pipeline",
        provider: "AWS" as const,
        monthlySpend: 3120.5,
        budget: 3000,
        status: "warning" as const,
        services: 8,
        lastUpdated: "1 hour ago",
    },
    {
        id: "proj-3",
        name: "Mobile Backend API",
        provider: "GCP" as const,
        monthlySpend: 1890.0,
        budget: 2500,
        status: "healthy" as const,
        services: 6,
        lastUpdated: "30 min ago",
    },
    {
        id: "proj-4",
        name: "ML Training Cluster",
        provider: "AWS" as const,
        monthlySpend: 2450.8,
        budget: 2000,
        status: "critical" as const,
        services: 4,
        lastUpdated: "15 min ago",
    },
    {
        id: "proj-5",
        name: "Marketing Website",
        provider: "GCP" as const,
        monthlySpend: 320.0,
        budget: 500,
        status: "healthy" as const,
        services: 3,
        lastUpdated: "5 hours ago",
    },
    {
        id: "proj-6",
        name: "Dev/Staging Environment",
        provider: "AWS" as const,
        monthlySpend: 540.0,
        budget: 800,
        status: "healthy" as const,
        services: 7,
        lastUpdated: "3 hours ago",
    },
    {
        id: "proj-7",
        name: "IoT Data Ingestion",
        provider: "GCP" as const,
        monthlySpend: 276.02,
        budget: 400,
        status: "healthy" as const,
        services: 5,
        lastUpdated: "1 hour ago",
    },
];

// Project detail — per-service breakdown (for proj-1)
export const projectServiceBreakdown = [
    { service: "Compute Engine", daily: [120, 135, 115, 140, 155, 130, 125], total: 1820, trend: 5.2 },
    { service: "Cloud Storage", daily: [45, 42, 48, 44, 46, 43, 47], total: 680, trend: -2.1 },
    { service: "BigQuery", daily: [80, 95, 70, 85, 90, 75, 88], total: 920, trend: 12.3 },
    { service: "Cloud SQL", daily: [30, 32, 28, 31, 33, 29, 30], total: 450, trend: 1.5 },
    { service: "Networking", daily: [15, 18, 12, 16, 20, 14, 17], total: 280, trend: 8.0 },
    { service: "Cloud Functions", daily: [8, 10, 7, 9, 11, 8, 10], total: 100, trend: -5.3 },
];

// Alerts
export const alerts = [
    {
        id: "alert-1",
        project: "ML Training Cluster",
        service: "EC2 Instances",
        message: "Spending 145% above 7-day average",
        severity: "critical" as const,
        timestamp: "2 hours ago",
        amount: 892.5,
    },
    {
        id: "alert-2",
        project: "Data Analytics Pipeline",
        service: "S3 Storage",
        message: "Budget threshold exceeded (104%)",
        severity: "high" as const,
        timestamp: "5 hours ago",
        amount: 3120.5,
    },
    {
        id: "alert-3",
        project: "E-Commerce Platform",
        service: "BigQuery",
        message: "Unusual query volume detected",
        severity: "medium" as const,
        timestamp: "1 day ago",
        amount: 245.0,
    },
    {
        id: "alert-4",
        project: "Mobile Backend API",
        service: "Cloud Functions",
        message: "Invocation count spike (3x normal)",
        severity: "low" as const,
        timestamp: "2 days ago",
        amount: 67.3,
    },
    {
        id: "alert-5",
        project: "Dev/Staging Environment",
        service: "RDS Database",
        message: "Idle database instance running for 72h",
        severity: "medium" as const,
        timestamp: "3 days ago",
        amount: 154.0,
    },
];

// Billing / Invoices
export const invoices = [
    { id: "INV-2026-02", month: "February 2026", amount: 12847.32, status: "current" as const, dueDate: "Mar 1, 2026" },
    { id: "INV-2026-01", month: "January 2026", amount: 11420.18, status: "paid" as const, dueDate: "Feb 1, 2026" },
    { id: "INV-2025-12", month: "December 2025", amount: 13210.45, status: "paid" as const, dueDate: "Jan 1, 2026" },
    { id: "INV-2025-11", month: "November 2025", amount: 10890.67, status: "paid" as const, dueDate: "Dec 1, 2025" },
    { id: "INV-2025-10", month: "October 2025", amount: 9875.23, status: "paid" as const, dueDate: "Nov 1, 2025" },
    { id: "INV-2025-09", month: "September 2025", amount: 11230.89, status: "paid" as const, dueDate: "Oct 1, 2025" },
];

export const monthlyComparison = [
    { month: "Sep", amount: 11230 },
    { month: "Oct", amount: 9875 },
    { month: "Nov", amount: 10890 },
    { month: "Dec", amount: 13210 },
    { month: "Jan", amount: 11420 },
    { month: "Feb", amount: 12847 },
];

// ─── Admin Panel Mock Data ───

export const adminStats = {
    totalUsers: 523,
    totalUsersChange: 12.5,
    totalRevenue: 48520,
    totalRevenueChange: 18.3,
    activeSubscriptions: 487,
    activeSubscriptionsChange: 8.1,
    totalCloudMonitored: 2340000,
    totalCloudMonitoredChange: 22.4,
};

export const adminUsers = [
    { id: "u1", name: "Sarah Chen", email: "sarah@nimbus.io", plan: "Enterprise", status: "active" as const, projects: 5, spend: 24500, joined: "Jan 12, 2025" },
    { id: "u2", name: "Marcus Rivera", email: "marcus@scalepoint.com", plan: "Pro", status: "active" as const, projects: 3, spend: 8740, joined: "Mar 5, 2025" },
    { id: "u3", name: "Priya Sharma", email: "priya@dataflow.dev", plan: "Pro", status: "active" as const, projects: 4, spend: 12300, joined: "Feb 18, 2025" },
    { id: "u4", name: "James Park", email: "james@cloudnine.co", plan: "Starter", status: "inactive" as const, projects: 1, spend: 890, joined: "Jun 22, 2025" },
    { id: "u5", name: "Anna Kowalski", email: "anna@devstudio.io", plan: "Pro", status: "active" as const, projects: 2, spend: 5670, joined: "Apr 10, 2025" },
    { id: "u6", name: "Raj Patel", email: "raj@infraops.com", plan: "Enterprise", status: "active" as const, projects: 8, spend: 45200, joined: "Dec 1, 2024" },
    { id: "u7", name: "Lisa Wong", email: "lisa@techlab.io", plan: "Starter", status: "suspended" as const, projects: 1, spend: 230, joined: "Aug 14, 2025" },
    { id: "u8", name: "David Kim", email: "david@startupxyz.com", plan: "Pro", status: "active" as const, projects: 3, spend: 7890, joined: "May 30, 2025" },
];

export const userGrowth = [
    { month: "Sep", users: 310 },
    { month: "Oct", users: 345 },
    { month: "Nov", users: 388 },
    { month: "Dec", users: 420 },
    { month: "Jan", users: 465 },
    { month: "Feb", users: 523 },
];

export const revenueByMonth = [
    { month: "Sep", revenue: 28400 },
    { month: "Oct", revenue: 31200 },
    { month: "Nov", revenue: 35800 },
    { month: "Dec", revenue: 39500 },
    { month: "Jan", revenue: 43200 },
    { month: "Feb", revenue: 48520 },
];
