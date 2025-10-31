import { decimalToBCD } from './bcdConversion';
import { BCDAdditionStep } from './bcdAddition';

/**
 * Performs BCD division using repeated subtraction
 */
export function performBCDDivision(num1: number, num2: number): BCDAdditionStep[] {
  const steps: BCDAdditionStep[] = [];
  
  if (num2 === 0) {
    steps.push({
      step: 1,
      description: 'Error: Division by zero is undefined',
      operand1: num1.toString(),
      operand2: '0',
    });
    return steps;
  }
  
  // Convert to BCD
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
  
  steps.push({
    step: 3,
    description: `Divide using repeated subtraction: ${num1} ÷ ${num2}`,
    operand1: bcd1,
    operand2: bcd2,
  });
  
  // Perform division
  let quotient = 0;
  let remainder = num1;
  
  while (remainder >= num2) {
    remainder -= num2;
    quotient++;
    
    steps.push({
      step: steps.length + 1,
      description: `Iteration ${quotient}: Remainder = ${remainder}`,
      operand1: remainder.toString(),
      operand2: quotient.toString(),
      result: decimalToBCD(remainder),
    });
  }
  
  const quotientBCD = decimalToBCD(quotient);
  const remainderBCD = decimalToBCD(remainder);
  
  steps.push({
    step: steps.length + 1,
    description: `Final result: Quotient = ${quotient}, Remainder = ${remainder}`,
    operand1: quotientBCD,
    operand2: remainderBCD,
    result: `${quotientBCD} R ${remainderBCD}`,
  });
  
  return steps;
}
