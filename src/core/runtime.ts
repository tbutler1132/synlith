import { validateTransition } from './engine/transitionValidator';
import { entityLoader } from './loader/entityLoader';
import { ruleLoader } from './loader/ruleLoader';
import { Rule, Actor } from './types';
import { Synth as DbSynth } from '../infra/db/schema';

export class Runtime {
  /**
   * Executes a state transition on an entity.
   * This is the core "Physics" engine of the civilization.
   */
  async executeTransition(entityId: number, transitionName: string, actor: Actor): Promise<{ success: boolean; error?: string }> {
    // 1. Load Entity
    const entity = await entityLoader.loadSynth(entityId);
    if (!entity) {
      return { success: false, error: `Entity ${entityId} not found` };
    }

    // 2. Fetch Rules (Ontology)
    // We now load these from the "Constitution" (Rules.json) via our loader.
    // In the future, we might look up "kind" dynamically from the EntityType.
    const rules = await ruleLoader.loadRulesFor('Synth');

    // 3. Validate (Physics Check)
    const validation = await validateTransition(entity, transitionName, actor, rules);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // 4. Apply Effects (State Change)
    // TODO: move this to a dedicated "EffectRunner"
    console.log(`[Runtime] Transition '${transitionName}' approved for Entity ${entityId}. Applying effects...`);
    
    // Mock application from effects found in rules? 
    // Ideally we iterate `rules.effects` but for now let's just log success.
    
    return { success: true };
  }
}

export const runtime = new Runtime();


