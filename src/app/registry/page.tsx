"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Star, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function RegistryPage() {
  const [search, setSearch] = useState("");

  const services = [
    {
      id: "search-1",
      name: "Web Search",
      capability: "web-search",
      provider: "search-agent",
      price: 0.002,
      calls: 1250,
      rating: 4.8,
    },
    {
      id: "model-1",
      name: "GPT-4 Inference",
      capability: "model-inference",
      provider: "inference-agent",
      price: 0.015,
      calls: 450,
      rating: 4.9,
    },
    {
      id: "analysis-1",
      name: "Data Analysis",
      capability: "data-analysis",
      provider: "analytics-agent",
      price: 0.005,
      calls: 320,
      rating: 4.7,
    },
  ];

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.capability.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Registry</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Discover and compare agent services
            </p>
          </div>
          <Link href="/registry/new">
            <Button variant="primary">Publish Service</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <Input
                placeholder="Search services by name or capability..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filtered.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {service.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {service.capability} • Provider: {service.provider}
                    </p>
                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-mono text-sm font-semibold">
                          {service.price} USDC
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{service.calls} calls</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary">Use Service</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
