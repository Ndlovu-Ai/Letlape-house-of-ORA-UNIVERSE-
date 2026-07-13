# Diagram: 03 — Revenue & Treasury Flow

**File:** `03-Revenue-Treasury-Flow.png`

## Description

A flow diagram showing how revenue enters the system across 8 streams, consolidates through MDALA CORE, splits into a 40/30/30 treasury model, feeds VAULT PRIME for monetary policy, and cycles through the OTZA economy.

## Layout

```
┌───────────────────────────────────────────────────────────────┐
│                      REVENUE INFLOWS                          │
├──────────┬──────────┬──────────┬──────────┬──────────────────┤
│ Domain   │  Agent   │  OTCoin  │Governance│ API + Creator +  │
│  Fees    │  Fees    │   Fees   │  Staking │  RWA + Compute   │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴────────┬─────────┘
     │          │          │          │               │
     └──────────┴──────────┴──────────┴───────────────┘
                                   │
                          ┌────────▼─────────┐
                          │    MDALA CORE    │
                          │  (Treasury Agg.) │
                          └────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
     ┌────────▼──────┐    ┌────────▼──────┐    ┌───────▼───────┐
     │   Operating   │    │    Reserve    │    │  Investment   │
     │    Budget     │    │     Vault     │    │     Pool      │
     │     40%       │    │     30%       │    │     30%       │
     └────────┬──────┘    └───────────────┘    └───────────────┘
              │
     ┌────────▼──────────┐
     │    VAULT PRIME    │
     │ (Monetary Policy) │
     └────────┬──────────┘
              │
     ┌────────▼──────────┐
     │   OTCoin (OTZA)   │◄──── Burn (transaction fees)
     │  Mint / Liquidity │
     └────────┬──────────┘
              │
     ┌────────▼──────────┐
     │  NEARO Economic   │
     │   Health Score    │
     └────────┬──────────┘
              │
     ┌────────▼──────────┐
     │  Stabilization    │
     │  Trigger Layer    │
     │  (0-25/26-50/     │
     │   51-75/76-100)   │
     └───────────────────┘
```

## Visual Specification

- **Color theme:** Dark background, green/gold for revenue flows
- Revenue inflow boxes: green top bar
- MDALA CORE: central blue aggregation node
- 40/30/30 split: color-coded (blue/silver/gold)
- VAULT PRIME: orange monetary policy box
- OTCoin: purple token icon with mint/burn arrows
- NEARO Health: color-coded risk gauge (green → red)

## Tool Recommendation

Generate with: Figma, Miro, draw.io, or Excalidraw
