"use client";

import { Fragment, useEffect, useState } from "react";
import {
    Search,
    RefreshCw,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Shield,
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
    role: "admin" | "editor" | "viewer";
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

const roleColors: Record<string, string> = {
    admin: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
    editor: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
    viewer: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
};

export default function AdminUsersPage() {
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
            setError(
                "Could not connect to backend. Make sure the backend server is running."
            );
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (
        uid: string,
        newRole: "admin" | "editor" | "viewer"
    ) => {
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

    const updatePermission = async (
        uid: string,
        currentPermissions: UserPermissions,
        key: keyof UserPermissions
    ) => {
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

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Users
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage all platform users
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">
                            {users.length}
                        </span>{" "}
                        total users
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                        <RefreshCw size={14} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                            Connection Error
                        </p>
                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users table */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f172a]">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    User
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    Role
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    Permissions
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    Last Login
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    Joined
                                </th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {loading
                                ? Array(3)
                                      .fill(0)
                                      .map((_, i) => (
                                          <tr key={i} className="animate-pulse">
                                              <td className="px-5 py-4">
                                                  <div className="h-10 w-40 bg-slate-100 dark:bg-slate-800 rounded" />
                                              </td>
                                              <td className="px-5 py-4">
                                                  <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
                                              </td>
                                              <td className="px-5 py-4">
                                                  <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
                                              </td>
                                              <td className="px-5 py-4">
                                                  <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
                                              </td>
                                              <td className="px-5 py-4">
                                                  <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
                                              </td>
                                              <td className="px-5 py-4">
                                                  <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded ml-auto" />
                                              </td>
                                          </tr>
                                      ))
                                : filteredUsers.length === 0
                                ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center text-slate-400"
                                        >
                                            {searchTerm
                                                ? "No users match your search."
                                                : "No users found. Users will appear here after they sign in."}
                                        </td>
                                    </tr>
                                )
                                : filteredUsers.map((user) => (
                                      <Fragment key={user.uid}>
                                          <tr
                                              key={user.uid}
                                              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                          >
                                              <td className="px-5 py-4">
                                                  <div className="flex items-center gap-3">
                                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                          {user.photoURL ? (
                                                              <img
                                                                  src={user.photoURL}
                                                                  alt=""
                                                                  className="w-full h-full object-cover"
                                                              />
                                                          ) : (
                                                              <span className="text-white text-xs font-bold">
                                                                  {(user.displayName || user.email)
                                                                      .split(" ")
                                                                      .map((n) => n[0])
                                                                      .join("")
                                                                      .toUpperCase()
                                                                      .slice(0, 2)}
                                                              </span>
                                                          )}
                                                      </div>
                                                      <div>
                                                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                              {user.displayName || "No name"}
                                                          </p>
                                                          <p className="text-xs text-slate-400 dark:text-slate-500">
                                                              {user.email}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="px-5 py-4">
                                                  <span
                                                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                          roleColors[user.role] || roleColors.viewer
                                                      }`}
                                                  >
                                                      {user.role.toUpperCase()}
                                                  </span>
                                              </td>
                                              <td className="px-5 py-4">
                                                  <button
                                                      onClick={() =>
                                                          setExpandedUser(
                                                              expandedUser === user.uid
                                                                  ? null
                                                                  : user.uid
                                                          )
                                                      }
                                                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                                                  >
                                                      {expandedUser === user.uid
                                                          ? "Hide"
                                                          : "Manage"}
                                                  </button>
                                              </td>
                                              <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                  {new Date(user.lastLogin).toLocaleDateString()}
                                              </td>
                                              <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                  {new Date(user.createdAt).toLocaleDateString()}
                                              </td>
                                              <td className="px-5 py-4 text-right">
                                                  <select
                                                      className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 outline-none cursor-pointer"
                                                      value={user.role}
                                                      onChange={(e) =>
                                                          updateRole(
                                                              user.uid,
                                                              e.target.value as
                                                                  | "admin"
                                                                  | "editor"
                                                                  | "viewer"
                                                          )
                                                      }
                                                  >
                                                      <option value="viewer">Viewer</option>
                                                      <option value="editor">Editor</option>
                                                      <option value="admin">Admin</option>
                                                  </select>
                                              </td>
                                          </tr>
                                          {/* Expanded Permissions Row */}
                                          {expandedUser === user.uid && (
                                              <tr
                                                  key={`${user.uid}-perms`}
                                                  className="bg-slate-50/50 dark:bg-slate-800/20"
                                              >
                                                  <td colSpan={6} className="px-5 py-4">
                                                      <div className="flex items-center gap-2 mb-3">
                                                          <Shield size={14} className="text-indigo-500" />
                                                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                              Platform Permissions for{" "}
                                                              {user.displayName || user.email}
                                                          </p>
                                                      </div>
                                                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                                          {(
                                                              Object.keys(
                                                                  PERMISSION_LABELS
                                                              ) as Array<keyof UserPermissions>
                                                          ).map((key) => {
                                                              const enabled =
                                                                  user.permissions?.[key] ?? false;
                                                              return (
                                                                  <button
                                                                      key={key}
                                                                      onClick={() =>
                                                                          updatePermission(
                                                                              user.uid,
                                                                              user.permissions || {
                                                                                  canViewBilling: true,
                                                                                  canManageProjects: false,
                                                                                  canManageAlerts: false,
                                                                                  canManageSettings: false,
                                                                                  canSyncData: false,
                                                                              },
                                                                              key
                                                                          )
                                                                      }
                                                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                                                                          enabled
                                                                              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                                                                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                                                                      }`}
                                                                  >
                                                                      {enabled ? (
                                                                          <CheckCircle2
                                                                              size={14}
                                                                              className="text-emerald-500"
                                                                          />
                                                                      ) : (
                                                                          <XCircle
                                                                              size={14}
                                                                              className="text-slate-300 dark:text-slate-600"
                                                                          />
                                                                      )}
                                                                      {PERMISSION_LABELS[key]}
                                                                  </button>
                                                              );
                                                          })}
                                                      </div>
                                                  </td>
                                              </tr>
                                          )}
                                      </Fragment>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
