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
      <div className="w-full max-w-[600px] border-2 border-black p-12 text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle2 className="w-24 h-24 text-black" />
        </div>

        <h1 className="text-[22px] font-extrabold leading-[30px] mb-4">
          ✔ Recorrido completo
        </h1>
        
        <p className="text-base leading-6 mb-12 opacity-90">
          Gracias por diseñar tu cambio pensando en su adopción.
          <br />
          Cultura puede acompañarte si lo necesitás.
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleDownloadPDF}
            className="w-full max-w-[360px] h-14 border-2 border-black bg-gray-200 hover:bg-gray-300 text-black text-base font-bold rounded-none flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Descargar resumen
          </Button>

          <Button
            onClick={handleScheduleMeeting}
            className="w-full max-w-[360px] h-14 border-2 border-black bg-white hover:bg-gray-100 text-black text-base font-bold rounded-none flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Solicitar acompañamiento
          </Button>
        </div>

        <p className="text-sm opacity-70 mt-8">
          ¡Gracias por usar el Sistema GdC!
        </p>
      </div>
    </div>
  );
}