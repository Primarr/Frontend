"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";

export default function WebhooksPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    events: ["payment.settled"],
  });

  const webhooks = [
    {
      id: "wh-1",
      url: "https://myapp.com/primer/webhooks",
      events: ["payment.settled", "budget.exceeded"],
      lastDelivery: "2 minutes ago",
      status: "healthy",
    },
    {
      id: "wh-2",
      url: "https://slack.com/services/...",
      events: ["budget.exceeded"],
      lastDelivery: "1 hour ago",
      status: "healthy",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to create webhook
    console.log("Creating webhook:", formData);
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Webhooks</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Receive real-time notifications for payment and budget events
            </p>
          </div>
          {!showForm && (
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              Register Webhook
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Register Webhook Endpoint</CardTitle>
              <CardDescription>
                We'll send HMAC-signed POST requests to your endpoint
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Webhook URL
                  </label>
                  <Input
                    name="url"
                    type="url"
                    placeholder="https://your-app.com/webhooks/primer"
                    value={formData.url}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                    Events
                  </label>
                  <div className="space-y-2">
                    {["payment.settled", "payment.failed", "budget.exceeded", "service.invoked"].map(
                      (event) => (
                        <label key={event} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={event === "payment.settled"}
                            className="w-4 h-4 rounded border-zinc-300"
                          />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            {event}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter gap-3>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="flex-1">
                  Create Webhook
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <code className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                      {webhook.url}
                    </code>
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Events
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mt-1">
                          {webhook.events.join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Last Delivery
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mt-1">
                          {webhook.lastDelivery}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Status
                        </div>
                        <div className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                          {webhook.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors" title="Send test payload">
                      <Play className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors" title="Delete webhook">
                      <Trash2 className="w-4 h-4 text-red-600" />
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
