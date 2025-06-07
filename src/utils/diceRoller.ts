// Helper function to safely evaluate mathematical expressions
// This function avoids `eval` by parsing and applying operations
export const evaluateExpression = (expression: string): number => {
  console.debug('Evaluating expression:', expression);
  // Remove all whitespace for easier parsing
  const cleanExpression = expression.replace(/\s/g, '');

  // Regex to find numbers and operators
  // Matches numbers (integers or decimals), and operators (+, -, *, /)
  const tokens = cleanExpression.match(/(\d+\.?\d*)|[+\-*/]/g);

  if (!tokens) {
    console.warn('No tokens found in expression:', cleanExpression);
    return NaN; // Indicate an error or invalid expression
  }

  console.debug('Tokens:', tokens);

  // Shunting-yard algorithm or simple left-to-right evaluation
  // For simplicity, we'll do a basic left-to-right evaluation with operator precedence
  // A more robust solution would use a proper parsing algorithm like Shunting-yard
  // or convert to Reverse Polish Notation (RPN).

  let currentResult = parseFloat(tokens[0]);
  if (isNaN(currentResult)) {
    console.error('Invalid starting number in expression:', tokens[0]);
    return NaN;
  }

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (isNaN(nextNumber)) {
      console.error('Invalid number after operator:', operator, tokens[i + 1]);
      return NaN;
    }

    console.debug(
      'Applying operation:',
      currentResult,
      operator,
      nextNumber
    );

    switch (operator) {
      case '+':
        currentResult += nextNumber;
        break;
      case '-':
        currentResult -= nextNumber;
        break;
      case '*':
        currentResult *= nextNumber;
        break;
      case '/':
        if (nextNumber === 0) {
          console.error('Division by zero detected.');
          return Infinity; // Or throw an error, depending on desired behavior
        }
        currentResult /= nextNumber;
        break;
      default:
        console.error('Unknown operator:', operator);
        return NaN;
    }
  }
  console.debug('Expression result:', currentResult);
  return currentResult;
};

// Function to roll a single die
export const rollDie = (sides: number): number => {
  console.debug('Rolling d' + sides);
  return Math.floor(Math.random() * sides) + 1;
};