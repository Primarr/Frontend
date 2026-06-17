"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const spendData = [
    { date: "Mon", amount: 120 },
    { date: "Tue", amount: 150 },
    { date: "Wed", amount: 180 },
    { date: "Thu", amount: 140 },
    { date: "Fri", amount: 200 },
    { date: "Sat", amount: 160 },
    { date: "Sun", amount: 190 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link href="/agents" className="flex items-center gap-2 text-violet-600 hover:text-violet-700">
          <ChevronLeft className="w-4 h-4" />
          Back to Agents
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">research-bot</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Production environment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Spent
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
                $1,234.56
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                +5.2% this week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                API Calls
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
                450
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Avg: 64/day
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Budget Status
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
                $750.00
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Remaining this month
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
            <CardDescription>Daily spending over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Last 5 payments from this agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-50">
                      Service Call #{i + 1}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {i * 15} minutes ago
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      ${(Math.random() * 10).toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      ✓ Settled
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
