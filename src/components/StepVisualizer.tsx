import { motion, AnimatePresence } from 'framer-motion';
import { BCDAdditionStep } from '@/utils/bcdAddition';
import { StepCard } from './StepCard';
import { Loader2 } from 'lucide-react';

interface StepVisualizerProps {
  steps: BCDAdditionStep[];
  currentStep: number;
}

export function StepVisualizer({ steps, currentStep }: StepVisualizerProps) {
  if (steps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-muted-foreground" />
        </motion.div>
        <p className="text-muted-foreground mt-6 text-lg">
          Configure inputs and click "Start Simulation" to begin
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Step-by-Step Simulation</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="font-mono text-sm text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <StepCard step={steps[currentStep]} isActive={true} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
