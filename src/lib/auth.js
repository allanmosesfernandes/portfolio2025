import { NextResponse } from 'next/server';

export function validateAuth(request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            valid: false,
            response: NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 }),
        };
    }

    const token = authHeader.substring(7);
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
        console.error('ADMIN_SECRET environment variable is not set');
        return {
            valid: false,
            response: NextResponse.json({ error: 'Server configuration error' }, { status: 500 }),
        };
    }

    if (token !== adminSecret) {
        return {
            valid: false,
            response: NextResponse.json({ error: 'Invalid authorization token' }, { status: 401 }),
        };
    }

    return { valid: true };
}
