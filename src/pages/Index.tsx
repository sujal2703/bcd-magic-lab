import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { InputSection } from '@/components/InputSection';
import { StepVisualizer } from '@/components/StepVisualizer';
import { ResultDisplay } from '@/components/ResultDisplay';
import { ControlButtons } from '@/components/ControlButtons';
import { Footer } from '@/components/Footer';
import { performBCDAddition } from '@/utils/bcdAddition';
import { performBCDSubtraction } from '@/utils/bcdSubtraction';
import { performBCDMultiplication } from '@/utils/bcdMultiplication';
import { performBCDDivision } from '@/utils/bcdDivision';
import { BCDAdditionStep } from '@/utils/bcdAddition';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [isDark, setIsDark] = useState(true);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [steps, setSteps] = useState<BCDAdditionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handleSimulate = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);

    if (isNaN(n1) || isNaN(n2)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }

    if (n1 < 0 || n2 < 0 || n1 > 9999 || n2 > 9999) {
      toast({
        title: "Out of Range",
        description: "Please enter numbers between 0 and 9999",
        variant: "destructive",
      });
      return;
    }

    let result: BCDAdditionStep[] = [];

    try {
      switch (operation) {
        case 'add':
          result = performBCDAddition(n1, n2);
          break;
        case 'subtract':
          result = performBCDSubtraction(n1, n2);
          break;
        case 'multiply':
          result = performBCDMultiplication(n1, n2);
          break;
        case 'divide':
          result = performBCDDivision(n1, n2);
          break;
      }

      setSteps(result);
      setCurrentStep(0);
      setIsPlaying(false);

      toast({
        title: "Simulation Started",
        description: `${result.length} steps generated`,
      });
    } catch (error) {
      toast({
        title: "Simulation Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
    setIsPlaying(false);
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setNum1('');
    setNum2('');
    setOperation('add');
  };

  const handleToggleAutoPlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <InputSection
              num1={num1}
              num2={num2}
              operation={operation}
              onNum1Change={setNum1}
              onNum2Change={setNum2}
              onOperationChange={setOperation}
              onSimulate={handleSimulate}
              disabled={isPlaying}
            />
          </div>

          <div className="lg:col-span-2">
            <StepVisualizer steps={steps} currentStep={currentStep} />
          </div>
        </div>

        {steps.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <ControlButtons
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  isPlaying={isPlaying}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onReset={handleReset}
                  onToggleAutoPlay={handleToggleAutoPlay}
                  disabled={steps.length === 0}
                />
              </div>

              <div className="lg:col-span-1">
                <ResultDisplay
                  steps={steps}
                  num1={parseInt(num1) || 0}
                  num2={parseInt(num2) || 0}
                  operation={operation}
                />
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
