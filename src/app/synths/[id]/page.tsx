import { entityLoader } from '@/core/loader/entityLoader';
import { notFound } from 'next/navigation';

export default async function SynthPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object first (Next.js 15+ requirement/pattern)
  const { id } = await params;
  const numericId = parseInt(id, 10);
  
  if (isNaN(numericId)) {
    notFound();
  }

  const synth = await entityLoader.loadSynth(numericId);

  if (!synth) {
    notFound();
  }

  return (
    <div>
      <header>
        <div>
           {synth.status.replace('_', ' ')}
        </div>
        <h1>{synth.name}</h1>
      </header>

      <section>
        <h2>Preferred Observation</h2>
        <p>
          {synth.preferredObservation}
        </p>
      </section>

      <div>
        <div>
          <span>Horizon</span>
          <span>{synth.horizon}</span>
        </div>
        <div>
          <span>Expected Effort</span>
          <span>{synth.expectedEffort}</span>
        </div>
      </div>
    </div>
  );
}
