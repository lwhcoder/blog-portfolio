import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

  const sysInfo = {
    client: {
      ip: clientIp,
      headers: Object.fromEntries(request.headers.entries()),
      geo: {
        city: request.headers.get('x-vercel-ip-city'),
        country: request.headers.get('x-vercel-ip-country'),
        region: request.headers.get('x-vercel-ip-country-region')
      },
      userAgent: request.headers.get('user-agent')
    },
    server: {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform
    }
  };

  return NextResponse.json(sysInfo);
}