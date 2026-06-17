"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, Users, Zap, Activity } from "lucide-react";

const mockTransactions = [
  { id: 0, amount: 67.46 },
  { id: 1, amount: 86.58 },
  { id: 2, amount: 48.47 },
  { id: 3, amount: 36.94 },
  { id: 4, amount: 56.09 },
];

export default function Home() {

  const stats = [
    {
      label: "Total Spent Today",
      value: "$2,345.67",
      change: "+12.5%",
      icon: TrendingUp,
    },
    {
      label: "Active Agents",
      value: "8",
      change: "+2",
      icon: Users,
    },
    {
      label: "Services Running",
      value: "23",
      change: "+5",
      icon: Zap,
    },
    {
      label: "Transactions",
      value: "1,234",
      change: "+89",
      icon: Activity,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Overview</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Monitor your agent fleet spending and service performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, icon: Icon }) => (
            <Card key={label}>
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription>{label}</CardDescription>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      {value}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {change}
                    </div>
                  </div>
                </div>
                <Icon className="w-6 h-6 text-violet-600" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 10 payments settled on Stellar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
                  >
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-50">
                        Agent {tx.id + 1} → Service
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        2 minutes ago
                      </div>
                    </div>
                    <div className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      ${tx.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/registry/new" className="block">
                <Button variant="primary" className="w-full">
                  Publish Service
                </Button>
              </Link>
              <Link href="/agents" className="block">
                <Button variant="secondary" className="w-full">
                  Manage Agents
                </Button>
              </Link>
              <Link href="/budgets" className="block">
                <Button variant="secondary" className="w-full">
                  Set Budgets
                </Button>
              </Link>
              <Link href="/registry" className="block">
                <Button variant="secondary" className="w-full">
                  Browse Registry
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
