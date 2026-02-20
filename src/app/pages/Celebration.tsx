import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';

const celebrationMessages = {
  1: {
    title: '✓ Bloque 1 completado',
    subtitle: 'El cambio tiene sentido y dirección clara.',
  },
  2: {
    title: '✓ Bloque 2 completado',
    subtitle: 'Entendés el impacto humano y los riesgos culturales.',
  },
  3: {
    title: '✓ Bloque 3 completado',
    subtitle: 'Tenés un plan de orquestación y medición definido.',
  },
};

export default function Celebration() {
  const { id } = useParams();
  const phaseId = parseInt(id || '1');
  const navigate = useNavigate();

  const message = celebrationMessages[phaseId as keyof typeof celebrationMessages];

  const handleContinue = () => {
    if (phaseId < 3) {
      navigate(`/transition/${phaseId}`);
    } else {
      navigate('/finalization');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[600px] border-2 border-black p-12 text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-20 h-20 text-black" />
        </div>

        <h1 className="text-[20px] font-bold leading-7 mb-4">
          {message.title}
          <br />
          {message.subtitle}
        </h1>

        <Button
          onClick={handleContinue}
          className="w-full max-w-[360px] h-14 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-base font-bold rounded-none mt-8"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}