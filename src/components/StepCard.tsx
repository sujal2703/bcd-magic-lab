import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { BCDAdditionStep } from '@/utils/bcdAddition';

interface StepCardProps {
  step: BCDAdditionStep;
  isActive: boolean;
}

export function StepCard({ step, isActive }: StepCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1 : 0.95, 
        opacity: isActive ? 1 : 0.6 
      }}
      className={`glass-card rounded-xl p-6 transition-all ${
        isActive ? 'ring-2 ring-primary neon-glow-cyan' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          {step.step}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            {step.description}
            {step.needsCorrection && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <AlertCircle className="w-5 h-5 text-accent" />
              </motion.span>
            )}
          </h3>
          
          <div className="space-y-3">
            {step.operand1 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20">Operand 1:</span>
                <code className="font-mono-code text-lg px-4 py-2 bg-muted/50 rounded-lg flex-1">
                  {step.operand1}
                </code>
              </div>
            )}
            
            {step.operand2 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20">Operand 2:</span>
                <code className="font-mono-code text-lg px-4 py-2 bg-muted/50 rounded-lg flex-1">
                  {step.operand2}
                </code>
              </div>
            )}
            
            {step.carry && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20">Carry:</span>
                <motion.code
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="font-mono-code text-lg px-4 py-2 bg-accent/20 text-accent rounded-lg"
                >
                  {step.carry}
                </motion.code>
              </div>
            )}
            
            {step.result && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20">
                  {step.correction ? 'Corrected:' : 'Result:'}
                </span>
                <motion.code
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`font-mono-code text-lg px-4 py-2 rounded-lg flex-1 ${
                    step.correction 
                      ? 'bg-accent/20 text-accent font-bold' 
                      : 'bg-primary/20 text-primary font-bold'
                  }`}
                >
                  {step.result}
                </motion.code>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
