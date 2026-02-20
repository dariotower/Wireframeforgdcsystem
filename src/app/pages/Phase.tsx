import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { ArrowLeft, Info } from 'lucide-react';
import { phasesData, Question } from '../data/questions';

export default function Phase() {
  const { id } = useParams();
  const phaseId = parseInt(id || '1');
  const navigate = useNavigate();
  const { phases, savePhaseAnswer, completePhase, isPhaseUnlocked } = useApp();

  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [subAnswers, setSubAnswers] = useState<Record<number, any>>({});
  const [feedbackMessages, setFeedbackMessages] = useState<Record<number, string>>({});

  const currentPhaseData = phasesData.find((p) => p.id === phaseId);
  const currentPhase = phases.find((p) => p.phaseId === phaseId);

  useEffect(() => {
    if (!isPhaseUnlocked(phaseId)) {
      navigate('/map');
      return;
    }

    if (currentPhase) {
      const loadedAnswers: Record<number, any> = {};
      const loadedSubAnswers: Record<number, any> = {};
      
      currentPhaseData?.questions.forEach((q) => {
        const stored = currentPhase.questions[q.id];
        if (stored) {
          if (typeof stored === 'object' && 'main' in stored) {
            loadedAnswers[q.id] = stored.main;
            loadedSubAnswers[q.id] = stored.sub;
          } else {
            loadedAnswers[q.id] = stored;
          }
        }
      });
      
      setAnswers(loadedAnswers);
      setSubAnswers(loadedSubAnswers);
    }
  }, [phaseId, currentPhase, isPhaseUnlocked, navigate, currentPhaseData]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    // Update feedback if exists
    const question = currentPhaseData?.questions.find((q) => q.id === questionId);
    if (question?.feedback && typeof value === 'string') {
      const feedback = question.feedback(value);
      if (feedback) {
        setFeedbackMessages((prev) => ({ ...prev, [questionId]: feedback }));
      }
    }
  };

  const handleSubAnswerChange = (questionId: number, value: any) => {
    setSubAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    const current = (answers[questionId] as string[]) || [];
    const updated = checked
      ? [...current, option]
      : current.filter((item) => item !== option);
    handleAnswerChange(questionId, updated);
  };

  const handleSave = () => {
    currentPhaseData?.questions.forEach((question) => {
      const mainAnswer = answers[question.id];
      const subAnswer = subAnswers[question.id];
      
      if (question.subQuestion && subAnswer) {
        savePhaseAnswer(phaseId, question.id, { main: mainAnswer, sub: subAnswer });
      } else if (mainAnswer !== undefined) {
        savePhaseAnswer(phaseId, question.id, mainAnswer);
      }
    });
  };

  const isQuestionComplete = (question: Question): boolean => {
    const mainAnswer = answers[question.id];
    const subAnswer = subAnswers[question.id];

    if (!mainAnswer || (Array.isArray(mainAnswer) && mainAnswer.length === 0)) {
      return false;
    }

    if (question.subQuestion?.required && !subAnswer?.trim()) {
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    handleSave();

    const allAnswered = currentPhaseData?.questions.every(isQuestionComplete);

    if (allAnswered) {
      completePhase(phaseId);
      navigate(`/celebration/${phaseId}`);
    }
  };

  const allQuestionsAnswered = currentPhaseData?.questions.every(isQuestionComplete) || false;

  if (!currentPhaseData) return null;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-[1248px] mx-auto">
        {/* Top Bar */}
        <div className="border-2 border-black px-6 py-5 mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-70"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al mapa
          </button>
          <div className="text-center flex-1">
            <h1 className="text-base font-bold">{currentPhaseData.title}</h1>
            <p className="text-sm opacity-70">{currentPhaseData.description}</p>
          </div>
          <div className="w-32 text-right text-sm font-semibold opacity-70">
            {phaseId}/3
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8 mb-8">
          {currentPhaseData.questions.map((question, index) => (
            <div key={question.id} className="border-2 border-black p-6">
              <label className="block text-[15px] font-bold mb-4">
                Pregunta {index + 1}: {question.text}
              </label>

              {question.example && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 flex gap-2">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">{question.example}</p>
                </div>
              )}

              {/* Radio buttons */}
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-3 mb-4"
                >
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                      <Label htmlFor={`q${question.id}-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Checkboxes */}
              {question.type === 'checkbox' && question.options && (
                <div className="space-y-3 mb-4">
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q${question.id}-${option}`}
                        checked={(answers[question.id] as string[])?.includes(option) || false}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(question.id, option, checked as boolean)
                        }
                      />
                      <Label htmlFor={`q${question.id}-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Text input */}
              {question.type === 'text' && (
                <Input
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="border-2 border-black rounded-none bg-gray-100"
                />
              )}

              {/* Textarea */}
              {question.type === 'textarea' && (
                <Textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="min-h-[120px] border-2 border-black rounded-none bg-gray-100 resize-none"
                  placeholder={question.placeholder}
                />
              )}

              {/* Feedback message */}
              {feedbackMessages[question.id] && (
                <div
                  className={`mt-4 p-3 border-l-4 ${
                    feedbackMessages[question.id].startsWith('✓')
                      ? 'bg-green-50 border-green-400 text-green-900'
                      : 'bg-yellow-50 border-yellow-400 text-yellow-900'
                  }`}
                >
                  <p className="text-sm font-medium">{feedbackMessages[question.id]}</p>
                </div>
              )}

              {/* Sub-question */}
              {question.subQuestion && (answers[question.id] && (typeof answers[question.id] === 'string' ? answers[question.id] : (answers[question.id] as string[])?.length > 0)) && (
                <div className="mt-4 pl-4 border-l-2 border-gray-300">
                  <label className="block text-sm font-semibold mb-3 opacity-80">
                    ✍ {question.subQuestion.text}
                  </label>
                  {question.subQuestion.type === 'textarea' ? (
                    <Textarea
                      value={subAnswers[question.id] || ''}
                      onChange={(e) => handleSubAnswerChange(question.id, e.target.value)}
                      className="min-h-[100px] border-2 border-black rounded-none bg-gray-100 resize-none"
                      placeholder={question.subQuestion.placeholder}
                    />
                  ) : (
                    <Input
                      value={subAnswers[question.id] || ''}
                      onChange={(e) => handleSubAnswerChange(question.id, e.target.value)}
                      placeholder={question.subQuestion.placeholder}
                      className="border-2 border-black rounded-none bg-gray-100"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="border-2 border-black p-8 flex gap-4 flex-wrap">
          <Button
            onClick={handleSave}
            className="w-60 h-14 border-2 border-black bg-white hover:bg-gray-100 text-black text-sm font-bold rounded-none"
          >
            Guardar avance
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!allQuestionsAnswered}
            className={`w-64 h-14 border-2 border-black text-sm font-bold rounded-none ${
              allQuestionsAnswered
                ? 'bg-gray-200 hover:bg-gray-300 text-black'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allQuestionsAnswered ? 'Continuar' : 'Completar todas las preguntas'}
          </Button>
        </div>
      </div>
    </div>
  );
}