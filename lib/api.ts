import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Settings / Cloud Accounts ───

export const saveCloudAccount = async (
    projectId: string,
    datasetId: string,
    tableName: string,
    serviceAccountJson: object | string
) => {
    const response = await api.post('/api/settings/cloud-accounts', {
        projectId,
        datasetId,
        tableName,
        serviceAccountJson,
    });
    return response.data;
};


// ─── Billing Data ───

export interface BillingDataResponse {
    _id: string;
    billingAccountId: string;
    projectId: string;
    projectName: string;
    services: {
        serviceDescription: string;
        cost: number;
        resources: {
            skuDescription: string;
            cost: number;
        }[];
    }[];
    totalCost: number;
    reportDate: string;
}

export const fetchBillingData = async (filters?: {
    billingAccountId?: string;
    projectId?: string;
}) => {
    const params = new URLSearchParams();
    if (filters?.billingAccountId) params.append('billingAccountId', filters.billingAccountId);
    if (filters?.projectId) params.append('projectId', filters.projectId);

    const response = await api.get<BillingDataResponse[]>(`/api/billing?${params.toString()}`);
    return response.data;
};

// ─── Worker / Sync ───

export const triggerSync = async () => {
    const response = await api.post('/api/worker/sync');
    return response.data;
};

// ─── Health Check ───

export const checkHealthStatus = async () => {
    const response = await api.get('/health');
    return response.data;
};

export default api;
