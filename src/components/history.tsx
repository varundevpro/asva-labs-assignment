import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import { formatTimestamp } from "../utils/date";
import { useHistory } from "../context/history";

export function History() {
  const { history, clearHistory } = useHistory();

  const recentHistory = history
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 50);

  return (
    <div className="">
      <div className="flex justify-between items-center pl-2 pr-1 mb-2">
        <h2 className="text-xl font-semibold">History</h2>
        <button
          type="button"
          className="inline-flex items-center text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2"
          onClick={clearHistory}
        >
          Clear All
        </button>
      </div>
      <div className="bg-white p-2 flex justify-between items-center rounded-xl shadow-lg overflow-hidden">
        <div className="relative overflow-x-auto w-full">
          <div className="text-sm text-left rtl:text-right text-gray-500 w-full">
            <div className="grid grid-cols-2 text-xs text-gray-700 uppercase bg-gray-50 font-bold">
              <div className="px-6 py-3">Time</div>
              <div className="px-6 py-3 text-right">XP</div>
            </div>

            {recentHistory.length === 0 && (
              <p className="p-4 text-center italic">
                🎮 No games played yet!
                <br />
                Play now and start collecting XP! 💰
              </p>
            )}

            <ul className="flex flex-col w-full">
              <AnimatePresence initial={false}>
                {recentHistory.map((message, index) => {
                  const isLast = history.length - 1 === index;
                  return (
                    <motion.li
                      key={message.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                      className={clsx(
                        "bg-white flex w-full",
                        "grid grid-cols-2",
                        !isLast && "border-b border-gray-200"
                      )}
                    >
                      <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {formatTimestamp(message.timestamp)}
                      </div>
                      <div
                        className={clsx("px-6 py-4 text-right", {
                          "text-green-600": true,
                        })}
                      >
                        +{message.xpEarned} XP
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
