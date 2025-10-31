import { decimalToBCD, splitBCDNibbles, bcdToDecimal } from './bcdConversion';

export interface BCDAdditionStep {
  step: number;
  description: string;
  operand1: string;
  operand2: string;
  result?: string;
  carry?: string;
  correction?: string;
  needsCorrection?: boolean;
  highlight?: number[]; // indices to highlight
}

/**
 * Performs BCD addition with detailed steps
 */
export function performBCDAddition(num1: number, num2: number): BCDAdditionStep[] {
  const steps: BCDAdditionStep[] = [];
  
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
  
  // Step 3: Prepare for addition
  const nibbles1 = splitBCDNibbles(bcd1);
  const nibbles2 = splitBCDNibbles(bcd2);
  
  // Pad with zeros to make same length
  const maxLength = Math.max(nibbles1.length, nibbles2.length);
  while (nibbles1.length < maxLength) nibbles1.unshift('0000');
  while (nibbles2.length < maxLength) nibbles2.unshift('0000');
  
  steps.push({
    step: 3,
    description: 'Align BCD numbers for addition',
    operand1: nibbles1.join(' '),
    operand2: nibbles2.join(' '),
  });
  
  // Step 4: Perform binary addition nibble by nibble
  let carry = 0;
  const resultNibbles: string[] = [];
  
  for (let i = nibbles1.length - 1; i >= 0; i--) {
    const val1 = parseInt(nibbles1[i], 2);
    const val2 = parseInt(nibbles2[i], 2);
    let sum = val1 + val2 + carry;
    
    const binarySum = sum.toString(2).padStart(4, '0');
    
    steps.push({
      step: steps.length + 1,
      description: `Add nibbles at position ${nibbles1.length - i}: ${val1} + ${val2}${carry ? ' + carry' : ''} = ${sum}`,
      operand1: nibbles1[i],
      operand2: nibbles2[i],
      result: binarySum.slice(-4),
      carry: carry.toString(),
      highlight: [i],
    });
    
    // Check if correction is needed (sum > 9 or carry out)
    if (sum > 9 || binarySum.length > 4) {
      steps.push({
        step: steps.length + 1,
        description: `Result ${sum} > 9, add correction factor (+6)`,
        operand1: binarySum.slice(-4),
        operand2: '0110',
        needsCorrection: true,
        highlight: [i],
      });
      
      sum = sum + 6;
      carry = Math.floor(sum / 16);
      const correctedNibble = (sum % 16).toString(2).padStart(4, '0');
      
      steps.push({
        step: steps.length + 1,
        description: `Corrected result: ${correctedNibble} (decimal ${parseInt(correctedNibble, 2)})`,
        operand1: binarySum.slice(-4),
        operand2: '0110',
        result: correctedNibble,
        carry: carry.toString(),
        correction: correctedNibble,
        highlight: [i],
      });
      
      resultNibbles.unshift(correctedNibble);
    } else {
      carry = 0;
      resultNibbles.unshift(binarySum.slice(-4));
    }
  }
  
  // Handle final carry
  if (carry) {
    resultNibbles.unshift('0001');
    steps.push({
      step: steps.length + 1,
      description: 'Add final carry to result',
      operand1: '0001',
      operand2: '',
      result: resultNibbles.join(' '),
    });
  }
  
  // Final result
  const finalBCD = resultNibbles.join(' ');
  const finalDecimal = bcdToDecimal(finalBCD);
  
  steps.push({
    step: steps.length + 1,
    description: `Final BCD result: ${finalBCD} = ${finalDecimal} (decimal)`,
    operand1: nibbles1.join(' '),
    operand2: nibbles2.join(' '),
    result: finalBCD,
  });
  
  return steps;
}
