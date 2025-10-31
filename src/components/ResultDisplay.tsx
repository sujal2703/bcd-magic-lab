import { motion } from 'framer-motion';
import { Trophy, Binary } from 'lucide-react';
import { BCDAdditionStep } from '@/utils/bcdAddition';

interface ResultDisplayProps {
  steps: BCDAdditionStep[];
  num1: number;
  num2: number;
  operation: string;
}

export function ResultDisplay({ steps, num1, num2, operation }: ResultDisplayProps) {
  if (steps.length === 0) return null;

  const finalStep = steps[steps.length - 1];
  
  const getOperationSymbol = () => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '−';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '';
    }
  };

  const getDecimalResult = () => {
    switch (operation) {
      case 'add': return num1 + num2;
      case 'subtract': return num1 - num2;
      case 'multiply': return num1 * num2;
      case 'divide': return Math.floor(num1 / num2);
      default: return 0;
    }
  };

  const decimalResult = getDecimalResult();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-accent/10 text-accent">
          <Trophy className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold">Final Result</h2>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6 bg-primary/5">
          <p className="text-sm text-muted-foreground mb-3">Decimal Operation</p>
          <div className="font-mono-code text-3xl font-bold text-center">
            {num1} {getOperationSymbol()} {num2} = {decimalResult}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 bg-accent/5">
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Binary className="w-4 h-4" />
            BCD Representation
          </p>
          <div className="font-mono-code text-xl break-all text-center">
            {finalStep.result}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Total Steps</p>
            <p className="text-2xl font-bold text-primary">{steps.length}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Corrections</p>
            <p className="text-2xl font-bold text-accent">
              {steps.filter(s => s.needsCorrection).length}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
