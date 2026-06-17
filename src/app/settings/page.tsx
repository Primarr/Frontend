"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Copy, RotateCw } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("pk_test_51234567890");
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage your account, billing, and API credentials
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
            <CardDescription>Your organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                Team Name
              </label>
              <Input placeholder="Acme Corp" defaultValue="Acme Corp" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                Email
              </label>
              <Input type="email" placeholder="team@acme.com" defaultValue="team@acme.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="primary">Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Use this key to authenticate API requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm">
                {showApiKey ? apiKey : "••••••••••••••••••••••••"}
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
              >
                {showApiKey ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
              Keep this key secret. Regenerating it will invalidate the old one.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <RotateCw className="w-4 h-4" />
              Regenerate Key
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Plan</CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">Developer Plan</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  $199/month • Analytics • Budget UI • Higher rate limits
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  $199
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">per month</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">View Invoice</Button>
            <Button variant="outline">Change Plan</Button>
          </CardFooter>
        </Card>

        <Card className="border-red-200 dark:border-red-900/30">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="danger">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
