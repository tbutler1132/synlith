import { db } from '../../infra/db/client';
import { entityLoader } from '../loader/entityLoader';
import { Rule, Actor } from '../types';
import { Synth as DbSynth } from '../../infra/db/schema';

/**
 * Validates if a state transition is allowed based on the ontological rules.
 */
export async function validateTransition(
  entity: DbSynth, 
  transition: string, 
  actor: Actor, 
  rules: Rule[]
): Promise<{ valid: boolean; error?: string }> {
  
  // Find the rule for this transition
  const rule = rules.find(r => r.transition === transition);
  
  if (!rule) {
    // If no rule exists for this transition, is it allowed? 
    // For now, let's say NO (must be explicit).
    return { valid: false, error: `No rule defined for transition '${transition}'` };
  }

  // Check conditions
  for (const condition of rule.conditions) {
    
    // Condition: requiresRole
    if (condition.requiresRole) {
      if (actor.role !== condition.requiresRole) {
         return { valid: false, error: `Condition failed: requiresRole '${condition.requiresRole}'` };
      }
    }

    // Condition: childrenMustBe
    if (condition.childrenMustBe) {
       // We need to fetch children
       // Assuming entity has childrenSynths array of IDs
       if (entity.childrenSynths && entity.childrenSynths.length > 0) {
          const childrenIds = entity.childrenSynths;
          const allSynths = await entityLoader.loadAllSynths();
          
          for (const childId of childrenIds) {
             const child = allSynths.find(s => s.id === childId);
             if (!child) continue; // Should error?
             
             if (child.status !== condition.childrenMustBe) {
                return { 
                  valid: false, 
                  error: `Condition failed: Child ${childId} status is '${child.status}', must be '${condition.childrenMustBe}'` 
                };
             }
          }
       }
    }

    // Add other condition handlers here...
  }

  return { valid: true };
}
