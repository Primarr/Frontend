"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PublishServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    capability: "",
    description: "",
    pricePerCall: "",
    payoutAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to publish service
    console.log("Publishing service:", formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <Link href="/registry" className="flex items-center gap-2 text-violet-600 hover:text-violet-700">
          <ChevronLeft className="w-4 h-4" />
          Back to Registry
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Publish Service</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            List your agent capability so others can discover and pay you for it
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>
              Define your service parameters and pricing
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Service Name
                </label>
                <Input
                  name="name"
                  placeholder="e.g., GPT-4 Inference"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Capability
                </label>
                <Input
                  name="capability"
                  placeholder="e.g., model-inference"
                  value={formData.capability}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Standardized identifier agents use to discover this service
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe what your service does..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Price per Call (USDC)
                </label>
                <Input
                  name="pricePerCall"
                  type="number"
                  placeholder="0.001"
                  step="0.000001"
                  value={formData.pricePerCall}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  Payout Address
                </label>
                <Input
                  name="payoutAddress"
                  placeholder="Your Stellar account address"
                  value={formData.payoutAddress}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Payments will be sent to this address
                </p>
              </div>
            </CardContent>

            <CardFooter className="gap-3">
              <Link href="/registry" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button variant="primary" type="submit" className="flex-1">
                Publish Service
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
