import { CheckCircle2, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

export default function Finalization() {
  const { user, phases } = useApp();

  const handleDownloadPDF = () => {
    // Generate a simple summary
    const summary = `
GdC — Sistema de Gestión del Cambio
Resumen de Proyecto

Usuario: ${user?.name}
Email: ${user?.email}
Fecha: ${new Date().toLocaleDateString('es-ES')}

==============================================

${phases
  .map(
    (phase, index) => `
FASE ${phase.phaseId}
${'-'.repeat(50)}
${Object.entries(phase.questions)
  .map(([qId, answer]) => `Pregunta ${parseInt(qId) + 1}:\n${answer}\n`)
  .join('\n')}
`
  )
  .join('\n')}

==============================================

Este documento fue generado por el Sistema GdC.
Distrocuyo · 2026
    `.trim();

    // Create a blob and download
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GdC-Resumen-${user?.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScheduleMeeting = () => {
    // Open email client with pre-filled template
    const subject = 'Solicitud de acompañamiento - GdC';
    const body = `Hola,

He completado el recorrido del Sistema de Gestión del Cambio (GdC) y me gustaría solicitar acompañamiento del equipo de Cultura para revisar los resultados.

Nombre: ${user?.name}
Email: ${user?.email}

Gracias,
${user?.name}`;

    window.location.href = `mailto:cultura@distrocuyo.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[700px] border-2 border-black p-12">
        <div className="flex justify-center mb-8">
          <CheckCircle2 className="w-24 h-24 text-black" />
        </div>

        <h1 className="text-[22px] font-extrabold leading-[30px] mb-6 text-center">
          ✅ Completaste tu Mapa del Cambio.
        </h1>
        
        <p className="text-base leading-6 mb-8 text-center">
          Ahora tu iniciativa tiene propósito claro, impacto definido y criterios de adopción medibles.
        </p>

        <div className="flex justify-center mb-10">
          <Button
            onClick={handleDownloadPDF}
            className="w-full max-w-[420px] h-14 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-base font-bold rounded-none flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            📥 Descargar infografía de mi recorrido
          </Button>
        </div>

        <div className="border-t-2 border-black pt-8">
          <h2 className="text-lg font-bold mb-4">🧭 ¿Cómo seguimos?</h2>
          
          <p className="text-[15px] leading-6 mb-4">
            Durante los próximos 15 días, <strong>Cultura convocará una Mesa de Acompañamiento al Cambio</strong> para repasar tu iniciativa junto al sponsor.
          </p>

          <div className="bg-gray-50 border-2 border-gray-300 p-6 mb-6">
            <p className="text-sm font-semibold mb-3">En este espacio:</p>
            <ul className="text-sm space-y-2 opacity-90">
              <li>• El Sponsor presentará el propósito y la necesidad del cambio.</li>
              <li>• El líder del proyecto detallará el alcance y el despliegue previsto.</li>
              <li>• Se revisarán la claridad, los riesgos culturales y los indicadores de adopción definidos.</li>
            </ul>
          </div>

          <p className="text-sm opacity-80 mb-6">
            Si la iniciativa requiere fortalecerse metodológicamente, volverá a revisión antes de su implementación.
          </p>

          <p className="text-sm font-semibold text-center">
            Gracias por diseñar tu cambio pensando en su adopción.
            <br />
            <span className="opacity-70">Cultura Distrocuyo</span>
          </p>
        </div>
      </div>
    </div>
  );
}