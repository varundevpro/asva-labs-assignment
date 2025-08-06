/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";

type HistoryEntry = {
  id: string;
  xpEarned: number;
  timestamp: number;
};

type ContextValue = {
  history: HistoryEntry[];
  addEntryToHistory: (xpEarned: number) => void;
  clearHistory: () => void;
};

// A context to manage the game history
const HistoryContext = createContext<ContextValue>({
  history: [],
  // @ts-expect-error fallback function
  addEntryToHistory: (xpEarned: number) => {},
  clearHistory: () => {},
});

// A custom provider that handles localStorage and state management for history
export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const storedHistory = localStorage.getItem("diceRollHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
      return [];
    }
  });

  // Effect to sync history state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("diceRollHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  }, [history]);

  // Function to add a new entry to the history
  const addEntryToHistory = (xpEarned: number) => {
    const newEntry: HistoryEntry = {
      id: uuidv4(),
      xpEarned,
      timestamp: Date.now(),
    };
    setHistory((prevHistory) => [newEntry, ...prevHistory]);
  };

  const clearHistory = () => {
    const response = confirm("Your history will be cleared");
    if (response) {
      setHistory([]);
    }
  };

  const value = { history, addEntryToHistory, clearHistory };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

// Custom hook to consume the history context
export const useHistory = () => {
  return useContext(HistoryContext);
};

// Custom hook to calculate the total XP earned from the history
export const useTotalXP = () => {
  const { history } = useHistory();
  // useMemo to efficiently calculate the sum only when the history changes
  const totalXp = useMemo(() => {
    return history.reduce((sum, entry) => sum + entry.xpEarned, 0);
  }, [history]);

  return totalXp;
};
