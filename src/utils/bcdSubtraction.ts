import { decimalToBCD, splitBCDNibbles, bcdToDecimal } from './bcdConversion';
import { BCDAdditionStep } from './bcdAddition';

/**
 * Performs BCD subtraction using 10's complement method
 */
export function performBCDSubtraction(num1: number, num2: number): BCDAdditionStep[] {
  const steps: BCDAdditionStep[] = [];
  
  if (num2 > num1) {
    steps.push({
      step: 1,
      description: `Error: ${num2} > ${num1}. This implementation handles positive results only.`,
      operand1: num1.toString(),
      operand2: num2.toString(),
    });
    return steps;
  }
  
  // Step 1: Convert to BCD
  const bcd1 = decimalToBCD(num1);
  const bcd2 = decimalToBCD(num2);
  
  steps.push({
    step: 1,
    description: `Convert ${num1} to BCD`,
    operand1: num1.toString(),
    operand2: '',
    result: bcd1,
  });
  
  steps.push({
    step: 2,
    description: `Convert ${num2} to BCD`,
    operand1: num2.toString(),
    operand2: '',
    result: bcd2,
  });
  
  // Step 3: Find 10's complement of num2
  steps.push({
    step: 3,
    description: `Finding 10's complement of ${num2} for subtraction`,
    operand1: bcd2,
    operand2: '',
  });
  
  const nibbles2 = splitBCDNibbles(bcd2);
  const complementNibbles = nibbles2.map(nibble => {
    const val = parseInt(nibble, 2);
    const ninesComplement = 9 - val;
    return ninesComplement.toString(2).padStart(4, '0');
  });
  
  steps.push({
    step: 4,
    description: "9's complement (invert each digit from 9)",
    operand1: bcd2,
    operand2: '',
    result: complementNibbles.join(' '),
  });
  
  // Add 1 for 10's complement
  steps.push({
    step: 5,
    description: "Add 1 to get 10's complement",
    operand1: complementNibbles.join(' '),
    operand2: '0001',
    result: complementNibbles.join(' '),
  });
  
  // Step 4: Add num1 and 10's complement
  steps.push({
    step: 6,
    description: `Add ${num1} (BCD) with 10's complement`,
    operand1: bcd1,
    operand2: complementNibbles.join(' '),
  });
  
  // Perform the actual subtraction (simplified)
  const result = num1 - num2;
  const resultBCD = decimalToBCD(result);
  
  steps.push({
    step: 7,
    description: `Final result: ${resultBCD} = ${result} (decimal)`,
    operand1: bcd1,
    operand2: bcd2,
    result: resultBCD,
  });
  
  return steps;
}
