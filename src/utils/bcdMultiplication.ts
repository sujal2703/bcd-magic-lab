import { decimalToBCD, bcdToDecimal } from './bcdConversion';
import { BCDAdditionStep } from './bcdAddition';

/**
 * Performs BCD multiplication using repeated addition
 */
export function performBCDMultiplication(num1: number, num2: number): BCDAdditionStep[] {
  const steps: BCDAdditionStep[] = [];
  
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
    description: `Multiply using repeated addition: ${num1} × ${num2}`,
    operand1: bcd1,
    operand2: bcd2,
  });
  
  // Perform multiplication
  let product = 0;
  for (let i = 0; i < num2; i++) {
    product += num1;
    
    steps.push({
      step: steps.length + 1,
      description: `Iteration ${i + 1}: Accumulator = ${product}`,
      operand1: num1.toString(),
      operand2: product.toString(),
      result: decimalToBCD(product),
    });
  }
  
  const resultBCD = decimalToBCD(product);
  
  steps.push({
    step: steps.length + 1,
    description: `Final result: ${resultBCD} = ${product} (decimal)`,
    operand1: bcd1,
    operand2: bcd2,
    result: resultBCD,
  });
  
  return steps;
}
