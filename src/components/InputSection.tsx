import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InputSectionProps {
  num1: string;
  num2: string;
  operation: string;
  onNum1Change: (value: string) => void;
  onNum2Change: (value: string) => void;
  onOperationChange: (value: string) => void;
  onSimulate: () => void;
  disabled?: boolean;
}

export function InputSection({
  num1,
  num2,
  operation,
  onNum1Change,
  onNum2Change,
  onOperationChange,
  onSimulate,
  disabled = false,
}: InputSectionProps) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Calculator className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold">Input Parameters</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="num1" className="text-sm font-medium mb-2 block">
            First Number
          </Label>
          <Input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => onNum1Change(e.target.value)}
            placeholder="Enter first number"
            className="font-mono text-lg"
            min="0"
            max="9999"
          />
        </div>
        
        <div>
          <Label htmlFor="operation" className="text-sm font-medium mb-2 block">
            Operation
          </Label>
          <Select value={operation} onValueChange={onOperationChange}>
            <SelectTrigger id="operation" className="font-mono text-lg">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Addition (+)</SelectItem>
              <SelectItem value="subtract">Subtraction (−)</SelectItem>
              <SelectItem value="multiply">Multiplication (×)</SelectItem>
              <SelectItem value="divide">Division (÷)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="num2" className="text-sm font-medium mb-2 block">
            Second Number
          </Label>
          <Input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => onNum2Change(e.target.value)}
            placeholder="Enter second number"
            className="font-mono text-lg"
            min="0"
            max="9999"
          />
        </div>
        
        <Button
          onClick={onSimulate}
          disabled={disabled || !num1 || !num2 || !operation}
          className="w-full h-12 text-lg font-semibold neon-glow-cyan"
          size="lg"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Start Simulation
        </Button>
      </div>
    </motion.div>
  );
}
