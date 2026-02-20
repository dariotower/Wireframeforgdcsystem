import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';

const transitionMessages = {
  1: {
    title: 'BLOQUE 1 COMPLETADO',
    message: '«El cambio tiene norte y propósito.»',
    nextAction: 'Ahora analicemos el impacto humano.',
    nextPhase: 2,
  },
  2: {
    title: 'BLOQUE 2 COMPLETADO',
    message: '«Entendés a quién impacta y cómo.»',
    nextAction: 'Ahora definamos la orquestación.',
    nextPhase: 3,
  },
};

export default function Transition() {
  const { id } = useParams();
  const phaseId = parseInt(id || '1');
  const navigate = useNavigate();

  const transition = transitionMessages[phaseId as keyof typeof transitionMessages];

  const handleContinue = () => {
    navigate(`/phase/${transition.nextPhase}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[600px] border-2 border-black p-12 text-center">
        <p className="text-lg font-extrabold mb-8">{transition.title}</p>

        <h1 className="text-[20px] font-bold leading-7 mb-2">
          {transition.message}
        </h1>
        <p className="text-[20px] font-bold leading-7 mb-8">
          {transition.nextAction}
        </p>

        <Button
          onClick={handleContinue}
          className="w-full max-w-[360px] h-14 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-base font-bold rounded-none mt-4"
        >
          Ir a Fase {transition.nextPhase}
        </Button>
      </div>
    </div>
  );
}