import { NextResponse } from 'next/server';

export function middleware(request) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authHeader = request.headers.get('authorization');

        // Check credentials against environment variables
        const validUser = process.env.ADMIN_HTTP_USER || 'admin';
        const validPassword = process.env.ADMIN_HTTP_PASSWORD;

        // If no password is set, skip HTTP auth (allow access)
        if (!validPassword) {
            return NextResponse.next();
        }

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return new NextResponse('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Admin Area"',
                },
            });
        }

        try {
            // Parse Basic auth credentials
            const base64Credentials = authHeader.substring(6); // Remove 'Basic '
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
            const [user, pwd] = credentials.split(':');

            if (user === validUser && pwd === validPassword) {
                return NextResponse.next();
            }
        } catch (error) {
            console.error('Auth parsing error:', error);
        }

        // Invalid credentials
        return new NextResponse('Invalid credentials', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Admin Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
