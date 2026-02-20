import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';

export default function Map() {
  const { phases, currentPhase } = useApp();
  const navigate = useNavigate();

  const phaseData = [
    { id: 1, name: 'Bloque 1', description: 'Sentido' },
    { id: 2, name: 'Bloque 2', description: 'Impacto humano' },
    { id: 3, name: 'Bloque 3', description: 'Orquestación' },
  ];

  const totalCompleted = phases.filter((p) => p.completed).length;
  const progressPercentage = Math.round((totalCompleted / phases.length) * 100);

  const handleEnterPhase = () => {
    const nextPhase = phases.find((p) => !p.completed);
    if (nextPhase) {
      navigate(`/phase/${nextPhase.phaseId}`);
    } else {
      navigate('/finalization');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-[1248px] mx-auto">
        {/* Top Bar */}
        <div className="border-2 border-black px-6 py-4 mb-12">
          <h1 className="text-base font-semibold">GdC · Mapa del recorrido</h1>
        </div>

        {/* Phase Path */}
        <div className="flex items-center justify-center gap-8 mb-16 flex-wrap">
          {phaseData.map((phase, index) => (
            <div key={phase.id} className="flex items-center gap-8">
              {/* Node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full border-2 border-black flex items-center justify-center ${
                    phases[index].completed
                      ? 'bg-gray-200'
                      : currentPhase === phase.id
                      ? 'bg-gray-200'
                      : 'bg-white'
                  }`}
                >
                  {phases[index].completed ? (
                    <CheckCircle2 className="w-10 h-10" />
                  ) : currentPhase === phase.id ? (
                    <Circle className="w-10 h-10 fill-black" />
                  ) : (
                    <Circle className="w-10 h-10" />
                  )}
                </div>
                <p
                  className={`mt-4 text-sm font-semibold ${
                    currentPhase > phase.id || phases[index].completed
                      ? 'opacity-100'
                      : 'opacity-70'
                  }`}
                >
                  {phase.name}
                </p>
                <p className="text-xs opacity-60">{phase.description}</p>
              </div>

              {/* Connector Line */}
              {index < phaseData.length - 1 && (
                <div
                  className={`w-24 h-0.5 ${
                    phases[index].completed ? 'bg-black' : 'bg-black opacity-30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Card */}
        <div className="border-2 border-black p-8 max-w-3xl mx-auto">
          <p className="text-base font-semibold mb-6">
            Progreso general: {progressPercentage}% (Fase {currentPhase} activa)
          </p>
          
          <div className="w-full h-2 bg-gray-200 mb-6">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <Button
            onClick={handleEnterPhase}
            className="w-full max-w-[360px] h-14 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-base font-bold rounded-none"
          >
            {totalCompleted === phases.length
              ? 'Ver resultados'
              : `Entrar en Fase ${currentPhase}`}
          </Button>
        </div>
      </div>
    </div>
  );
}