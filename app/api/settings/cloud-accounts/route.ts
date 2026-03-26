import { NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase-admin';

export async function POST(req: Request) {
    try {
        const user = await verifyIdToken(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized. No valid Firebase token provided.' }, { status: 401 });
        }

        const body = await req.json();
        const { projectId, datasetId, tableName, serviceAccountJson } = body;

        if (!projectId || !serviceAccountJson) {
            return NextResponse.json({ error: 'Missing required cloud account configuration.' }, { status: 400 });
        }

        // TODO: (Phase 2) Encrypt serviceAccountJson before storing
        // TODO: (Phase 2) Insert into Supabase cloud_connections table where user_id = user.uid
        
        return NextResponse.json({
            success: true,
            message: 'Cloud account configuration received securely.',
        });

    } catch (error: any) {
        console.error('Settings API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
