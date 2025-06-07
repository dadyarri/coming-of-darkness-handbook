import React, { useState, useRef, useEffect, useCallback } from 'react';
import { evaluateExpression, rollDie } from '../utils/diceRoller'; // Import from the helper file

// Define the props interface for the component
interface RollableDiceProps {
  formula?: string; // The dice formula (e.g., "1d6", "2d8+5")
  originalText?: string; // Optional text to display when not showing roll result
}

const RollableDice: React.FC<RollableDiceProps> = ({
  formula = '1d6',
  originalText,
}) => {
  const effectiveOriginalText = originalText || formula;
  const [displayText, setDisplayText] = useState<string>(effectiveOriginalText);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Specific type for Node.js timers
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initialWidthRef = useRef<number | null>(null);

  // Effect to capture initial width when the component mounts
  useEffect(() => {
    if (buttonRef.current) {
      initialWidthRef.current = buttonRef.current.offsetWidth;
      console.debug('Initial button width captured:', initialWidthRef.current);
    }
  }, []);

  const handleRoll = useCallback(() => {
    console.debug('Roll initiated for formula:', formula);
    setIsRolling(true);

    // Clear any existing timeout to prevent conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Capture the current width before changing text
    // This is a fallback if initialWidthRef.current was not set on mount
    if (buttonRef.current && initialWidthRef.current === null) {
      initialWidthRef.current = buttonRef.current.offsetWidth;
      console.debug(
        'Initial width captured during first roll:',
        initialWidthRef.current
      );
    }

    let resultFormula: string = formula;
    // const diceRolls: { notation: string; sum: number }[] = []; // If you needed to store individual roll details

    // Regex to find dice notations like XdX (e.g., 1d6, 2d10)
    const diceRegex = /(\d+)?d(\d+)/gi;

    let match: RegExpExecArray | null;
    // Use a temporary formula string for replacements to avoid infinite loops with global regex
    let tempFormula = formula;
    const replacementMap = new Map<string, number>(); // To store notation -> sum for replacement

    while ((match = diceRegex.exec(tempFormula)) !== null) {
      const fullMatch = match[0];
      const numDice = parseInt(match[1] || '1', 10); // Default to 1 if not specified (e.g., 'd6')
      const sides = parseInt(match[2], 10);

      if (isNaN(numDice) || isNaN(sides) || sides <= 0) {
        console.error('Invalid dice notation:', fullMatch);
        setDisplayText('Error');
        setIsRolling(false);
        timeoutRef.current = setTimeout(() => {
          setDisplayText(effectiveOriginalText);
          console.debug('Resetting display text to original (error).');
        }, 3000);
        return;
      }

      let rollSum = 0;
      for (let i = 0; i < numDice; i++) {
        const roll = rollDie(sides);
        rollSum += roll;
        console.debug(`Rolled ${roll} on d${sides}`);
      }
      replacementMap.set(fullMatch, rollSum);
      console.debug(`Mapped ${fullMatch} to ${rollSum}`);
    }

    // Now, replace all instances in the original formula using the map
    replacementMap.forEach((sum, notation) => {
      // Use a regex with global flag to replace all occurrences
      resultFormula = resultFormula.replace(new RegExp(notation, 'g'), sum.toString());
    });

    console.debug('Final formula for evaluation:', resultFormula);
    const finalResult = evaluateExpression(resultFormula);

    if (isNaN(finalResult)) {
      setDisplayText('Error');
    } else {
      setDisplayText(finalResult.toString());
    }

    // Set a timeout to revert to the original text
    timeoutRef.current = setTimeout(() => {
      setDisplayText(effectiveOriginalText);
      setIsRolling(false);
      console.debug('Resetting display text to original.');
    }, 3000);
  }, [formula, effectiveOriginalText]); // Dependencies for useCallback

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.debug('Timeout cleared on component unmount.');
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="rollable-dice"
      onClick={handleRoll}
      disabled={isRolling}
      style={{
        width: initialWidthRef.current
          ? `${initialWidthRef.current}px`
          : 'auto',
        minWidth: initialWidthRef.current
          ? `${initialWidthRef.current}px`
          : 'initial',
        transition: 'width 0s', // Prevent width transition
      }}
    >
      {displayText}
    </button>
  );
};

export default RollableDice;