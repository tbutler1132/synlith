export interface EntityType {
  id: number;
  name: string;
  description: string;
  fields: any[];
}

export interface Synth {
  id: number;
  name: string;
  horizon: number;
  preferredObservation: string;
  expectedEffort: string;
  status: string;
  childrenSynths: number[]; 
}

export interface OntologicalRule {
  applies_to_kind: string;
  transition: string;
  conditions: Record<string, any>[]; // Flexible for now (e.g. { requiresRole: "steward" })
  effects: Record<string, any>[];    // Flexible for now (e.g. { setState: ... })
}
