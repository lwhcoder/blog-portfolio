import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const ALLOWED_IPS = ['192.168.1.158', '192.168.1.78', '104.185.157.13', "127.0.0.1"];

function normalizeIp(ip: string | null): string | null {
    if (!ip) return null;
    
    // Handle cases where IP might be '::ffff:192.168.1.158'
    if (ip.startsWith('::ffff:')) {
        return ip.substring(7); // Remove the '::ffff:' prefix
    }
    
    // Handle cases where x-forwarded-for might contain multiple IPs
    const firstIp = ip.split(',')[0].trim();
    return firstIp;
}

export async function GET(req: NextRequest) {
    // Get and normalize client IP address
    const rawIp = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const clientIp = normalizeIp(rawIp);
    
    console.log('Raw IP:', rawIp, 'Normalized IP:', clientIp);

    // Check if IP is allowed
    if (!clientIp || !ALLOWED_IPS.includes(clientIp)) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
    }

    const users = [
        {
            user: "admin",
            password: "admin123",
            permission: "admin"
        }
    ];

    return NextResponse.json(users);
}