import path from 'path';
import { promises as fs } from 'fs';
import { EntityType, Synth } from './schema';

const DATA_DIR = path.join(process.cwd(), 'src', 'infra', 'data');

async function readJsonFile<T>(filename: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as T[];
}

export const db = {
  getEntityTypes: () => readJsonFile<EntityType>('EntityTypes.json'),
  getSynths: () => readJsonFile<Synth>('Synths.json'),
  getRules: () => readJsonFile<any>('Rules.json'), // Using 'any' for now to avoid extensive type imports/refs here, but ideally uses OntologicalRule
};
