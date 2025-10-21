import type { NextApiRequest, NextApiResponse } from "next";

// Generate random string
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate user-friendly code (8 chars, uppercase, no ambiguous chars)
function generateUserCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed I, O, 0, 1
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Format as XXXX-XXXX for readability
  return result.slice(0, 4) + result.slice(4);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate device code (64 chars, secret)
    const deviceCode = generateRandomString(64);

    // Generate user code (8 chars, user-friendly)
    const userCode = generateUserCode();

    // Store in api.blocksweb.nl backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.blocksweb.nl';

    const response = await fetch(`${apiUrl}/api/device/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_code: deviceCode,
        user_code: userCode,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create device code');
    }

    // Build verification URLs
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    const verificationUri = `${baseUrl}/device/authorize`;
    const verificationUriComplete = `${baseUrl}/device/authorize?user_code=${userCode}`;

    return res.status(200).json({
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: verificationUri,
      verification_uri_complete: verificationUriComplete,
      expires_in: 600, // 10 minutes
      interval: 5, // Poll every 5 seconds
    });
  } catch (error) {
    console.error('Device code generation error:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Failed to generate device code'
    });
  }
}
