import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';

export default function Cover() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-24">
      <div className="max-w-[1248px] w-full">
        {/* Title */}
        <h1 className="text-[52px] font-bold leading-[60px] mb-6">
          GdC — Sistema de Gestión del Cambio
        </h1>

        {/* Subtitle */}
        <p className="text-[22px] font-medium leading-[30px] mb-16 max-w-[980px]">
          Wireframe conceptual · Arquitectura funcional · Secuencial (sin juicio) · Admin
          KPIs
        </p>

        {/* CTA */}
        <Button
          onClick={() => navigate('/login')}
          className="h-16 px-12 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-lg font-bold rounded-none"
        >
          Ingresar al sistema
        </Button>

        {/* Footer */}
        <p className="text-base font-medium opacity-70 mt-[600px]">
          Distrocuyo · 2026
        </p>
      </div>
    </div>
  );
}
