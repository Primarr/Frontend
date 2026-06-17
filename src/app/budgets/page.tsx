"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function BudgetsPage() {
  const [formData, setFormData] = useState({
    sessionCap: "5.0",
    taskCap: "0.5",
    approvalThreshold: "1.0",
    rateLimit: "100",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to update budget
    console.log("Updating budget:", formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Budget & Policies</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Configure spending limits and approval workflows
          </p>
        </div>

        <Card className="border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="pt-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200">
                Policies enforced on-chain
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                All spending limits are enforced by Soroban Budget Vault contracts — not a database flag.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Limits</CardTitle>
            <CardDescription>
              Define how much your agents can spend per session and task
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Session Cap (USDC)
                </label>
                <Input
                  name="sessionCap"
                  type="number"
                  step="0.01"
                  placeholder="5.0"
                  value={formData.sessionCap}
                  onChange={handleChange}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Maximum spend per agent session
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Per-Task Cap (USDC)
                </label>
                <Input
                  name="taskCap"
                  type="number"
                  step="0.01"
                  placeholder="0.5"
                  value={formData.taskCap}
                  onChange={handleChange}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Maximum spend per individual task
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Approval Threshold (USDC)
                </label>
                <Input
                  name="approvalThreshold"
                  type="number"
                  step="0.01"
                  placeholder="1.0"
                  value={formData.approvalThreshold}
                  onChange={handleChange}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Payments above this require human approval via webhook
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Rate Limit (calls/hour)
                </label>
                <Input
                  name="rateLimit"
                  type="number"
                  placeholder="100"
                  value={formData.rateLimit}
                  onChange={handleChange}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Maximum API calls per hour
                </p>
              </div>
            </CardContent>

            <CardFooter gap-3>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1">
                Save Policies
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Allowlist</CardTitle>
            <CardDescription>
              Restrict agents to only use approved services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 px-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">
                  Web Search
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  search-agent • 0.002 USDC/call
                </div>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">
                  GPT-4 Inference
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  inference-agent • 0.015 USDC/call
                </div>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
