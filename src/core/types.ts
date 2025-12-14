export interface EntityType {
  id: string;
  name: string;
  description: string;
  fields: Field[];
}

export interface Field {
  name: string;
  description: string;
  type: "string" | "number" | "enum";
}

export interface Entity {
  id: string;
}

export interface Synth extends Entity {
  name: string;
  horizon: Horizon;
  preferredObservation: string;
  parentSynth: Synth;
  childrenSynths: Synth[];
  expectedEffort: "low" | "medium" | "high";
  priorPreferenceStrength: "low" | "medium" | "high";
  status: "not_started" | "in_progress" | "complete";
}

export interface Horizon extends Entity {
  name: string;
  description: string;
  level: number;
}

export interface Actor {
  id: string;
  role: string;
}

export interface Rule {
  transition: string;
  conditions: Condition[];
}

export interface Condition {
  requiresRole?: string;
  childrenMustBe?: string;
  [key: string]: any; // Allow for extensibility
}
