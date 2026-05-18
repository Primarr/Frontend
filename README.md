# Primer — Developer Dashboard

> **Visibility and control for autonomous agent spending on Stellar.**  
> Browse the service registry, configure budgets, audit every machine-to-machine payment.

[![Stellar](https://img.shields.io/badge/Stellar-powered-7D00FF)](https://stellar.org)
[![React](https://img.shields.io/badge/react-18-61DAFB)](https://react.dev)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)

**Primer** is a B2B SDK for AI agents that pay each other for services — settled instantly on Stellar in USDC. Agents integrate via the [Backend SDK](https://github.com/Primarr/Backend); **this repository** is the **developer and operator dashboard** that makes Primer deployable inside real companies: registry management, spend analytics, budget policies, and compliance audit trails.

---

## Why a dashboard matters

SDK-only tools are enough for a hackathon. **Enterprises** deploying autonomous agent fleets need:

- A human-readable view of what their agents are buying and from whom
- Budget configuration without writing Soroban calls by hand
- Audit logs exportable for finance and security reviews
- Registry presence — publish services so other agents find and pay you

The Frontend is how Primer becomes a **product companies approve**, not just a library engineers admire.

---

## Core features

### Service registry browser

Explore and manage agent services registered on [Primer Soroban contracts](https://github.com/Primarr/Contract):

- Search by capability, price range, asset
- Publish new services (capability, price-per-call, payout address)
- Pause, update pricing, or deprecate listings
- View invocation volume and revenue (indexed from chain + API)

Think **npm registry**, except every package has a price per call and earns USDC the moment another agent invokes it.

### Agent fleet & keys

- Link Stellar accounts used by agent runtimes
- Rotate keys and scope API access per environment (dev / staging / prod)
- Per-agent labels: `research-bot`, `code-review-agent`, etc.

### Budget & policy management

Visual editor for rules enforced by the Budget Vault contract:

| Control | UI |
|---------|-----|
| Session spending cap | Slider + USDC input |
| Per-task limit | Per workflow template |
| Rate limits | Payments per hour/day |
| Service allowlist | Pick from registry only |
| Human approval threshold | Webhook target + email |

Changes sync to Soroban via the [Backend API](https://github.com/Primarr/Backend) — operators never touch CLI for routine policy updates.

### Analytics & audit

- Real-time payment stream (tx hash → Stellar explorer link)
- Spend by agent, by service, by time window
- Export CSV / JSON for accounting
- Enterprise: role-based access (viewer, operator, admin)

### Webhook console

- Register endpoints for `budget.exceeded`, `payment.settled`, `service.invoked`
- Test payloads, view delivery logs, retry failures

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Primer Dashboard (this repo)                    │
│   Next.js · React · Tailwind · Stellar Wallets Kit          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WebSocket
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Primer Backend API                         │
│        auth · registry proxy · tx indexer · webhooks         │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   Stellar Horizon    Soroban RPC      PostgreSQL
          │                │
          └────────┬───────┘
                   ▼
        Soroban Contracts (Primarr/Contract)
```

### Wallet connection

Operators connect via **Stellar Wallets Kit** (Freighter, xBull, etc.) to:

- Sign registry publish transactions
- Fund agent vault accounts
- Approve override payments when budgets block an agent

Agent runtimes themselves use **server-side keypairs** via the SDK — the dashboard is for humans overseeing the fleet.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 14** (App Router) |
| UI | React 18, Tailwind CSS, shadcn/ui |
| State | TanStack Query |
| Charts | Recharts |
| Stellar | `@stellar/stellar-sdk`, Stellar Wallets Kit |
| Auth | NextAuth + API keys (Backend-issued) |
| Deploy | Vercel / self-hosted Docker |

---

## Screens (planned)

| Route | Purpose |
|-------|---------|
| `/` | Overview — spend today, active agents, recent txs |
| `/registry` | Browse & search published services |
| `/registry/new` | Publish a service to Soroban |
| `/agents` | Fleet list, keys, environment tags |
| `/agents/:id` | Single agent — spend chart, policy, logs |
| `/budgets` | Policy editor → Soroban sync |
| `/transactions` | Searchable ledger with explorer links |
| `/webhooks` | Endpoint management |
| `/settings` | Team, billing plan, API keys |

---

## Repository layout (planned)

```
app/
├── (dashboard)/       # Authenticated routes
├── api/               # BFF proxies to Primer Backend
└── layout.tsx

components/
├── registry/
├── agents/
├── budgets/
└── charts/

lib/
├── stellar.ts         # Wallet + tx helpers
└── api-client.ts      # Typed Backend client

public/
```

---

## Getting started

### Prerequisites

- Node.js 20+
- Running [Primer Backend](https://github.com/Primarr/Backend) (local or staging)
- Freighter or compatible Stellar wallet (testnet)

### Local development

```bash
git clone https://github.com/Primarr/Frontend.git
cd Frontend
cp .env.example .env.local

# .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_STELLAR_NETWORK=testnet

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Connect wallet

1. Switch Freighter to **Testnet**
2. Click **Connect wallet** in the dashboard
3. Fund via [Friendbot](https://laboratory.stellar.org/#account-creator?network=test) if needed

---

## User personas

| Persona | Uses Frontend to… |
|---------|-------------------|
| **Platform engineer** | Integrate SDK, create API keys, test payments |
| **Agent operator** | Set budgets, monitor spend, approve overrides |
| **Service publisher** | List agent capabilities, set per-call pricing |
| **Finance / compliance** | Export audit logs, review vendor payments |

---

## Alignment with Stellar ecosystem

The dashboard surfaces **Stellar-native primitives** to non-crypto users:

- Every payment links to Stellar Expert / Laboratory
- Assets shown in USDC (Stellar issued)
- Registry and budgets backed by **Soroban** — not opaque database flags

This supports SDF's **agentic payments** narrative: Stellar as the settlement layer enterprises see when they turn on autonomous agents.

---

## Roadmap

| Phase | Deliverable |
|-------|-------------|
| **Alpha** | Read-only tx feed + registry browser (testnet) |
| **Beta** | Budget editor, service publish flow, webhooks UI |
| **Launch** | Team roles, billing integration, mainnet |
| **Enterprise** | SSO, custom reports, white-label option |

---

## Related repositories

| Repo | Description |
|------|-------------|
| [Backend](https://github.com/Primarr/Backend) | SDK, API, Stellar orchestration |
| [Contract](https://github.com/Primarr/Contract) | Soroban registry, budget vault, settlement |

---

## Contributing

Design and frontend contributors welcome. Match existing Tailwind patterns. Open an issue for large features.

---

## License

Apache 2.0 — see [LICENSE](LICENSE).

---

## Contact

**Organisation:** [Primarr](https://github.com/Primarr)  
**Programme:** Stellar Community Fund  
**Design feedback:** GitHub Issues

*Primer — payment rails for the agent economy.*
