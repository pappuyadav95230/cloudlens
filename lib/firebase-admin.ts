import * as admin from 'firebase-admin';

// Protect against multiple initializations in development
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'cloudlens-2d4d1',
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Handle newlines in private key string securely
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } catch (error: any) {
        console.error('Firebase admin initialization error:', error.stack);
    }
}

export const adminAuth = admin.auth();

/**
 * Utility function to verify Firebase ID tokens passed in the Authorization header.
 * Use this in your Next.js API Routes.
 */
export async function verifyIdToken(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('No valid Authorization header found');
        return null;
    }

    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken; // contains the UID and other user info
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return null;
    }
}
