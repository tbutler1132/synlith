# **Synlith V1 — Ontology-Native Prototype**

Synlith V1 is the **first technical expression** of a larger semantic system and future network-state platform.

It is deliberately minimal: a small, clean prototype that demonstrates how **ontology**, **semantic rules**, and a **runtime-driven state model** can replace ad-hoc CRUD applications.

This version is designed to support:

- **a narrative of engineering clarity and conceptual depth**
- **a foundation for future expansion** without over-engineering

Synlith V1 focuses on one idea:

> Entities should behave according to semantic rules, not arbitrary backend code.

---

## 🜁 Core Concepts

### **Synths**

A **Synth** is a semantic unit of directed intention.

It represents a _Preferred Observation_ (“what you want to witness in the world”) alongside:

- Horizon (Becoming / Vision / Goal / Project / Action)
- Precision Indicators
- Status transitions
- Parent–child structure (No Orphan Rule)

In Synlith V1, you can:

- create Synths,
- view them,
- update them,
- and change their status through the semantic runtime.

---

### **Semantic Runtime**

Instead of traditional updates, Synlith uses **rule-based transitions**.

A transition (e.g. `Synth.create`, `Synth.changeStatus`) goes through:

1. **Rule loading** (rules stored as data)
2. **Validation** (conditions, invariants)
3. **State transformation** (effects)
4. **Persistence** (entity update + transition log)

This creates a small but real example of:

- behavior as data,
- deterministic state transitions,
- and ontology-native logic.

---

### **World Entities**

V1 introduces a second kind — `WorldEntity` — representing things in the world that Synths refer to:

- projects
- artifacts
- topics
- concepts

This models the relationship between **agent intention** and **world structure**.

---

## 🜁 Architecture

```
src/
  core/          # ontology + runtime engine
  app/           # rituals (createSynth, changeStatus, etc.)
  infra/         # db schema, entity loader, rule definitions
  pages/         # minimal UI for interacting with Synths

```

The architecture mirrors the conceptual model:

- **core/** = meaning + state-transition logic
- **app/** = high-level rituals
- **infra/** = storage and adapter layer
- **pages/** = human interface

This division allows Synlith to scale later into:

- governance
- collaboration
- distributed semantic inference
- a generalized ontology editor
- network-state primitives

without changing fundamental assumptions.

---

## 🜁 Features in V1

### ✔ Create Synths via semantic transitions

Not CRUD — transitions interpreted through rules.

### ✔ Change Synth status with runtime enforcement

Illegal transitions are rejected by rule logic.

### ✔ Basic Slash-Notion-like UI

- list Synths
- view details
- trigger transitions

### ✔ Transition log

Every state update is recorded, demonstrating traceability.

### ✔ Minimal, clean code

Designed to be readable in interviews.

---

## 🜁 Why Synlith V1 Exists

Synlith V1 is intentionally small.

It is:

- a **seed crystal** for the future platform,
- a **philosophical statement** about how systems should be built,
- a **practical demonstration** of runtime-driven entities,
- and a **portfolio artifact** that shows conceptual maturity.

It should feel like **the beginning of something larger**, not a finished product.

---

## 🜁 Getting Started

```bash
pnpm install
pnpm run dev

```

Navigate to:

```
http://localhost:3000/synths

```

Create a Synth and move it through transitions via the runtime engine.

---

## 🜁 License

MIT

---

## 🜁 Roadmap (Post-V1)

- ontology editor
- richer runtime rules
- invariants + constraint system
- Processes (policy templates)
- identity primitives
- world graph
- collaboration
- decentralized consensus (optional)
