/**
 * Converts a decimal number to BCD representation
 * Each decimal digit is represented by 4 bits
 */
export function decimalToBCD(decimal: number): string {
  if (decimal < 0) {
    throw new Error("Negative numbers not supported in basic BCD");
  }
  
  const digits = decimal.toString().split('');
  const bcdDigits = digits.map(digit => {
    const num = parseInt(digit);
    return num.toString(2).padStart(4, '0');
  });
  
  return bcdDigits.join(' ');
}

/**
 * Converts BCD string to decimal
 */
export function bcdToDecimal(bcd: string): number {
  const groups = bcd.split(' ').filter(g => g.length > 0);
  let result = '';
  
  for (const group of groups) {
    const decimal = parseInt(group, 2);
    if (decimal > 9) {
      throw new Error("Invalid BCD - digit greater than 9");
    }
    result += decimal.toString();
  }
  
  return parseInt(result);
}

/**
 * Splits a BCD string into individual nibbles (4-bit groups)
 */
export function splitBCDNibbles(bcd: string): string[] {
  return bcd.split(' ').filter(n => n.length > 0);
}

/**
 * Formats a BCD string with spaces for readability
 */
export function formatBCD(bcd: string): string {
  // Remove existing spaces
  const clean = bcd.replace(/\s/g, '');
  
  // Split into groups of 4
  const groups = [];
  for (let i = 0; i < clean.length; i += 4) {
    groups.push(clean.slice(i, i + 4));
  }
  
  return groups.join(' ');
}
