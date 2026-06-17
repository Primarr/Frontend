"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");

  const transactions = [
    {
      id: "tx-1",
      from: "research-bot",
      to: "inference-agent",
      service: "GPT-4 Inference",
      amount: 0.015,
      status: "settled",
      timestamp: "2 minutes ago",
      txHash: "abc123def456",
    },
    {
      id: "tx-2",
      from: "analysis-agent",
      to: "search-bot",
      service: "Web Search",
      amount: 0.002,
      status: "settled",
      timestamp: "5 minutes ago",
      txHash: "def456abc123",
    },
    {
      id: "tx-3",
      from: "code-review",
      to: "inference-agent",
      service: "GPT-4 Inference",
      amount: 0.015,
      status: "pending",
      timestamp: "8 minutes ago",
      txHash: "ghi789def456",
    },
  ];

  const filtered = transactions.filter(
    (t) =>
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase()) ||
      t.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Transactions</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Audit log of all agent-to-agent payments
            </p>
          </div>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <Input
                placeholder="Search by agent or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>{filtered.length} transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">
                      From → To
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">
                      Service
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">
                      Amount
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">
                      Time
                    </th>
                    <th className="text-right py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-50">
                            {tx.from}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            to {tx.to}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">
                        {tx.service}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                        {tx.amount} USDC
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            tx.status === "settled"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                        {tx.timestamp}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://stellar.expert/explorer/testnet/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors inline-block"
                          title="View on Stellar Expert"
                        >
                          <ExternalLink className="w-4 h-4 text-violet-600" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
