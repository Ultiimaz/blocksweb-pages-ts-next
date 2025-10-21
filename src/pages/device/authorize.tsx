import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function DeviceAuthorizePage() {
  const router = useRouter();
  const { user_code: prefilledCode } = router.query;

  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (prefilledCode && typeof prefilledCode === "string") {
      setUserCode(prefilledCode);
    }
  }, [prefilledCode]);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate code format
      const cleanCode = userCode.replace(/[-\s]/g, "").toUpperCase();
      if (cleanCode.length !== 8) {
        throw new Error("Code must be 8 characters");
      }

      // In a real implementation, this would:
      // 1. Verify the user is authenticated
      // 2. Send the user_code to the backend
      // 3. Backend associates the device with the authenticated user
      // 4. Backend marks the device_code as authorized

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.blocksweb.nl';

      // Get access token from localStorage or auth context
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        throw new Error("Please sign in first");
      }

      const response = await fetch(`${apiUrl}/api/device/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_code: cleanCode,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid or expired code");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to authorize device");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    // Get current URL to return to after sign in
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    // Redirect to sign in page with return URL
    router.push(`/admin/sign-in?redirect_uri=${encodeURIComponent(currentUrl)}`);
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Device Authorized - BlocksWeb</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Device Authorized!
            </h1>
            <p className="text-gray-600 mb-6">
              Your device has been successfully authorized. You can close this
              window and return to your CLI.
            </p>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Authorize Device - BlocksWeb</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Authorize Device
            </h1>
            <p className="text-gray-600">
              Enter the code displayed in your CLI to authorize this device
            </p>
          </div>

          {!isAuthenticated ? (
            <div className="text-center">
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  You need to sign in before authorizing a device
                </p>
              </div>
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthorize} className="space-y-6">
              <div>
                <label
                  htmlFor="userCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Device Code
                </label>
                <input
                  id="userCode"
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-mono tracking-wider uppercase"
                  maxLength={9}
                  autoFocus
                  required
                />
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Enter the 8-character code from your CLI
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || userCode.replace(/[-\s]/g, "").length !== 8}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Authorizing..." : "Authorize Device"}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              How it works
            </h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs mr-3">
                  1
                </span>
                <span>Run the login command in your CLI</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs mr-3">
                  2
                </span>
                <span>Enter the code displayed above</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs mr-3">
                  3
                </span>
                <span>Your CLI will automatically be authenticated</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
