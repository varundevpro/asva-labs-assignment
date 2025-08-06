import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import {
  createLeaderboardRow,
  type LeaderboardRow,
} from "../utils/leaderboard";
import { formatTimestamp } from "../utils/date";
import { randInt } from "../utils/number";

const initialMessages = [
  createLeaderboardRow(Date.now() - randInt(1000, 3000)),
  createLeaderboardRow(Date.now() - randInt(3000, 5000)),
  createLeaderboardRow(Date.now() - randInt(5000, 7000)),
  createLeaderboardRow(Date.now() - randInt(7000, 9000)),
  createLeaderboardRow(Date.now() - randInt(9000, 12000)),
  createLeaderboardRow(Date.now() - randInt(12000, 15000)),
];

export function Leaderboard() {
  const [messages, setMessages] =
    React.useState<LeaderboardRow[]>(initialMessages);

  React.useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => [createLeaderboardRow(), ...prev]);
    }, 2500);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold pl-2 mb-2">Leaderboard</h2>
      <div className="bg-white p-2 flex justify-between items-center rounded-xl shadow-lg overflow-hidden">
        <div className="relative overflow-x-auto w-full">
          <div className="text-sm text-left rtl:text-right text-gray-500 w-full min-w-[500px]">
            <div className="grid grid-cols-3 text-xs text-gray-700 uppercase bg-gray-50 font-bold">
              <div className="px-6 py-3">Time</div>
              <div className="px-6 py-3">Account</div>
              <div className="px-6 py-3 text-right">XP</div>
            </div>
            <ul className="flex flex-col w-full">
              <AnimatePresence initial={false}>
                {messages.slice(0, 10).map((message, index) => {
                  const isLast = messages.length - 1 === index;
                  return (
                    <motion.li
                      key={message.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                      className={clsx(
                        "bg-white flex w-full",
                        "grid grid-cols-3",
                        !isLast && "border-b border-gray-200"
                      )}
                    >
                      <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {formatTimestamp(message.timestamp)}
                      </div>
                      <div className="px-6 py-4 text-ellipsis whitespace-nowrap min-w-0 overflow-hidden">
                        {message.account}
                      </div>
                      <div
                        className={clsx("px-6 py-4 text-right", {
                          "text-green-600": message.type === "add",
                          "text-red-600": message.type === "remove",
                        })}
                      >
                        {message.type === "add" ? "+" : "-"}
                        {message.amount} XP
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
