"use client";

import { useState } from "react";
import { saveCloudAccount, checkHealthStatus } from "@/lib/api";
import { 
    Cloud, ShieldCheck, Server, CheckCircle2, 
    XCircle, Plus, Key, Database, Table, Activity
} from "lucide-react";
import { SiGooglecloud, SiAmazonwebservices } from "react-icons/si";

export default function IntegrationsPage() {
    const [showConnectForm, setShowConnectForm] = useState(false);
    const [projectId, setProjectId] = useState("");
    const [datasetId, setDatasetId] = useState("");
    const [tableName, setTableName] = useState("");
    const [serviceAccountJson, setServiceAccountJson] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [backendStatus, setBackendStatus] = useState<{ type: "success" | "error" | "idle"; text: string }>({ type: "idle", text: "" });

    const handleConnect = async () => {
        if (!projectId || !datasetId || !tableName || !serviceAccountJson) {
            setSubmitMessage({ type: "error", text: "Please fill in all fields." });
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            let parsed;
            try {
                parsed = JSON.parse(serviceAccountJson);
            } catch {
                setSubmitMessage({ type: "error", text: "Invalid JSON. Please paste a valid Service Account key." });
                setIsSubmitting(false);
                return;
            }
            
            await saveCloudAccount(projectId, datasetId, tableName, parsed);
            setSubmitMessage({ type: "success", text: "Service account saved securely!" });
            setProjectId("");
            setDatasetId("");
            setTableName("");
            setServiceAccountJson("");
            setTimeout(() => {
                setShowConnectForm(false);
                setSubmitMessage(null);
            }, 2000);
        } catch (error: any) {
            setSubmitMessage({ type: "error", text: error?.response?.data?.error || "Failed to connect. Is the backend running?" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleHealthCheck = async () => {
        setBackendStatus({ type: "idle", text: "Checking..." });
        try {
            const data = await checkHealthStatus();
            setBackendStatus({ type: "success", text: data.message });
        } catch {
            setBackendStatus({ type: "error", text: "Backend is not reachable" });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Integrations</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Securely connect and manage your external cloud provider logs.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Cloud Integrations */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Cloud className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-slate-900 dark:text-white">Cloud Connectors</h3>
                        </div>
                        <button
                            onClick={() => setShowConnectForm(!showConnectForm)}
                            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                                showConnectForm 
                                ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" 
                                : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                            }`}
                        >
                            {showConnectForm ? "Cancel" : <><Plus className="w-4 h-4" /> Add Connection</>}
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {showConnectForm && (
                            <div className="mb-8 p-6 rounded-2xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 space-y-5 animate-in slide-in-from-top-4 fade-in duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Secure GCP Connection</h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Your service account JSON is encrypted using AES-256 before being stored in our database. We only request read-only access to BigQuery billing exports.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            <Cloud className="w-3.5 h-3.5 text-slate-400" /> GCP Project ID
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., my-gcp-project-123"
                                            value={projectId}
                                            onChange={(e) => setProjectId(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            <Database className="w-3.5 h-3.5 text-slate-400" /> BigQuery Dataset ID
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., billing_export"
                                            value={datasetId}
                                            onChange={(e) => setDatasetId(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        <Table className="w-3.5 h-3.5 text-slate-400" /> BigQuery Table Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., gcp_billing_export_v1_XXXXXX_XXXXXX"
                                        value={tableName}
                                        onChange={(e) => setTableName(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        <Key className="w-3.5 h-3.5 text-slate-400" /> Service Account JSON
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder='{\n  "type": "service_account",\n  "project_id": "...",\n  "private_key": "..."\n}'
                                        value={serviceAccountJson}
                                        onChange={(e) => setServiceAccountJson(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-[13px] text-slate-900 dark:text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 leading-relaxed"
                                    />
                                </div>
                                
                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="h-6 flex items-center">
                                        {submitMessage && (
                                            <p className={`flex items-center gap-1.5 text-sm font-medium ${submitMessage.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                                {submitMessage.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                {submitMessage.text}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleConnect}
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <><Activity className="w-4 h-4 animate-spin" /> Encrypting & Saving...</>
                                        ) : (
                                            <><ShieldCheck className="w-4 h-4" /> Save Securely</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Active Connections</h4>
                            
                            <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-[#0f172a] dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300 gap-4">
                                <div className="flex items-start sm:items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-[#4285F4]">
                                        <SiGooglecloud size={26} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Google Cloud Platform</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Project ID: alphanumerictoolsbackend</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                CONNECTED
                                            </span>
                                            <span className="text-[11px] text-slate-400">Synced 2h ago</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors self-start sm:self-center">
                                    Manage
                                </button>
                            </div>
                            
                            <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-[#0f172a] dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-300 gap-4 opacity-70">
                                <div className="flex items-start sm:items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 text-[#FF9900]">
                                        <SiAmazonwebservices size={28} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Amazon Web Services</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cost Explorer Integration</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                                                DISCONNECTED
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors self-start sm:self-center">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer */}
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <Server className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">API Health Check</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Connection Test</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verify frontend can securely reach the backend infrastructure.</p>
                                
                                {backendStatus.type !== "idle" && (
                                    <div className={`mt-3 inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border ${
                                        backendStatus.type === "success" 
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" 
                                        : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                                    }`}>
                                        {backendStatus.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        {backendStatus.text}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleHealthCheck}
                                className="shrink-0 bg-white border border-slate-200 text-slate-700 dark:bg-[#1e293b] dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
                            >
                                Ping Backend
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
