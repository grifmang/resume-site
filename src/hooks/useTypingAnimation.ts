"use client";

import { useState, useEffect } from "react";

interface TypingLine {
  command: string;
  output: string;
  commandDelay?: number;
}

export function useTypingAnimation(lines: TypingLine[], charDelay = 50) {
  const [displayedLines, setDisplayedLines] = useState<
    { command: string; output: string; done: boolean }[]
  >([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showingOutput, setShowingOutput] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setComplete(true);
      return;
    }

    const line = lines[currentLine];

    if (!showingOutput) {
      // Typing the command
      if (currentChar < line.command.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            if (!updated[currentLine]) {
              updated[currentLine] = { command: "", output: "", done: false };
            }
            updated[currentLine] = {
              ...updated[currentLine],
              command: line.command.slice(0, currentChar + 1),
            };
            return updated;
          });
          setCurrentChar((c) => c + 1);
        }, charDelay);
        return () => clearTimeout(timeout);
      } else {
        // Command fully typed, show output after brief pause
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[currentLine] = {
              ...updated[currentLine],
              output: line.output,
              done: true,
            };
            return updated;
          });
          setShowingOutput(true);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Move to next line after pause
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setShowingOutput(false);
      }, line.commandDelay || 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, showingOutput, lines, charDelay]);

  return { displayedLines, complete };
}
