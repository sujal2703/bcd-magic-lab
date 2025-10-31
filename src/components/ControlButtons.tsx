import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlButtonsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  onToggleAutoPlay: () => void;
  disabled?: boolean;
}

export function ControlButtons({
  currentStep,
  totalSteps,
  isPlaying,
  onPrevious,
  onNext,
  onReset,
  onToggleAutoPlay,
  disabled = false,
}: ControlButtonsProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={disabled || currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onToggleAutoPlay}
          disabled={disabled}
          className="gap-2 min-w-[140px]"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Auto Play
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={disabled || currentStep === totalSteps - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>

        <Button
          variant="destructive"
          size="lg"
          onClick={onReset}
          disabled={disabled}
          className="gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </Button>
      </div>
    </motion.div>
  );
}
