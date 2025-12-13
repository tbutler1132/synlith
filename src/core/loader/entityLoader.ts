import { db } from '../../infra/db/client';
import { EntityType, Synth as DbSynth } from '../../infra/db/schema';
// TODO: Import proper Domain Types from '../types' once we align ID types (string vs number)

export const entityLoader = {
  /**
   * Loads a raw Synth from the persistence layer.
   * In the future, this will merge the base entity with its subtype data.
   */
  async loadSynth(id: number): Promise<DbSynth | null> {
    const synths = await db.getSynths();
    const synth = synths.find(s => s.id === id);
    return synth || null;
  },

  /**
   * Loads all Synths.
   */
  async loadAllSynths(): Promise<DbSynth[]> {
    return db.getSynths();
  },

  /**
   * Loads an EntityType by ID.
   */
  async loadEntityType(id: number): Promise<EntityType | null> {
    const types = await db.getEntityTypes();
    const type = types.find(t => t.id === id);
    return type || null;
  }
};
