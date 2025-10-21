import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { device_code } = req.body;

    if (!device_code) {
      return res.status(400).json({
        error: 'invalid_request',
        message: 'device_code is required'
      });
    }

    // Poll the backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.blocksweb.nl';

    const response = await fetch(`${apiUrl}/api/device/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_code,
      }),
    });

    const data = await response.json();

    // Return the response from backend (success or pending)
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Device token polling error:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Failed to poll device token'
    });
  }
}
