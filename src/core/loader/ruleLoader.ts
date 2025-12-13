import { db } from '../../infra/db/client';
import { OntologicalRule } from '../../infra/db/schema';

export const ruleLoader = {
  /**
   * Loads all rules that apply to a specific kind of entity.
   */
  async loadRulesFor(kind: string): Promise<OntologicalRule[]> {
    const allRules = await db.getRules();
    // In a real DB, this would be a WHERE clause
    return allRules.filter((r: OntologicalRule) => r.applies_to_kind === kind);
  }
};
