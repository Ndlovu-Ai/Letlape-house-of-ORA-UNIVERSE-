# Diagram: 02 — Alutha-Alpha Oracle Network

**File:** `02-Alutha-Alpha-Oracle-Network.png`

## Description

A network topology diagram showing the five oracle node types feeding into the Signal Fusion Engine, which routes through NEARO into the Council and NEO layers.

## Layout

```
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  Economic    │  │     Risk     │  │  Governance  │
  │   Oracle     │  │    Oracle    │  │   Oracle     │
  │  (OTZA/DEX)  │  │  (NEARO)    │  │  (K1 Reg.)   │
  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
         │                 │                  │
         └────────┬────────┘                  │
                  │          ┌────────────────┘
         ┌──────────────┐    │  ┌──────────────┐
         │  External    │    │  │    Agent     │
         │   Oracle     │    │  │   Oracle     │
         │  (API/GFeed) │    │  │  (144k Swarm)│
         └──────┬───────┘    │  └──────┬───────┘
                └────────────┼─────────┘
                             │
                     ┌───────▼────────┐
                     │  AAON Signal   │
                     │ Fusion Engine  │
                     │ (3-of-5 min    │
                     │  consensus)    │
                     └───────┬────────┘
                             │
                     ┌───────▼────────┐
                     │     NEARO      │
                     │  Risk Score    │
                     │   (0–100)      │
                     └───────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
       ┌───────▼────┐ ┌──────▼──────┐ ┌───▼────────┐
       │  Council   │ │  Emissary   │ │    NEO     │
       │ Intelligence│ │  Routing   │ │ Directive  │
       │(14 Councils)│ │(6 Emissary)│ │  (Override)│
       └────────────┘ └─────────────┘ └────────────┘
```

## Visual Specification

- **Color theme:** Dark background, cyan/teal for oracle nodes
- Oracle nodes: circular icons with data-source labels
- Fusion Engine: central hexagon
- NEARO: diamond shape with risk color indicator (green/yellow/orange/red)
- Council/Emissary/NEO: rectangular boxes with hierarchy indicator
- Arrows: solid lines for data flow, dashed lines for feedback

## Tool Recommendation

Generate with: Figma, Miro, draw.io, or Excalidraw
