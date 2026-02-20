export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  subQuestion?: {
    text: string;
    type: 'text' | 'textarea';
    placeholder: string;
    required?: boolean;
  };
  feedback?: (answer: string) => string | null;
  example?: string;
}

export interface PhaseData {
  id: number;
  name: string;
  title: string;
  description: string;
  questions: Question[];
}

export const phasesData: PhaseData[] = [
  {
    id: 1,
    name: 'Fase 1',
    title: 'BLOQUE 1 – SENTIDO',
    description: 'Direccionalidad estratégica',
    questions: [
      {
        id: 1,
        text: '¿Qué cambia?',
        type: 'radio',
        options: [
          'Proceso',
          'Sistema / herramienta',
          'Rol / estructura',
          'Práctica cultural',
          'Otro',
        ],
        required: true,
        subQuestion: {
          text: 'Describí el cambio en una frase clara y comprensible para cualquier persona de la compañía.',
          type: 'textarea',
          placeholder: 'Ej: Vamos a implementar un nuevo sistema de gestión de proyectos...',
          required: true,
        },
      },
      {
        id: 2,
        text: '¿Por qué cambia?',
        type: 'radio',
        options: [
          'Problema operativo',
          'Oportunidad estratégica',
          'Requerimiento externo',
          'Mejora cultural',
        ],
        required: true,
        subQuestion: {
          text: '¿Qué problema concreto resuelve o qué oportunidad habilita?',
          type: 'textarea',
          placeholder: 'Describe el problema específico o la oportunidad...',
          required: true,
        },
      },
      {
        id: 3,
        text: '¿Para qué cambia?',
        type: 'textarea',
        placeholder: '¿Qué impacto esperás ver en 3–6 meses?',
        required: true,
        feedback: (answer: string) => {
          const wordCount = answer.trim().split(/\s+/).length;
          if (wordCount < 10) {
            return '💡 Podría fortalecerse el impacto esperado. Intenta ser más específico.';
          }
          return '✓ Tu propósito está claro';
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Fase 2',
    title: 'BLOQUE 2 – IMPACTO HUMANO',
    description: 'Análisis de adopción',
    questions: [
      {
        id: 4,
        text: '¿A quién impacta?',
        type: 'checkbox',
        options: [
          'Liderazgo',
          'Equipos operativos',
          'Áreas específicas',
          'Toda la compañía',
        ],
        required: true,
        subQuestion: {
          text: '¿Qué cambia concretamente en su día a día?',
          type: 'textarea',
          placeholder: 'Describe los cambios concretos en la rutina diaria...',
          required: true,
        },
      },
      {
        id: 5,
        text: '¿Qué se espera que hagan distinto?',
        type: 'textarea',
        placeholder: 'Describí la conducta observable que marcará que el cambio fue adoptado.\n\nEjemplo: "No usar más el sistema anterior y cargar X antes de las 12 hs"',
        required: true,
        example: 'Esta es una pregunta clave: necesitamos una conducta observable y medible.',
      },
      {
        id: 6,
        text: 'Riesgos culturales',
        type: 'textarea',
        placeholder: '¿Qué miedo o resistencia real podría aparecer?',
        required: true,
        example: '💡 Esta pregunta es oro. Conecta directamente con el enfoque cultural.',
      },
    ],
  },
  {
    id: 3,
    name: 'Fase 3',
    title: 'BLOQUE 3 – ORQUESTACIÓN Y MEDICIÓN',
    description: 'Plan de acción',
    questions: [
      {
        id: 7,
        text: 'Mensajes clave',
        type: 'textarea',
        placeholder: 'Redactá el mensaje principal en 3 líneas para las personas impactadas.',
        required: true,
      },
      {
        id: 8,
        text: '¿Cómo lo vas a desplegar?',
        type: 'checkbox',
        options: [
          'Reunión presencial',
          'Teams',
          'Somos Distro',
          'Email',
          'Otro',
        ],
        required: true,
        subQuestion: {
          text: '¿En qué momento se comunica?',
          type: 'text',
          placeholder: 'Ej: Antes del lanzamiento, Durante la implementación, etc.',
          required: true,
        },
      },
      {
        id: 9,
        text: 'Indicadores de adopción',
        type: 'radio',
        options: ['Sí', 'Parcialmente', 'No aún'],
        required: true,
        subQuestion: {
          text: '¿Cómo sabrás que el cambio ya es hábito y no solo implementación?',
          type: 'textarea',
          placeholder: 'Ejemplo: % de uso sostenido, reducción de retrabajo, comportamiento observado',
          required: true,
        },
      },
    ],
  },
];