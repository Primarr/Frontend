"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Copy, MoreVertical } from "lucide-react";

export default function AgentsPage() {
  const agents = [
    {
      id: "agent-1",
      name: "research-bot",
      address: "GAVXXX...XXXX",
      environment: "prod",
      lastActive: "2 minutes ago",
      spent: "$1,234.56",
      calls: 450,
    },
    {
      id: "agent-2",
      name: "analysis-agent",
      address: "GBYXXX...XXXX",
      environment: "staging",
      lastActive: "10 minutes ago",
      spent: "$567.89",
      calls: 120,
    },
    {
      id: "agent-3",
      name: "code-review",
      address: "GCZXXX...XXXX",
      environment: "dev",
      lastActive: "1 hour ago",
      spent: "$89.01",
      calls: 45,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Agents</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Manage your agent fleet and API keys
            </p>
          </div>
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            Add Agent
          </Button>
        </div>

        <div className="space-y-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        {agent.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          agent.environment === "prod"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200"
                            : agent.environment === "staging"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                        }`}
                      >
                        {agent.environment}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                        {agent.address}
                      </code>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(agent.address)
                        }
                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-zinc-500" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-4">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Last Active
                        </div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-50 mt-1">
                          {agent.lastActive}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Total Spent
                        </div>
                        <div className="font-mono font-semibold text-zinc-900 dark:text-zinc-50 mt-1">
                          {agent.spent}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Calls Made
                        </div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-50 mt-1">
                          {agent.calls}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/agents/${agent.id}`}>
                      <Button variant="secondary">View Details</Button>
                    </Link>
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
