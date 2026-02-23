import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setUser({ name, email });
      navigate('/map');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[600px] border-2 border-black p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="border-2 border-black bg-gray-100 px-8 py-4">
            <p className="text-base font-semibold">GdeC</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-bold leading-[34px] mb-6">
          Antes de lanzar tu cambio, diseñemos su recorrido.
        </h1>

        {/* Body Text */}
        <p className="text-base leading-6 mb-8 opacity-80">
          El éxito de un cambio no se mide por su anuncio, sino por su adopción.
          <br />
          Este espacio te acompaña a ordenar tu iniciativa para que tenga impacto real, liderazgo visible y resultados sostenibles.
          <br />
          No es una evaluación. Es una herramienta para potenciar tu cambio.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Nombre y apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 border-2 border-black rounded-none bg-gray-100"
            required
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 border-2 border-black rounded-none bg-gray-100"
            required
          />

          <p className="text-[13px] opacity-70 mt-2">
            Tu información solo se utiliza para identificar tu proyecto.
          </p>

          <Button
            type="submit"
            className="w-full h-16 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-lg font-bold rounded-none mt-6"
          >
            Comenzar
          </Button>
        </form>

        <p className="text-[13px] opacity-70 text-center mt-6">
          Tus respuestas son confidenciales y seguras.
        </p>
      </div>
    </div>
  );
}