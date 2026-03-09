"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    dbUser: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [dbUser, setDbUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                // Sync with MongoDB (silently fails if backend is down)
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                    const response = await fetch(`${apiUrl}/api/users/sync`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                        }),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setDbUser(data.user);
                    } else {
                        console.warn("User sync returned non-OK status:", response.status);
                    }
                } catch {
                    // Backend unavailable — app continues working without DB sync
                    console.warn("Backend unavailable — user sync skipped.");
                }
            } else {
                setDbUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const signInWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithEmail = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{ user, dbUser, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
