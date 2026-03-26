import { NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase-admin';

export async function GET(req: Request) {
    try {
        const user = await verifyIdToken(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // TODO: (Phase 3) Initialize Supabase Server client using SUPABASE_SERVICE_ROLE_KEY
        // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        
        // TODO: (Phase 3) Fetch billing data from Supabase where user_id = user.uid

        return NextResponse.json({
            message: 'Billing endpoint reached securely.',
            uid: user.uid,
            data: [] 
        });

    } catch (error: any) {
        console.error('Billing API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
