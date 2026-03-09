"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { 
    Shield, 
    User as UserIcon, 
    Search, 
    RefreshCw,
    CheckCircle2,
    XCircle,
    AlertTriangle
} from "lucide-react";

interface UserPermissions {
    canViewBilling: boolean;
    canManageProjects: boolean;
    canManageAlerts: boolean;
    canManageSettings: boolean;
    canSyncData: boolean;
}

interface UserData {
    _id: string;
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: 'admin' | 'editor' | 'viewer';
    permissions: UserPermissions;
    lastLogin: string;
    createdAt: string;
}

const PERMISSION_LABELS: Record<keyof UserPermissions, string> = {
    canViewBilling: "View Billing",
    canManageProjects: "Manage Projects",
    canManageAlerts: "Manage Alerts",
    canManageSettings: "Manage Settings",
    canSyncData: "Sync Data",
};

export default function AdminUsersPage() {
    const { dbUser } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUser, setExpandedUser] = useState<string | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/api/users/list`);
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(data);
        } catch (err: any) {
            setError("Could not connect to backend. Make sure the backend server is running on port 8000.");
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (uid: string, newRole: 'admin' | 'editor' | 'viewer') => {
        try {
            const res = await fetch(`${apiUrl}/api/users/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, role: newRole }),
            });
            if (res.ok) fetchUsers();
        } catch (err) {
            console.error("Failed to update role:", err);
        }
    };

    const updatePermission = async (uid: string, currentPermissions: UserPermissions, key: keyof UserPermissions) => {
        const updated = { ...currentPermissions, [key]: !currentPermissions[key] };
        try {
            const res = await fetch(`${apiUrl}/api/users/permissions`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, permissions: updated }),
            });
            if (res.ok) fetchUsers();
        } catch (err) {
            console.error("Failed to update permissions:", err);
        }
    };

    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dbUser?.role !== 'admin') {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Shield className="w-6 h-6 text-indigo-600" />
                        User Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Manage user roles and platform permissions.
                    </p>
                </div>
                <button 
                    onClick={fetchUsers} 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Connection Error</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{error}</p>
                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                            Run <code className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">npm run dev</code> in the <code className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">backend</code> folder.
                        </p>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Users</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{users.length}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Admins</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Viewers</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{users.filter(u => u.role === 'viewer').length}</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                {/* Search */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Last Login</th>
                                <th className="px-6 py-4">Permissions</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-10 w-40 bg-slate-100 dark:bg-slate-800 rounded" /></td>
                                        <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded" /></td>
                                        <td className="px-6 py-4"><div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded" /></td>
                                        <td className="px-6 py-4"><div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded" /></td>
                                        <td className="px-6 py-4 text-right"><div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        {searchTerm ? "No users match your search." : "No users found. Users will appear here after they sign in."}
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <React.Fragment key={user.uid}>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-white text-sm font-bold">
                                                            {(user.displayName || user.email)[0].toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-slate-900 dark:text-white truncate">{user.displayName || 'No name'}</div>
                                                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                                                    : user.role === 'editor'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                            }`}>
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                            {new Date(user.lastLogin).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setExpandedUser(expandedUser === user.uid ? null : user.uid)}
                                                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                                            >
                                                {expandedUser === user.uid ? "Hide" : "Manage"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <select 
                                                className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 outline-none cursor-pointer"
                                                value={user.role}
                                                onChange={(e) => updateRole(user.uid, e.target.value as 'admin' | 'editor' | 'viewer')}
                                            >
                                                <option value="viewer">Viewer</option>
                                                <option value="editor">Editor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* Expanded Permissions Row */}
                                    {expandedUser === user.uid && (
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                                            <td colSpan={5} className="px-6 py-4">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                                    Platform Permissions for {user.displayName || user.email}
                                                </p>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                                    {(Object.keys(PERMISSION_LABELS) as Array<keyof UserPermissions>).map((key) => {
                                                        const enabled = user.permissions?.[key] ?? false;
                                                        return (
                                                            <button
                                                                key={key}
                                                                onClick={() => updatePermission(user.uid, user.permissions || {
                                                                    canViewBilling: true,
                                                                    canManageProjects: false,
                                                                    canManageAlerts: false,
                                                                    canManageSettings: false,
                                                                    canSyncData: false,
                                                                }, key)}
                                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                                                                    enabled 
                                                                        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                                                                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                                                                }`}
                                                            >
                                                                {enabled 
                                                                    ? <CheckCircle2 size={14} className="text-emerald-500" /> 
                                                                    : <XCircle size={14} className="text-slate-300 dark:text-slate-600" />
                                                                }
                                                                {PERMISSION_LABELS[key]}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
